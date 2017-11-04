import * as body from 'koa-body'
import * as firebase from 'firebase-admin'

import router, { Context } from '../router'

router.post('/signup',
  body(),
  // create account
  async (ctx: Context, next) => {
    const { email } = ctx.request.body
    try {
      console.log('test')
      ctx.state.user = await firebase.auth().createUser({
        email
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
    await firebase
      .database()
      .ref('users')
      .child(ctx.state.user.uid)
      .set({
        balance: 0
      })
  },
)
