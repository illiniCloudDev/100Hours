//this is our js to connect to our db 
//we are using mongoose - Mongoose is a separate library that adds a layer of abstraction and structure on top of the native driver

const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_STRING, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useFindAndModify: false,
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB