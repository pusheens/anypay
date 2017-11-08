import * as firebase from 'firebase-admin'
import * as functions from 'firebase-functions'

firebase.initializeApp({
  credential: firebase.credential.cert(require('../service-account.json')),
  databaseURL: 'https://anypay-e40b4.firebaseio.com/'
})

import app from './app'

import './routes'

exports.app = functions.https.onRequest(app)