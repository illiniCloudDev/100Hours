const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true, 
        trim: true,
    },
    amount:{
        type: Number,
        required: true,
        min: 0,
    },
    type: {
        type: String,
        required: true,
        enum: ['Income', 'Expense'],
    },
    category: {
        type: String, 
        required: false,
    },
    //will be implementing date down the road - using current schema for testing 
    // date:{
    //     type: Date,
    //     default: Date.now,
    // },
});

//'Transaction' (The First Argument): This is the Model Name (or Singular Collection Name)
//TransactionSchema (The Second Argument): This is the Schema object we defined (the blueprint for our data).
module.exports = mongoose.model('Transaction', TransactionSchema)