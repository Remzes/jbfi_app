import mongoose from 'mongoose'
import config from '../config'

export default () => {
  mongoose.connect(config.mongoURLLocal, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
}