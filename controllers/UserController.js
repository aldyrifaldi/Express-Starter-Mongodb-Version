const User = require('../models/User'),
    jwt = require('jsonwebtoken'),
    InputValidator = require('./schemas/Validator'),
    bcrypt = require('bcrypt'),
    dotenv = require('dotenv')


dotenv.config()

// create user 
exports.store = async (req,res) => {
    const rules = {
        name: {type: 'string',maxLength: 255,required: true},
        email: {type: 'string',maxLength: 255,required: true,format:'email'},
        password: {type: 'string',minLength: 8,required: true},
    }

    const validator = InputValidator.validate('User',req.body,rules)

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

exports.login = async (req,res) => {
    // request validation
    const rules = {
        email: {type:"string",format:"email",required: true},
        password: {type:"string",minLength:8,required: true},
    }

    const validator = InputValidator.validate("User",req.body,rules)
    if (validator.errors.length > 0) {
        return res.status(422).json({
            errors: validator.errors
        })
    }

    // get user by email
    let attempt = await User.getUserByEmail(req.body.email)
    // check password exists
    let passwordExists = await bcrypt.compare(req.body.password,attempt.password)
    if (!passwordExists) {
        return res.status(401).json({
            message: "Email or password doesn't exists!",
        })
    }

    let payload = attempt

    let token = await generateToken(payload)
    return res.status(201).json({
        message: 'Authenticated!',
        token: token
    })
}

async function generateToken(payload) {
    let token = await jwt.sign(payload,process.env.JWT_SECRET)
    return token
}

exports.authenticated = async (req,res) => {
    try {
        let token = req.headers.authorization.split(' ')[1]
        let decoded = await jwt.verify(token,process.env.JWT_SECRET) 
        return res.status(200).json({
            data: decoded,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error!',
        })
    }
}