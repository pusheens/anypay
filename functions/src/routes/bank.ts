import * as bodyParser from 'body-parser'
import * as firebase from 'firebase-admin'
import app from '../app'
import auth from '../middleware/auth'

app.post('/bank', auth, bodyParser.json(), async (req, res) => {
  const user: firebase.auth.UserRecord = res.locals.user

  await firebase
    .database()
    .ref('users')
    .child(user.uid)
    .child('hasBank')
    .set(true)

  res.sendStatus(200)
})
