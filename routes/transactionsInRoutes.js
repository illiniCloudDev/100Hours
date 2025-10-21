const express = require('express')
const router = express.Router()
const transactionsController = require('../controllers/transactionsInControllers')

router.get('/', transactionsController.getTransactions)
router.post('/createTransaction', transactionsController.createTransaction)
router.delete('/deleteTransaction', transactionsController.deleteTransaction)

module.exports = router 
