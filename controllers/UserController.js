const User = require('../models/User')
const InputValidator = require('./schemas/Validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config()

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

    let payload = {
        id: attempt.id,
        name: attempt.name,
        email: attempt.email,
    }

    let token = await generateToken(payload)
    return res.status(201).json({
        message: 'Authenticated!',
        token: token
    })
}

async function generateToken(payload) {
    let token = await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '3600'})
    return token
}

exports.authenticated = (req) => {
    console.log(req.rawHeaders);
}