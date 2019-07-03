const express           = require('express')
const session           = require('express-session')
const mongoose          = require('mongoose')
const logger            = require('morgan')
const bodyParser        = require('body-parser')
const busboy            = require('connect-busboy')
const MongoStore        = require('connect-mongo')(session)
const app               = express()

// -----------------------------------------------------------------------------------------------------
const mongoURI  = 'mongodb://localhost:27017/mdrive'
const secret    = 'mdrive-secret'
 
// -----------------------------------------------------------------------------------------------------
// Connect to DB
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.connect(mongoURI)
mongoose.connection.on('error', (err) => {
  console.log('unable to connect to DB')
  process.exit()
})

// -----------------------------------------------------------------------------------------------------
// Set up express
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(busboy({ highWaterMark: 2 * 1024 * 1024 }))
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret,
  cookie: { maxAge: 1209600000 },
  store: new MongoStore({
    url: mongoURI,
    autoReconnect: true,
  })
}))
// CORs, lifted from Mozilla website
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
  res.setHeader("Access-Control-Allow-Headers", "x-access-token, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
  next()
})

// -----------------------------------------------------------------------------------------------------
// Set up routing
app.use('/api', require('./routes/main'))

// -----------------------------------------------------------------------------------------------------
// Begin server
app.listen(8888, () => console.log('API on 8888'))