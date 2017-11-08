import * as firebase from 'firebase-admin'
import app from '../app'
import axios from 'axios'

app.post('/reset', async (req, res) => {
  try {
    const groupId = (await firebase.database().ref('groupId').once('value')).val()
    const apiKey = (await firebase.database().ref('keys').child('azure/face-ai').once('value')).val()

    console.log('delete azure group')

    await axios({
      method: 'DELETE',
      url: `https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/${groupId}`,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiKey
      }
    })

    console.log('recreate azure group')

    await axios({
      method: 'PUT',
      url: `https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/${groupId}`,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiKey
      },
      data: {
        name: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
      }
    })

    console.log('delete firebase user data')

    await firebase.database().ref('users').remove()

    const { users } = await firebase.auth().listUsers(1000)

    for (let user in users) {
      await new Promise(resolve => setTimeout(resolve, 100))
      await firebase.auth().deleteUser(users[user].uid)
    }

    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})