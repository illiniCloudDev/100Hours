const Transaction = require('../models/transaction')



module.exports = {
    getTransactions: async(req, res) =>{
        try {
            //variables awaiting for the future
            //let totalIncome
            //let totalExpense

            //Mongoose method, when called without any arguments, queries the MongoDB database and returns every single document (transaction) found in the transactions collection.

            const allTransactions = await Transaction.find()
            
            res.render('index.ejs', {expenses: allTransactions})
            
        } catch (err) {
            console.log(err)            
        }
    }
    
}