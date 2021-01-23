const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const jwtVerify = require('../middlewares/JwtMiddleware') // jwt middleware

router.get('/users',jwtVerify,UserController.index)
router.post('/register',UserController.store)
router.post('/login',UserController.login)
router.get('/me',jwtVerify,UserController.authenticated)

module.exports = router