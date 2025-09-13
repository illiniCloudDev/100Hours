const express = require('express')
const app = express()
const PORT = 3000
//const MongoClient = require

app.use(express.static('public'))



app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, ()=>{
        console.log(`Your server is running on ${PORT}!`)
})