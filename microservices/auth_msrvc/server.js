import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import Seneca from 'seneca'
import Web from 'seneca-web'
import SenecaRoutes from './routes'
import SenecaPlugin from './plugin'
import dbInit from './db'
import User from './models/User'

dbInit()
const app = express()
const seneca = Seneca()

// Strategies
import Login from './strategies/login'
import Register from './strategies/register'

// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Passport init
passport.serializeUser((user, done) => {
  done(null, user._id)
})
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err))
})
passport.use('login', Login)
passport.use('register', Register)
app.use(passport.initialize())
app.use(passport.session())

const config = {
  adapter: require('seneca-web-adapter-express'),
  auth: passport,
  context: app,
  options: { parseBody: false },
  routes: SenecaRoutes
}
seneca
  .use(SenecaPlugin)
  .use(Web, config)
  .ready(() => {
    const server = seneca.export('web/context')()

    server.listen(3002, () => {
      console.log("Auth Microservice is listening to the port 3002...")
    })
  })