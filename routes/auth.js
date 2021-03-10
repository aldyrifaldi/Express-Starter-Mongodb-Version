const express = require('express'),
    router = express.Router(),
    AuthController = require('../controllers/AuthController'),
    jwtVerify = require('../middlewares/JwtMiddleware') // jwt middleware

    router.post('/register',AuthController.register)
// router.post('/login',AuthController.login)
// router.get('/me',jwtVerify,AuthController.authenticated)

module.exports = router
