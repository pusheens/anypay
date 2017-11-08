import * as firebase from 'firebase-admin'
import * as functions from 'firebase-functions'

firebase.initializeApp(functions.config().firebase)

import app from './app'

import './routes'

exports.app = functions.https.onRequest(app)