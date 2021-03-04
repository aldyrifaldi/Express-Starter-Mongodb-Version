const dotenv = require('dotenv')
const config = require('./config/database')
dotenv.config()

// In this file you can configure migrate-mongo

// Return the config as a promise
module.exports = config;
