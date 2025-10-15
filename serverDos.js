const express = require('express')
const app = express()
const connectDB = require('./config/database')
const transactionRoutes = require('./routes/transactionsInRoutes')


require('dotenv').config({path: './config.env'})

//calling the function to our db
connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', transactionRoutes)

app.listen(process.env.PORT, () =>{
    console.log('Server is running! Get it!')
})