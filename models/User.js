const   mongoose = require('mongoose'),
        validator = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true,'is already exists'],
        lowercase: true,
        validate: {
            validator: (value) => {
                return new Promise((resolve, reject) => {
                    resolve(validator.isEmail(value));
                });
            },
            message: 'is not a valid email',
            type: 'email'
        },
    },
    password: {
        type: String,
        required: true,
    },
    email_verified_at: {
        type: Date,
        required: false,
        default: null,
    }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

module.exports = mongoose.model('User',userSchema)