const User = require('../models/User')
const {body} = require('express-validator')
const UserSchema = require('./schemas/User')

exports.store = async (req,res) => {
    const validator = UserSchema.validate(req.body)
    if (validator.errors.length > 0) {
        return res.status(422).json({
            errors: validator.errors
        })
    }
    try {
        const data = await User.createUser(req.body)
        
        return res.status(201).json({
            message: 'User has been created!',
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error!',
            error: error
        })
    }
}

function rules() {

}



exports.index = async (req,res) => {
    try {
        const data = await User.getAllUsers()

        return res.status(200).json({
            message: 'Users Fetched Successfully',
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error!'
        })        
    }
}

exports.login = (request,response) => {

}