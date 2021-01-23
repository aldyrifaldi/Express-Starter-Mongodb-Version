const {PrismaClient} =  require("@prisma/client"),
    prisma = new PrismaClient({}),
    bcrypt = require('bcrypt')

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

exports.getUserByEmail = async (value) => {
    
    const User = await prisma.users.findFirst({
        where: {email: value}
    })

    return User
}