const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

router.get('/login', AuthController.login)
router.get('/register', AuthController.register)
router.post('/register', AuthController.registerPost)
router.post('/login', AuthController.loginPost)
router.get('/logout', AuthController.logout)

module.exports = router