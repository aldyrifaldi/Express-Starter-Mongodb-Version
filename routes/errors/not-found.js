const express = require('express'),
    app = express(),
    router = express.Router()

router.use(function(req, res, next) {
    if (!req.route)
        return res.status(404).json({
            message: 'Not Found!'
        })  
        
    next();
});

module.exports = router