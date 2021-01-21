const User = require('../models/User')

exports.create = (req,res) => {
    let newUser = new User(req.query)
    // handle null error
    if (!newUser.name || !newUser.email || !newUser.password) {
        res.status(400).send({
            error:true,
            message: 'Please provide name/email/password'
        })
    }
    else {
        User.create(newUser,(err,user) => {
            if (err) {
                res.status(500).send({
                    message: 'Internal Server Error',
                })
            }
            else {
                res.status(204).send({
                    message: 'User Created!',
                })
            }
        })
    }
}