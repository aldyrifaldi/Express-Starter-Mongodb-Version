const   Validator = require('../helpers/validator'),
        Http = require('../enums/response-code')

exports.success = async(res,data,status = Http.OK) => {
    return res.status(status).json({
        data: data
    })
}

exports.errorIncludeValidator = async (res,error, status = Http.INTERNAL_SERVER_ERROR) => {
    const validator = await Validator(error)
    console.log(validator);
    if (validator.length > 0) {
        return res.status(Http.UNPROCESSABLE_ENTITY).json({
            errors: validator
        })
    }

    return res.status(status).json({
        errors: error
    })
}

exports.error = async (res,error,status = Http.INTERNAL_SERVER_ERROR) => {
    return res.status(status).json({
        error: error
    })
}