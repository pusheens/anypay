import { Context, Middleware } from 'koa'
import * as body from 'koa-body'
import * as firebase from 'firebase-admin'

import router from '../router'

interface SignUpContext extends Context {
  state: {
    user: firebase.auth.UserRecord
  }
}

router
  .post('/signup')
  .use(body())
  // create account
  .use(async (ctx: SignUpContext, next) => {
    const { email } = ctx.request.body
    try {
      ctx.state.user = await firebase.auth().createUser({
        email
      })
      const token = await firebase.auth().createCustomToken(
        ctx.state.user.uid
      )
      ctx.status = 200
      ctx.body = { token: '' }
      return next()
    } catch (error) {
      ctx.status = 400
      ctx.body = { error: error.message }
    }
  })
  // populate default user data
  .use(async (ctx: SignUpContext) => {
    await firebase
      .database()
      .ref('users')
      .child(ctx.state.user.uid)
      .set({
        balance: 0
      })
  })
