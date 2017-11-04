import { Context } from '../router'
import * as body from 'koa-body'
import * as compose from 'koa-compose'
import * as firebase from 'firebase-admin'

export default compose([
  body(),
  async (ctx: Context, next: Function) => {
    const { token, email } = ctx.request.body
    try {
      // const idToken = await firebase.auth().verifyIdToken(token)
      // ctx.state.user = await firebase.auth().getUser(idToken.uid)
      ctx.state.user = await firebase.auth().getUserByEmail(email)
    } catch (error) {
      ctx.status = 401
      return
    }
    return next()
  }
])

