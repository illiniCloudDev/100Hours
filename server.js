const { error } = require('console')
const express = require('express')
const app = express()
const PORT = 3000
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://user:pss@expensesclusterone.pxpy4ui.mongodb.net/?retryWrites=true&w=majority&appName=ExpensesClusterOne'


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
    app.post('/expenses', (req,res) =>{
        expensesCollection
        .insertOne(req.body)
        .then(result => {
            res.redirect('/')
            console.log(result)
        })
        .catch(error => console.error(error))
    })

    app.listen(PORT, ()=>{
            console.log(`Your server is running on ${PORT}!`)
    })
    

    
}).catch(error => console.error(error))


