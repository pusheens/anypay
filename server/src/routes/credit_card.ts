import * as firebase from 'firebase-admin'
import * as body from 'koa-body'
import router, { Context } from '../router'

// Adds creditcard number to user account
router
  .post('/credit_card', body(), async (ctx: Context) => {

    const { cardNum, userId } = ctx.request.body

    const users = await firebase.database()
    .ref('users')
    .child(userId)
    .child("creditCards")
    .push(cardNum)
      
    ctx.status = 200
  })

// Returns credtcards on a user's account
router
  .get('/credit_card', async (ctx: Context) => {
    const { userId } = ctx.query

    const creditCards = await firebase.database()
    .ref('users')
    .child(userId)
    .child('creditCards')
    .once('value')
    .then(ref => ref.val())

    var cardNumArr = new Array;
    for(let cardNum in creditCards) {
      cardNumArr.push(creditCards[cardNum]);
    }

    ctx.body = cardNumArr

    ctx.status = 200
  })