import * as firebase from 'firebase-admin'
import * as body from 'koa-body'
import axios from 'axios'
import router, { Context } from '../router'

router
  .post('/detect_face',
  body({
    multipart: true
  }),
  async (ctx: Context) => {
    // Get photo from request
    const photo = ctx.request.body.files.photo

    // add money to receiving user's account
    const [pic] = await firebase
      .storage()
      .bucket('anypay-e40b4.appspot.com')
      .upload(photo.path)

    // Make photo available with out being signed in
    await pic.makePublic()

    //Get photo metadata
    const [metadata]: Array<any> = await pic.getMetadata()

    // Send photo to API, get faceId (used in identify) 
    const { data } = await axios({
      method: 'POST',
      url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": require('../../key-azure.json').faceAI
      },
      data: {
        url: metadata.mediaLink
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