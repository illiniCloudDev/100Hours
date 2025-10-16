const express = require('express')
const router = express.Router()
const transactionsController = require('../controllers/transactionsInControllers')

router.get('/', transactionsController.getTransactions)

module.exports = router 
