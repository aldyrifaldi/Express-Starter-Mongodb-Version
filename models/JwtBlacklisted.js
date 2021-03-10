const { Mongoose } = require("mongoose");
const mongoose = require('mongoose')


const jBListSchema = new mongoose.schema(
    {
        token: {
            type: String,
            required: true
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