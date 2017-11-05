import * as firebase from 'firebase-admin'

import router, { Context } from '../router'

router
  .get('/confirm', async (ctx: Context) => {
    const { code } = ctx.query
    console.log(code)

    const users = await firebase.database()
      .ref('users')
      .once('value')
      .then(ref => ref.val())

    for (let id in users) {
      if (users[id].confirmationCode === code) {
        const user = await firebase.auth().updateUser(id, {
          emailVerified: true
        })
        ctx.status = 200
        return
      }
    }

    ctx.status = 400
  })