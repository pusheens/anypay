import * as firebase from 'firebase-admin'

import router, { Context } from '../router'
import auth from '../middleware/auth'

router
  .use(auth)
  .post('/claim', async (ctx: Context) => {
    // add money to receiving user's account
    await firebase
      .database()
      .ref('users')
      .child(ctx.state.user.uid)
      .child('balance')
      .set(0)
      
    ctx.status = 200
  })