const User = require('../models/User'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    dotenv = require('dotenv'),
    Response = require('../helpers/response')
    
dotenv.config()


exports.register = async(req,res) => {

    try {

        // create user  
        const user = await User.create(req.body)

        return Response.success(res,user)

    } catch (e) {
        return Response.errorIncludeValidator(res,e)
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
