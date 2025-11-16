const express = require('express')
const router = express.Router()
const transactionsController = require('../controllers/transactionsInControllers')

router.get('/', transactionsController.getTransactions)
router.post('/createTransaction', transactionsController.createTransaction)
router.put('/updateTransaction', transactionsController.updateTransactionAmount)
router.delete('/deleteTransaction', transactionsController.deleteTransaction)

//Calendar routes will go here 
router.get('/api/calendar-events', transactionsController.getCalendarEvents)
router.put('/updateTransactionDate/:id', transactionsController.updateTransactionDate)

module.exports = router 
