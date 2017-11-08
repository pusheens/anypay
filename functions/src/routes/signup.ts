import app, { upload } from '../app'
import * as express from 'express'  
import * as firebase from 'firebase-admin'
import uploadPhoto from '../lib/uploadPhoto'
import axios from 'axios'

app.post('/signup', upload.single('photo'), async (req, res, next) => {
  try {
    const { photo, link } = await uploadPhoto(req.file.path)
    const { name, email } = req.body
  
    const user = await firebase.auth().createUser({
      displayName: name,
      email,
      photoURL: link
    })

    const groupId = (await firebase.database().ref('groupId').once('value')).val()
    const apiKey = (await firebase.database().ref('keys').child('azure/face-ai').once('value')).val()
    
    console.log('adding person to group')

    const { data: { personId } } = await axios({
      method:'POST',
      url:`https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/${groupId}/persons`,
      headers: {
        "Content-Type":"application/json",
        "Ocp-Apim-Subscription-Key": apiKey
      },
      data: {
        name: user.uid
      }
    })

    console.log('training group')

    await axios({
      method: 'POST',
      url: `https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/${groupId}/train`,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiKey
      }
    })

    console.log('persist face', groupId, link, personId)

    await axios({
      method:'POST',
      url:`https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/${groupId}/persons/${personId}/persistedFaces`,
      headers: {
        "Content-Type":"application/json",
        "Ocp-Apim-Subscription-Key": apiKey
      },
      data: {
        url: link
      }
    })

    console.log('save firebase data')

    await firebase
      .database()
      .ref('users')
      .child(user.uid)
      .set({
        personId,
        balance: 0,
        creditCards: [],
        hasBank: false
      })

    console.log('generating token')
    
    res.status(200)
    res.send({
      token: await firebase.auth().createCustomToken(user.uid)
    })
    
  } catch (error) {
    res.sendStatus(500)
    console.log(error.message)
  }
})