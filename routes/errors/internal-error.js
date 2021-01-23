const express = require('express'),
    app = express.Router(),
    dotenv = require('dotenv')

dotenv.config()

// development error handler
// will print stacktrace
if (process.env.LOG_LEVEL === 'debug') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
    });
});

module.exports = app