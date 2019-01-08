import express from 'express'
import bodyParser from 'body-parser'
import Seneca from 'seneca'
import Web from 'seneca-web'
import multer from 'multer'
import SenecaRoutes from './routes'
import SenecaPlugin from './plugin'
import dbInit from './db'

// Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, `avatar_${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (!['image/jpeg', 'image/gif', 'image/png'].includes(file.mimetype)) {
    return cb(new Error("Incorrect file format!"), false)
  }

  if (file.size > 1024 * 1024 * 2) {
    return cb(new Error("Exceeded file size maximum!"), false)
  }

  return cb(null, true)
}

dbInit()
const app = express()
const seneca = Seneca()

// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Multer
app.use(multer({
  storage,
  fileFilter,
}).any())

app.use(function (err, req, res, next) {
  if (err) {
    const title = err.stack.split('\n')[0]
    res.status(500).send({ success: false, message: title })
  } else {
    next()
  }
})

const config = {
  adapter: require('seneca-web-adapter-express'),
  context: app,
  options: { parseBody: false },
  routes: SenecaRoutes
}
seneca
  .use(SenecaPlugin)
  .use(Web, config)
  .ready(() => {
    const server = seneca.export('web/context')()

    server.listen(3003, () => {
      console.log("Images Microservice is listening to the port 3003...")
    })
  })