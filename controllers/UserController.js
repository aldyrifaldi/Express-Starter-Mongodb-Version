const User = require('../models/User')

exports.create = (req,res) => {
    console.log(req.query);
    let newUser = new User(req.query)
    console.log(newUser);
    // handle null error
    if (!newUser.name || !newUser.email || !newUser.password) {
        res.status(400).send({
            error:true,
            message: 'Please provide user/status'
        })
    }
    else {
        User.create(newUser,(err,user) => {
            if (err) {
                res.send(err)
                res.json(user)
            }
        })
    }
}