const { error } = require('console')
const express = require('express')
const app = express()
const PORT = 3000
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId


require('dotenv').config()
const connectionString = process.env.DB_STRING


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
    app.post('/addTransaction', (req,res) =>{

        //this "object" is what we are receiving in JSON
        //we are using a feature of JavaScript called destructuring assignment
        // this would transalate to the following 

        //const description = req.body.description; 
        // const amount = req.body.amount; 
        // const type = req.body.type;

        const {description, amount, type} = req.body;

        expensesCollection
        .insertOne({
            description: description.trim(), 
            amount: amount,
            type: type
        })
        .then(result => {
            console.log(`Transaction Added! Result:${result.acknowledged}`)
            res.redirect('/')
            
        })
        .catch(error => console.error(error))
    })
    app.put('/updateTransaction', (req, res) => {

        const {id, description, amount, type} = req.body;
        
        expensesCollection.updateOne(
            {_id: new ObjectId(id)},

            {
                $set: {
                    description: description.trim(),
                    amount: amount,
                    type: type
                }
            }
        )
        .then(result => {
            console.log('Transaction Updated!');
            res.json('Transaction successfully updated!')
        })
        .catch( error => console.error(error));
        
    })

    app.delete('/deleteExpenses', (req,res) =>{
        //destructure the request body
        const {description, amount, type} = req.body;

        //logging the data for debugging
        console.log(description, amount, type);

        db.collection('expenses').deleteOne({
            description: description,
            amount: amount,
            type: type.toLowerCase()
        })
        .then( result => {
            console.log('Transaction deleted!')
            if (result.deletedCount === 0) {
                res.json('No transaction matched the criteria.');
            } else {
                res.json('Transaction successfully removed.');
            }
        })
    })

    app.listen(PORT, ()=>{
            console.log(`Your server is running on ${PORT}!`)
    })
    

    
}).catch(error => console.error(error))


