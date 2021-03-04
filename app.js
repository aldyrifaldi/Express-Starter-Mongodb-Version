const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv'),
    cors = require('./config/cors'),
    fileUpload = require('express-fileupload'),
    mongoose = require('mongoose'),
    routes = require('./routes')
    
dotenv.config()
// server port
const port = process.env.APP_PORT || 4500


// connect to database 
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser: true});


// call routes from auth

// use body parser 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(cors)

app.use(routes)

app.listen(port,() => {
    console.log(`Running server at http://localhost:${port}`)
}).on('error',() => {
    console.log(`http://localhost:${port} already used`)
    console.log(`Running server at other port ...`)

    app.listen(parseInt(port) + 1, () => {
        console.log(`Running server at http://localhost:${parseInt(port) + 1}`)
    })
})