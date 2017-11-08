import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as firebase from 'firebase-admin'
import app, { upload } from '../app'
import auth from '../middleware/auth'

app.post('/card', auth, bodyParser.json(), async (req, res) => {
  const user: firebase.auth.UserRecord = res.locals.user

  console.log('adding credit cards')

  await firebase.database()
    .ref('users')
    .child(user.uid)
    .child("creditCards")
    .push(req.body.number)

  res.sendStatus(200)
})
