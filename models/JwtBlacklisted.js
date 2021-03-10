const { Mongoose } = require("mongoose");
const mongoose = require('mongoose')


const jBListSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            unique: [true,'is already exists'],
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    }
)

module.exports = mongoose.model('JwtBlacklisted',jBListSchema)