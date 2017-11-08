import * as express from 'express'
import * as multer from 'multer'
import * as cors from 'cors'

const app = express()

app.use(cors())

export default app

export const upload = multer({ 
  storage: multer.diskStorage({}) 
})