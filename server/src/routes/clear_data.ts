import * as firebase from 'firebase-admin'
import * as body from 'koa-body'
import axios from 'axios'
import groupIdHelper from '../middleware/groupIdHelper'

import router, { Context } from '../router'
import auth from '../middleware/auth'

router
  .post('/clear_data', body(), async (ctx: Context) => {
    const { password } = ctx.request.body
    let { newGroupId } = ctx.request.body

    if (password === require('../../key-password.json').password) {
      // await firebase
      // .database()
      // .ref("users")
      // .remove()

      let groupId = await groupIdHelper.getGroupId()

      try {
        await axios({
          method: 'DELETE',
          url: `https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/${groupId}`,
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": require('../../key-azure.json').faceAI
          }
        })
      } catch (error) {
        console.log('[ clear_data | DELETE ] ' + error)
      }

      newGroupId = newGroupId ? newGroupId : groupId

      try {
        await axios({
          method: 'PUT',
          url: `https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/${newGroupId}`,
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": require('../../key-azure.json').faceAI
          },
          data: {
            name: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
          }
        })
      } catch (error) {
        console.log('[ clear_data | PUT ] ' + error)
      }

      await groupIdHelper.setGroupId(newGroupId)
      
      ctx.status = 200
    } else {
      ctx.status = 401
    }
  })