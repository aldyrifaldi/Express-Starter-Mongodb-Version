const express = require('express'),
    subApp = express(),
    authRoutes = require('./auth')

subApp.use('/api/auth/',authRoutes)

module.exports = subApp