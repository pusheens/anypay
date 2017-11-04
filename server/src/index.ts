import * as Koa from 'koa'
import * as body from 'koa-body'
import * as firebase from 'firebase-admin'

import router from './router'

import './routes/claim'
import './routes/detect_face'
import './routes/send'
import './routes/signup'

const app = new Koa()

firebase.initializeApp({
  credential: firebase.credential.cert(require('../admin-key.json')),
  databaseURL: 'https://anypay-e40b4.firebaseio.com/'
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)