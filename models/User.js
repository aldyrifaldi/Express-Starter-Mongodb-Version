'use strict'
const db = require('../config/db')


const User = function(user) {
    this.name = user.name
    this.email = user.email
    this.password = user.password
}


User.create = (request,response) => {
    console.log(request);
    db.query("INSERT INTO users SET ?", request,function(err,result,fileds){
        if (err) throw err
        console.log(result);
    })
}

module.exports = User