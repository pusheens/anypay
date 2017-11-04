import * as firebase from 'firebase-admin'

import router, { Context } from '../router'
import auth from '../middleware/auth'

router
  .use(auth)
  .post('/send', async (ctx: Context) => {
    const { amount, receiver: receiverEmail } = ctx.request.body
    
    // charge user credit card
    //    NOT IMPLEMENTED

    // get receiving user
    try {
      var receiver = await firebase.auth().getUserByEmail(receiverEmail)
    } catch (error) {
      ctx.status = 400
      ctx.body = { error: 'User does not exsist' }
      return
    }

    // add money to receiving user's account
    await firebase
      .database()
      .ref('users')
      .child(receiver!.uid)
      .child('balance')
      .transaction(balance => balance + Number(amount))

    ctx.status = 200
  })