const jwt = require('jsonwebtoken'),
    dotenv = require('dotenv'),
    Http = require('../enums/response-code'),
    JwtBlacklisted = require('../models/JwtBlacklisted')

dotenv.config()

async function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const blacklisted = await JwtBlacklisted.findOne({token: token})

    if (blacklisted != null) {
        return res.status(Http.FORBIDDEN).json({
            message: "Forbidden"
        })
    }
    if (token == null) return res.status(Http.UNAUTHORIZED).json({
        message: "Unauthorized"
    }) // if there isn't any token
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(Http.FORBIDDEN).json({
          message: "Forbidden"
      })
      req.user = user
      next() // pass the execution off to whatever request the client intended
    })
}

module.exports = authenticateToken