// TODO: there are some problems: figure it out
import method from '../helpers/method'
import multer from 'multer'

module.exports = function plugin(options) {
  const seneca = this

  seneca.add({ role:"images", cmd: "avatar" }, (msg, done, stash) => {
    const method = Object.keys(msg.request$.route.methods)[0]
    switch(method) {
      case "get":
        done()
        break;
      case "post":
        console.log(msg.request$.files)
        done({ success: true, message: "You successfully uploaded avatar!" })
        break;
    }
  })

}