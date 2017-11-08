import { RequestHandler } from 'express'
import * as firebase from 'firebase-admin'

const auth: RequestHandler = async function (req, res, next) {
  const token = req.header('token')
  const { uid } = await firebase.auth().verifyIdToken(token || '');
  const user = await firebase.auth().getUser(uid)
  res.locals.user = user
  next()
}

export default auth