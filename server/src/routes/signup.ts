import * as body from 'koa-body'
import * as firebase from 'firebase-admin'
import axios from 'axios'

import router, { Context } from '../router'

router.post('/signup',
  body(),
  // create account
  async (ctx: Context, next) => {
    const { email } = ctx.request.body
    try {
      ctx.state.user = await firebase.auth().createUser({
        email,
        photoURL: "http://cdn.cnn.com/cnnnext/dam/assets/161107120239-01-trump-parry-super-169.jpg"
      })
      const token = await firebase.auth().createCustomToken(ctx.state.user.uid)
      ctx.status = 200
      ctx.body = { token }
      return next()
    } catch (error) {
      ctx.status = 400
      ctx.body = { error: error.message }
    }
  },
  async (ctx: Context) => {
    const subscriptionKey = "25020457c33748acbecc1e9eb36ad0dc";
  
    const { data: { personId } } = await axios({
      method:'POST',
      url:"https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/grouptest/persons",
      headers: {
        "Content-Type":"application/json",
        "Ocp-Apim-Subscription-Key": subscriptionKey
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
          "Ocp-Apim-Subscription-Key": subscriptionKey
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
