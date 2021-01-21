'use strict'
const db = require('../config/db')


const User = function(user) {
    this.name = user.name
    this.email = user.email
    this.password = user.password
}


User.create = (request,response) => {
    db.query("INSERT INTO users SET ?", request,function(error,result){
        if (error) {
            throw error
        }
        else {
            throw result
        }
    })
}

module.exports = User