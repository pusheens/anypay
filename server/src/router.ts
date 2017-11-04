import * as Router from 'koa-router'
import * as Koa from 'koa'
import * as firebase from 'firebase-admin'

export interface Context extends Koa.Context {
  state: {
    user: firebase.auth.UserRecord
  }  
}

const router = new Router()

export default router