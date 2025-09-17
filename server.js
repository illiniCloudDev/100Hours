const { error } = require('console')
const express = require('express')
const app = express()
const PORT = 3000
const MongoClient = require('mongodb').MongoClient
const connectionString = process.env.DB_STRING

require('dotenv').config()


MongoClient.connect(connectionString).then( client => {
    console.log('connected to database')
    //calling the data base financial expenses
    const db = client.db('financial-expenses')
    //calling the collection inside the db
    const expensesCollection = db.collection('expenses')

    //tells Express we’re using EJS as the template engine

    app.set('view engine', 'ejs')

    //helps to pull data from the form
    app.use(express.urlencoded({extended: true}))
    //tells express to pull files from the public folder
    app.use(express.static('public'))
    //using JSON for fetch requests
    app.use(express.json())


    app.get('/', (req, res) =>{
        //res.sendFile(__dirname + '/index.html')
        //this cursor object contains all quotes from our database! It has a bunch of method that lets us get our data.
        db.collection('expenses')
            .find()
            .toArray()
            .then(results => {
                
                res.render('index.ejs',{expenses: results})
            })
            .catch(error => console.error(error))
            
        
    })
    app.post('/addExpenses', (req,res) =>{
        expensesCollection
        .insertOne({description: req.body.description, expense: req.body.expense})
        .then(result => {
            res.redirect('/')
            console.log(result)
        })
        .catch(error => console.error(error))
    })

    app.delete('/deleteExpenses', (req,res) =>{
        console.log(req.body.description)
        db.collection('expenses').deleteOne({description: req.body.description})
        .then( result => {
            console.log('Expense Delay-tay')
            res.json('Removed Expense')
        })
    })

    app.listen(PORT, ()=>{
            console.log(`Your server is running on ${PORT}!`)
    })
    

    
}).catch(error => console.error(error))


