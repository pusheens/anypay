import * as bodyParser from 'body-parser'
import * as firebase from 'firebase-admin'
import app from '../app'
import auth from '../middleware/auth'

app.post('/claim', auth, bodyParser.json(), async (req, res) => {
  const user: firebase.auth.UserRecord = res.locals.user

  await firebase
    .database()
    .ref('users')
    .child(user.uid)
    .child('balance')
    .set(0)

  res.sendStatus(200)
})
