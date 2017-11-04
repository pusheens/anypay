import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as body from 'koa-body'

const app = new Koa()
const router = new Router()

router.post('/signup', body(), ctx => {
  const { email } = ctx.request.body

})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)