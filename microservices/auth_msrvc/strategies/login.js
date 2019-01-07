import User from '../models/User'
import PassportCustom from 'passport-custom'
const Strategy = PassportCustom.Strategy
import jwt from 'jsonwebtoken'

const LoginStrategy = new Strategy((req, done) => {
  const { username, password } = req.body

  if (!username || !password) {
    const error = new Error("Missing credentials")
    error.name = "IncorrectCredentialsError"
    return done(error)
  }

  const userData = { username: username.trim(), password: password.trim() }

  User.findOne({ username: userData.username }, (err, user) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      const error = new Error("Incorrect username or password")
      error.name = "IncorrectCredentialsError"
      return done(error)
    }

    User.comparePasswords(userData.password, user.password, (pErr, isMatched) => {
      if (err) {
        return done(err)
      }
      if (!isMatched) {
        const error = new Error("Incorrect username or password")
        error.name = "IncorrectCredentialsError"
        return done(error)
      } else {
        jwt.sign({ user }, 'jwt_key', { expiresIn: 3600 }, (err, token) => {
          if (err) {
            const error = new Error("Internal Server Error")
            return done(error)
          }
          done(null, token, user)
        })
      }
    })
  })
})

export default LoginStrategy