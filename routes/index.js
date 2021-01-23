const express = require('express')
const subApp = express()
const authRoutes = require('./auth')

subApp.use('/api/auth/',authRoutes)

module.exports = subApp