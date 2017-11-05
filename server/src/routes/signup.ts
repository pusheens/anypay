import * as body from 'koa-body'
import * as firebase from 'firebase-admin'
import axios from 'axios'

import router, { Context } from '../router'

router.post('/signup',
  body({
    multipart: true
  }),
  // create account
  async (ctx: Context, next) => {
    const { email } = ctx.request.body.fields
    const { photo } = ctx.request.body.files

    const [pic] = await firebase
      .storage()
      .bucket('anypay-e40b4.appspot.com')
      .upload(photo.path)

    await pic.makePublic()

    const [metadata]: Array<any> = await pic.getMetadata()

    try {
      ctx.state.user = await firebase.auth().createUser({
        email,
        photoURL: metadata.mediaLink
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
  
    await Promise.all([
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
      firebase
        .database()
        .ref('users')
        .child(ctx.state.user.uid)
        .set({
          personId,
          balance: 0
        })
    ])
  },
)
