const User = require('../models/User'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    dotenv = require('dotenv'),
    validation = require('../helpers/validator')

dotenv.config()


exports.register = async(req,res) => {

    try {

        if (req.body.password != req.body.password_confirmation) {
            return res.status(422),json({
                errors: {
                }
            })
        }
        // create user

        const user = await User.create(req.body)

        return res.status(200).json({
            data: user // created user
        })


    } catch (e) {
        const errors = await validation(e) // request validation
        console.log(errors);
         
        return res.status(422).json(errors)
        let statusCode = 500 // default internal server error status code
        let responseErrors = {
            error: e
        }
        if (errors.length > 0) { // if have error validation
            statusCode = 422 // validation error status code
            responseErrors = {
                errors: errors
            }
        }

    }
}

// exports.login = async (req,res) => {
//     // request validation
//     const rules = {
//         email: {type:"string",format:"email",required: true},
//         password: {type:"string",minLength:8,required: true},
//     }

//     const validator = InputValidator.validate("User",req.body,rules)
//     if (validator.errors.length > 0) {
//         return res.status(422).json({
//             errors: validator.errors
//         })
//     }

//     // get user by email
//     let attempt = await User.getUserByEmail(req.body.email)
//     // check password exists
//     let passwordExists = await bcrypt.compare(req.body.password,attempt.password)
//     if (!passwordExists) {
//         return res.status(401).json({
//             message: "Email or password doesn't exists!",
//         })
//     }

//     let payload = attempt

//     let token = await generateToken(payload)
//     return res.status(201).json({
//         message: 'Authenticated!',
//         token: token
//     })
// }

// async function generateToken(payload) {
//     let token = await jwt.sign(payload,process.env.JWT_SECRET)
//     return token
// }

// exports.authenticated = async (req,res) => {
//     try {
//         let token = req.headers.authorization.split(' ')[1]
//         let decoded = await jwt.verify(token,process.env.JWT_SECRET) 
//         return res.status(200).json({
//             data: decoded,
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Internal server error!',
//         })
//     }
// }
