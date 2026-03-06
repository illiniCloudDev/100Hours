const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const { MongoStore } = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoute = require('./routes/mainRoute')
const dashboardRoutes = require('./routes/transactionsInRoutes')


require('dotenv').config({path: './config/.env'})

//console.log('--- DOTENV DEBUG --- DB_STRING:', process.env.DB_STRING);
// Passport config
require('./config/passport')(passport)

//calling the function to our db
connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(logger('dev'))

// Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}))
//passport middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use('/', mainRoute)
app.use('/dashboard', dashboardRoutes)

app.listen(process.env.PORT, () =>{
    console.log('Server is running! Get it!')
})