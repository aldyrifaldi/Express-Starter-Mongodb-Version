const express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/UserController'),
    jwtVerify = require('../middlewares/JwtMiddleware') // jwt middleware

// router.get('/user',jwtVerify,UserController.index)
// router.get('/user/:id',jwtVerify,UserController.show)
// router.post('/user',jwtVerify,UserController.store)
// router.put('/user/:id',jwtVerify,UserController.update)
// router.delete('/user/:id',jwtVerify,UserController.destroy)

// module.exports = router