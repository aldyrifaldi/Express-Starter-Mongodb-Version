const User = require('../models/User')


exports.store = async (req,res) => {
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

exports.login = (request,response) => {

}