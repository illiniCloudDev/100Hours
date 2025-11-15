const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    description:{
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
    // category: {
    //     type: String, 
    //     required: false,
    // },
    //will be implementing date down the road - using current schema for testing 
    date:{
        type: Date,
        required: true,
    },
},{
    //we are only keeping this to route the request to the actual collection called expense
    //will update the actual collection after testing 
    collection: 'expenses'

});

//'Transaction' (The First Argument): This is the Model Name (or Singular Collection Name)
//TransactionSchema (The Second Argument): This is the Schema object we defined (the blueprint for our data).
module.exports = mongoose.model('Transaction', TransactionSchema)