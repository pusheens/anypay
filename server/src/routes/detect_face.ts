import * as firebase from 'firebase-admin'
import * as body from 'koa-body'
import axios from 'axios'
import router, { Context } from '../router'
import uploadPhoto from '../middleware/uploadPhoto'

router
  .post('/detect_face',
  body({
    multipart: true
  }),
  async (ctx: Context) => {
    // Get photo from request
    const photo = ctx.request.body.files.photo

    const {pic, mediaLink} = await uploadPhoto(photo)

    // Send photo to API, get faceId (used in identify) 
    const { data } = await axios({
      method: 'POST',
      url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": require('../../key-azure.json').faceAI
      },
      data: {
        url: mediaLink
      }
    })

    // Train AI
    await axios({
      method: 'POST',
      url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/grouptest/train",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": require('../../key-azure.json').faceAI
      }
    })

    // Send faceId and groupId to search for matching candidates 
    var { data: candidateArray } = await axios({
      method: 'POST',
      url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": require('../../key-azure.json').faceAI
      },
      data: {
        faceIds: [data[0].faceId],
        personGroupId: 'grouptest'
      }
    })

    // Return a candidate if the confidence level is or above 50%
    const candidate = candidateArray[0].candidates.find((candidate: any) => {
      return candidate.confidence > 0.5
    })

    // Delete photo as it is only temporarily needed to find a match
    pic.delete()

    // Get users from firebase
    const users = await firebase.database()
      .ref('users')
      .once('value')
      .then(ref => ref.val())

    // If the candidate is found in firebase, return it in the response
    if (candidate) {
      for (let user in users) {
        if (users[user].personId == candidate.personId) {
          ctx.body = { user }
          ctx.status = 200
          return
        }
      }
    }

    // A candidate was not found, return null
    ctx.status = 200
    ctx.body = { user: null }
  }
)