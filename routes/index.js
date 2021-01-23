const express = require('express'),
    subApp = express(),
    authRoutes = require('./auth'),
    notFound = require('./errors/not-found'),
    internalError = require('./errors/internal-error')

subApp.use('/api/auth/',authRoutes)
subApp.use(notFound)
subApp.use(internalError)

module.exports = subApp