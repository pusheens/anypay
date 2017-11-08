import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as multer from 'multer'
import * as cors from 'cors'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

export default app

export const upload = multer({ 
  storage: multer.diskStorage({}) 
})