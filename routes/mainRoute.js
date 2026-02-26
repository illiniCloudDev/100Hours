const express = require('express')
const router = express.Router()
const authController = require('../controllers/authControllers')
const homeController = require('../controllers/homeControllers')
const {ensureAuth, ensureGuest} = require('../middleware/auth')

//Main Routes - simplified for now
router.get('/', homeController.getIndex)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router
