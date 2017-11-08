import * as firebase from 'firebase-admin'
import app from './app'

import './routes'

firebase.initializeApp({
  credential: firebase.credential.cert(require('../key-firebase.json')),
  databaseURL: 'https://anypay-e40b4.firebaseio.com/'
})

app.listen(8080)