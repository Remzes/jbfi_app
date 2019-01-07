import User from '../models/User'
import PassportCustom from 'passport-custom'
const Strategy = PassportCustom.Strategy

const RegisterStrategy = new Strategy((req, done) => {
  const { username, password, email } = req.body
  if (!username || !password) {
    const error = new Error("Missing credentials")
    error.name = "IncorrectCredentialsError"
    return done(error)
  }
  const user = { username, password, email }
  const newUser = new User(user)
  User.createUser(newUser, err => {
    if (err) return done(err, false)
    return done(null, newUser)
  })
})

export default RegisterStrategy


