const Transaction = require('../models/transaction')


module.exports = {
    getDashboard: async(req, res) =>{
        //console.log for testing purposes
        console.log('Dashboard Loaded')
        console.log(req.user)
        try {
            //variables awaiting for the future
            //let totalIncome
            //let totalExpense

            //Mongoose method, when called without any arguments, queries the MongoDB database and returns every single document (transaction) found in the transactions collection.

            //const allTransactions = await Transaction.find()
            const userTransactions = await Transaction.find({userId: req.user._id})
            //to test if we are getting the transactions from the database, we can log them to the console
            //console.log(allTransactions)
            
            //use expenses variable for our dashboard.ejs
            res.render('dashboard.ejs', {expenses: userTransactions, user: req.user.userName})
            
        } catch (err) {
            console.log(err)            
        }
    },
    getCalendarEvents: async (req, res) => {
        try {
            const transactions = await Transaction.find( {
                userId: req.user._id,
                date: {
                    $exists: true,
                    $ne: null
                }
            });
            const events = transactions.map(transaction => ({
                id: transaction._id,
                title: transaction.description,
                start: transaction.date,
                allDay: true,
            }));

            res.json(events);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    createTransaction: async (req, res) => {
        //console.log for testing purposes
        console.log(req.body)
        try {
            await Transaction.create({description:req.body.description, amount:req.body.amount,date:req.body.date,type:req.body.type, userId: req.user._id})
            console.log('Transaction Added!')
            res.redirect('/dashboard')            
        } catch (err) {
            console.log(err)   
        }
    },
    updateTransactionDate: async (req, res) => {
        console.log(req.body.id);
        console.log(req.body.date);
        try {
            await Transaction.findOneAndUpdate(
                {_id:req.body.id},
                {date:req.body.date}
            );
            console.log('Transaction Date Updated!')
            res.json('Update Completed!');
        } catch (err) {
            console.log(err)
        }
    },
    unscheduleEvent: async (req, res) => {
        console.log(req.body.id);
        try {
            await Transaction.findOneAndUpdate(
                {_id:req.body.id},
                {date: null}
            );
            console.log('Transaction Unscheduled!');
            res.json('Unschedule Completed!');
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    updateTransactionAmount: async (req, res) => {
        
        console.log(req.body.amount, req.body.transactionIdFromJSFile)

        try {
            await Transaction.findOneAndUpdate(
                {_id:req.body.transactionIdFromJSFile},
                {amount:req.body.amount}
            );

            console.log('Transaction Amount Updated!')
            res.json('Update Completed!');
            
        } catch (err) {
            console.log(err)            
        }
        
    },    
    deleteTransaction: async(req, res) => {
        //console.log for testing purposes
        //console.log(req.body.transactionIdFromJSFile)
        try {
            await Transaction.findOneAndDelete({_id:req.body.transactionIdFromJSFile})
            console.log('Deleted Transaction!')

            res.json('Response Received!')
            
        } catch (err) {
            console.log(err)   
        }
    },
    
}