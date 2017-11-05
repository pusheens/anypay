import * as firebase from 'firebase-admin'
import * as body from 'koa-body'
import router, { Context } from '../router'
import auth from '../middleware/auth'

router
  .get('/has_bank', body(), async (ctx: Context) => {
    const { email } = ctx.query
    let   { hasBank } = ctx.query

    const user = await firebase
      .auth()
      .getUserByEmail(email)

    const currentBankValue = await firebase
      .database()
      .ref('users')
      .child(user.uid)
      .child("hasBank")
      .once('value')
      .then(ref => ref.val())

    if(hasBank){
      await firebase
      .database()
      .ref('users')
      .child(user.uid)
      .child("hasBank")
      .set(hasBank)
    } else {
      hasBank = currentBankValue
    }

    ctx.body = hasBank

    ctx.status = 200
  })