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
    const uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/grouptest";

    axios({
      method:'PUT',
      url:uriBase,
      headers: {
        "Content-Type":"application/json",
        "Ocp-Apim-Subscription-Key": require('../../key-azure.json').faceAI
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

app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(3000)
