import * as firebase from 'firebase-admin'
import * as body from 'koa-body'
import router, { Context } from '../router'
import auth from '../middleware/auth'

router
  .get('/user_info', body(), async (ctx: Context) => {
    const { email } = ctx.query

    const user = await firebase
      .auth()
      .getUserByEmail(email)
    
    const creditCards = await firebase.database()
    .ref('users')
    .child(user.uid)
    .child('creditCards')
    .once('value')
    .then(ref => ref.val())

    var cardNumArr = new Array;
    for(let cardNum in creditCards) {
      cardNumArr.push(creditCards[cardNum]);
    }

    const currentBankValue = await firebase
    .database()
    .ref('users')
    .child(user.uid)
    .child("hasBank")
    .once('value')
    .then(ref => ref.val())

    const balance = await firebase
    .database()
    .ref('users')
    .child(user.uid)
    .child('balance')
    .once('value')
    .then(ref => ref.val())

    ctx.body = {
      "uid": user.uid,
      "email": user.email,
      "emailVerified": user.emailVerified,
      "photoUrl": user.photoURL,
      "creditCards": cardNumArr,
      "hasBank": currentBankValue,
      "balance": balance,
      "displayName": user.displayName 
    }
    ctx.status = 200
  })
