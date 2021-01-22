const Validator = require("../../libs/validator")

const schema = {
    id: "User",
    type: 'object',
    properties: {
        name: {"type": "string","maxLenght":255,"required":true},
        email: {"type": "string","format":"email","required":true},
        password: {"type": "string","minLength":8,"required":true},
    }
}

exports.validate = (data) => {
   return Validator.validate(data,schema)
}