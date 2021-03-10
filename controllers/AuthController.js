const User = require('../models/User'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    dotenv = require('dotenv'),
    Response = require('../helpers/response'),
    Http = require('../enums/response-code'),
    Request = require('../helpers/request'),
    JwtBlacklisted = require('../models/JwtBlacklisted')

dotenv.config()

async function generateToken(payload) {
    let token = await jwt.sign(payload,process.env.JWT_SECRET)
    return token
}

async function getPayloadToken(req) {
    let token = req.headers.authorization.split(' ')[1]
    let decoded = await jwt.verify(token,process.env.JWT_SECRET)

    return decoded._doc
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


    authenticated: async(req,res) => {
        try {
            
            const decoded = await getPayloadToken(req)
            const user = await User.findOne({_id: decoded._id})
            return Response.success({
                res: res,
                data: user,
            })
            
        } catch (error) {
            return Response.error({
                res: res,
                error: error,
            })
            
        }
    },

    logout: async(req,res) => {
        try {
            const decoded = await getPayloadToken(req)
            
            const user = await User.findOne({_id:decoded._id})
            
            if (user == null) {
                return Response.error({
                    error: {
                        message: 'user not found!',
                    },
                    status: Http.NOT_FOUND,
                    res: res
                })
            }
            let token = req.headers.authorization.split(' ')[1]
            const createBlackList = await JwtBlacklisted.create({token: token}) 
            
            return Response.success({
                res: res,
                status: Http.NO_CONTENT
            })
        } catch (error) {
            return Response.errorIncludeValidator({
                res: res,
                error: error,
            })
        }
    }
}