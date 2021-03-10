const Validator = require('../helpers/validator')

exports.error = async (response,error) => {
    const validator = await Validator(error)

    console.log(validator.length);
    if (validator.length > 0) {
        return response.status(422).json({
            errors: validator
        })
    }

    return response.status(500).json({
        errors: error
    })
}