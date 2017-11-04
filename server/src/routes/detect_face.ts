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
    const photo = ctx.request.body.files.photo

    // add money to receiving user's account
    const [pic] = await firebase
      .storage()
      .bucket('anypay-e40b4.appspot.com')
      .upload(photo.path)

    await pic.makePublic()

    const [metadata]: Array<any> = await pic.getMetadata()

    const subscriptionKey = "25020457c33748acbecc1e9eb36ad0dc";

    const { data } = await axios({
      method: 'POST',
      url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": subscriptionKey
      },
      data: {
        url: metadata.mediaLink
      }
    })

    await axios({
      method: 'POST',
      url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/grouptest/train",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": subscriptionKey
      }
    })

    //identify

    var { data: candidateArray } = await axios({
      method: 'POST',
      url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": subscriptionKey
      },
      data: {
        faceIds: [data[0].faceId],
        personGroupId: 'grouptest'
      }
    })


    const candidate = candidateArray[0].candidates.find((candidate: any) => {
      return candidate.confidence > 0.70
    })

    const users = await firebase.database()
    .ref('users')
    .once('value')
    .then(ref => ref.val())

    if (candidate) {
      for (let user in users) {
        if (users[user].personId == candidate.personId) {
          ctx.body = { user }
          ctx.status = 200
          return
        }
      }
    }

    ctx.status = 200
    ctx.body = { user: null }
  }
)