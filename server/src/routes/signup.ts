import * as body from 'koa-body'
import * as firebase from 'firebase-admin'
import axios from 'axios'
import email from '../lib/email'
import uploadPhoto from '../middleware/uploadPhoto'

import router, { Context } from '../router'

router.post('/signup',
  body({
    multipart: true
  }),
  // create account
  async (ctx: Context, next) => {
    const { email } = ctx.request.body.fields
    const { photo } = ctx.request.body.files

    const {pic, mediaLink} = await uploadPhoto(photo)

    try {
      ctx.state.user = await firebase.auth().createUser({
        email,
        photoURL: mediaLink
      })
      const token = await firebase.auth().createCustomToken(ctx.state.user.uid)
      ctx.status = 200
      ctx.body = { token }
    } catch (error) {
      ctx.status = 400
      ctx.body = { error: error.message }
      return
    }
    await next()
  },
  // Create person with email as the name
  async (ctx: Context) => {
    const { data: { personId } } = await axios({
      method:'POST',
      url:"https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/grouptest/persons",
      headers: {
        "Content-Type":"application/json",
        "Ocp-Apim-Subscription-Key": require('../../key-azure.json').faceAI
      },
      data: {
        name: ctx.state.user.email
      }
    })

    // Send confirmation email to new user
    const confirmationCode = await email.sendConfirmation(ctx.state.user.email)

    await Promise.all([
      // Upload photo as a persistent face to the person
      axios({
        method:'POST',
        url:`https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/grouptest/persons/${personId}/persistedFaces`,
        headers: {
          "Content-Type":"application/json",
          "Ocp-Apim-Subscription-Key": require('../../key-azure.json').faceAI
        },
        data: {
          url: ctx.state.user.photoURL
        }
      }),
      // Create user initial values in firebase
      firebase
        .database()
        .ref('users')
        .child(ctx.state.user.uid)
        .set({
          personId,
          balance: 0,
          confirmationCode,
          creditCards: []
        })
    ])
  },
)
