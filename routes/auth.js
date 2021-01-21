const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
router.get('/login',(req,res) => {
    res.send('Login')
})



router.get('/register',UserController.create)

module.exports = router