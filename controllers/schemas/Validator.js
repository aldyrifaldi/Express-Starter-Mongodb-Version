const Validator = require("../../libs/validator")


exports.validate = (id,data,properties) => {
    const schema = {
        id: id,
        type: 'object',
        properties: properties
    }
    
    return Validator.validate(data,schema)
}