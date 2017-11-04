import { Middleware } from 'koa'
import * as body from 'koa-body'
import * as firebase from 'firebase-admin'

import router from '../router'

router
  .post('/signup')
  .use(body())
  .use(async ctx => {
    const { email } = ctx.request.body
    try {
      const user = await firebase.auth().createUser({
        email
      })
      const token = await firebase.auth().createCustomToken(user.uid)
      ctx.status = 200
      ctx.body = { token: '' }
    } catch (error) {
      ctx.status = 400
      ctx.body = { error: error.message }
    }
  })
