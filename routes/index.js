const express = require('express'),
    subApp = express(),
    authRoutes = require('./auth'),
    userRoutes = require('./user'),
    notFound = require('./errors/not-found'),
    internalError = require('./errors/internal-error')

subApp.use('/api/auth/',authRoutes)
// subApp.use('/api/user/',userRoutes)
// subApp.use(notFound)
// subApp.use(internalError)

module.exports = subApp