require('dotenv').config()

const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportConfig = require('./config/passportConfig')
const expFlash = require('express-flash')

const expSession = require('express-session')

const eventRouter = require('./app/routes/eventRouter')
const userRouter = require('./app/routes/userRouter')
const customerRouter = require('./app/routes/customerRouter')

app.use(bodyParser.json())
app.use(express.json())
app.use(express.static('public'))

app.use(
  expSession({
    secret: 'secret-session',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 84000000
    }
  })
)

app.use(expFlash())

app.engine(
  'hbs',
  hbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: false
    }
  })
)
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

passportConfig()
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.isAuthenticated() // pass request object to views
  next()
})

app.use('/', userRouter)
app.use('/', eventRouter)
app.use('/', customerRouter)

app.listen(process.env.PORT || 8080, function () {
  console.log('Serwer Node.js działa')
})
