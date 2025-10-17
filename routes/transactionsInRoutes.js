const express = require('express')
const router = express.Router()
const transactionsController = require('../controllers/transactionsInControllers')

router.get('/', transactionsController.getTransactions)
router.delete('/', transactionsController.deleteTransaction)

module.exports = router 
