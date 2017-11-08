import * as firebase from 'firebase-admin'
import app, { upload } from '../app'
import axios from 'axios'
import uploadPhoto from '../lib/uploadPhoto'

app.post('/detect', upload.single('photo'), async (req, res) => {
  try {
    const { photo, link } = await uploadPhoto(req.file.path)
    const { name, email } = req.body

    const groupId = (await firebase.database().ref('groupId').once('value')).val()
    const apiKey = (await firebase.database().ref('keys').child('azure/face-ai').once('value')).val()

    console.log('Send photo to API, get faceId')

    const { data } = await axios({
      method: 'POST',
      url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiKey
      },
      data: {
        url: link
      }
    })

    console.log('train')

    await axios({
      method: 'POST',
      url: `https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/${groupId}/train`,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiKey
      }
    })

    console.log('get candidate arrays')

    const { data: candidateArray } = await axios({
      method: 'POST',
      url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiKey
      },
      data: {
        faceIds: [data[0].faceId],
        personGroupId: `${groupId}`
      }
    })

    const candidate = candidateArray[0].candidates.find((candidate: any) => {
      return candidate.confidence > 0.25
    })

    console.log('delete photo from firebase')

    photo.delete()

    console.log('get users from firebase')

    const users = await firebase.database()
      .ref('users')
      .once('value')
      .then(ref => ref.val())

    res.status(200)

    if (candidate) {
      for (let id in users) {
        if (users[id].personId == candidate.personId) {
          const user = await firebase.auth().getUser(id)
          res.send({ user: id, confidence: candidate.confidence, photoUrl: user.photoURL })
          return
        }
      }
    }
    
    res.send({ user: null })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})