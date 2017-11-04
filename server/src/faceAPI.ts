import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as body from 'koa-body'
import axios from 'axios'

const app = new Koa()
const router = new Router()

router.post('/signup', body(), ctx => {
  const { email } = ctx.request.body

})

router.get('/group', ctx => {
    const subscriptionKey = "25020457c33748acbecc1e9eb36ad0dc";
  
    const uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/grouptest";

    axios({
      method:'PUT',
      url:uriBase,
      headers: {
        "Content-Type":"application/json",
        "Ocp-Apim-Subscription-Key": subscriptionKey
      },
      data: {
        name: 'group1',
        userData: 'testData'
      }
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(errorThrown => {
      console.log(errorThrown.response.data);
    })
})

router.get('/newPerson', ctx => {
  const subscriptionKey = "25020457c33748acbecc1e9eb36ad0dc";

  const uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/grouptest/persons";

  String personId = await axios({
    method:'POST',
    url:uriBase,
    headers: {
      "Content-Type":"application/json",
      "Ocp-Apim-Subscription-Key": subscriptionKey
    },
    data: {
      name: 'person1',
      userData: 'test user Data'
    }
  })
  .then(response => {
    console.log(response.data.personId)
    // e054238e-33ac-4b6c-8e4d-65d7c4ffc262
    
  })
  .catch(errorThrown => {
    console.log(errorThrown.response.data);
  })
})

router.get('/addFace', ctx => {
  const subscriptionKey = "25020457c33748acbecc1e9eb36ad0dc";
  const groupId = "grouptest"
  const personId = "e054238e-33ac-4b6c-8e4d-65d7c4ffc262"
  const uriBase = `https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/${groupId}/persons/${personId}/persistedFaces`
  const sourceImageUrl: String = "https://upload.wikimedia.org/wikipedia/commons/c/c3/RH_Louise_Lillian_Gish.jpg";
  
  axios({
    method:'POST',
    url:uriBase,
    headers: {
      "Content-Type":"application/json",
      "Ocp-Apim-Subscription-Key": subscriptionKey
    },
    data: {
      url: sourceImageUrl
    }
  })
  .then(response => {
    console.log(response.data)
    
  })
  .catch(errorThrown => {
    console.log(errorThrown.response.data);
  })
})

app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(3000)
