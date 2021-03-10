const User = require('../models/User'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    dotenv = require('dotenv'),
    Response = require('../helpers/response'),
    Http = require('../enums/response-code'),
    Request = require('../helpers/request')

dotenv.config()

async function generateToken(payload) {
    let token = await jwt.sign(payload,process.env.JWT_SECRET)
    return token
}

module.exports = {
    register:  async(req,res) => {
        try {
            // password confirmation
            if (req.body.password != req.body.password_confirmation) {
                return Response.validatorError({
                    res: res,
                    errors: [
                        {
                            password: {
                                path: 'password',
                                type: 'confirmed',
                                message: "confirmation does'nt exists",
                                value: req.body.password_confirmation ? req.body.password_confirmation : ''
                            }
                        }
                    ],
                })
            }
    
            req.body.password = await bcrypt.hash(req.body.password,10)
    
            // create user
            const user = await User.create(Request.only(req.body,['username','email','password']))
            const token = await generateToken(Request.except(user,['password']))
            return Response.success({
                res: res,
                status: Http.CREATED,
                data: {
                   token: token
                }
            })
    
        } catch (e) {
            return Response.errorIncludeValidator({
                res:res,
                error: e
            })
        }
    },

    login: async (req,res) => {
      
        // get user by email
        let attempt = await User.findOne({
            email: req.body.email
        })

        // check password is exists
        let passwordExists = await bcrypt.compare(req.body.password,attempt.password)
        if (!passwordExists || attempt == null) {
            // password not exists or user not found
            return Response.clientError({
                res: res,
                status:Http.UNAUTHORIZED,
                message: "credentials not found!"
            })
        }

        const token = await generateToken(Request.except(attempt,['password']))
        return Response.success({
            res: res,
            data: {
                token: token
            },
        })
    },
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
