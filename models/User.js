const db = require('../config/db')
const {PrismaClient} =  require("@prisma/client");
const prisma = new PrismaClient({});
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

exports.createUser = async (request) => {

    let hashedPassword = await bcrypt.hash(request.password, 10)

    const User = await prisma.users.create({
        data: {
            name: request.name,
            email: request.email,
            password: hashedPassword,
        }
    })
    
    return User
}

exports.getAllUsers = async () => {

    const Users = await prisma.users.findMany()

    return Users
}