import * as Koa from 'koa'
import * as body from 'koa-body'
import * as firebase from 'firebase-admin'

import router from './router'
import * as cors from '@koa/cors'

import './routes/claim'
import './routes/confirm'
import './routes/detect_face'
import './routes/send'
import './routes/signup'
import './routes/credit_card'
import './routes/clear_data'

const app = new Koa()

firebase.initializeApp({
  credential: firebase.credential.cert(require('../key-firebase.json')),
  databaseURL: 'https://anypay-e40b4.firebaseio.com/'
})

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)