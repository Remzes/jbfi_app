import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = Schema({
  username: {
    required: true,
    index: { unique: true },
    type: String,
    dropDups: true
  },
  email: {
    required: true,
    index: { unique: true },
    type: String,
    dropDups: true
  },
  password: {
    required: true,
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  role: {
    type: String
  }
}, { versionKey: false } )

UserSchema.statics.createUser = function(newUser, cb) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash
      newUser.save(cb)
    })
  })
}

UserSchema.statics.comparePasswords = function(userPassword, hash, cb) {
  bcrypt.compare(userPassword, hash, (err, isMatched) => {
    if (err) throw err
    cb(null, isMatched)
  })
}

export default mongoose.model("User", UserSchema)
