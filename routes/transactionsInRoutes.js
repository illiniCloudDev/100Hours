const express = require('express')
const router = express.Router()
const transactionsController = require('../controllers/transactionsInControllers')
const {ensureAuth} = require('../middleware/auth')

//Authenticated Routes
router.get('/', ensureAuth, transactionsController.getDashboard)

//Transactions Routes

router.post('/createTransaction', transactionsController.createTransaction)
router.put('/updateTransaction', transactionsController.updateTransactionAmount)
router.delete('/deleteTransaction', transactionsController.deleteTransaction)

//Calendar routes will go here 
router.get('/api/calendar-events', transactionsController.getCalendarEvents)
router.put('/updateTransactionDate', transactionsController.updateTransactionDate)
router.put('/unscheduleEvent', transactionsController.unscheduleEvent)

module.exports = router 
