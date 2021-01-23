const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({
        message: "Unauthorized"
    }) // if there isn't any token
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({
          message: "Forbidden"
      })
      req.user = user
      next() // pass the execution off to whatever request the client intended
    })
}


module.exports = authenticateToken