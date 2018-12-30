const app = require('express')()
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')

// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Express Session
app.use(expressSession({
    secret: 'sessionSecret',
    cookie: { maxAge: 360000 }
}))

// Cookie Parser
app.use(cookieParser())

app.listen(3001, () => {
    console.log('Server running on PORT 3001')
})
