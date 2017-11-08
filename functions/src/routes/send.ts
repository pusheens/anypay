import * as bodyParser from 'body-parser'
import * as firebase from 'firebase-admin'
import app from '../app'
import auth from '../middleware/auth'

app.post('/send', auth, bodyParser.json(), async (req, res) => {
  const user: firebase.auth.UserRecord = res.locals.user
  const { amount, receiver } = req.body

  console.log('sending money')

  await firebase
    .database()
    .ref('users')
    .child(receiver)
    .child('balance')
    .transaction(balance => balance + Number(amount))

  res.sendStatus(200)
})
