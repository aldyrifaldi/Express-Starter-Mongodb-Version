const { mongodb } = require("../migrate-mongo-config")
const dotenv = require('dotenv')

dotenv.config()


const config = {
    mongodb: {
      // TODO Change (or review) the url to your MongoDB:
      url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,
  
      // TODO Change this to your database name:
      databaseName: process.env.DB_NAME,
  
      options: {
        useNewUrlParser: true, // removes a deprecation warning when connecting
        useUnifiedTopology: true, // removes a deprecating warning when connecting
        //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
        //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
      }
    },
  
    // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
    migrationsDir: "databases/migrations",
  
    // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
    changelogCollectionName: "changelog",
  
    // The file extension to create migrations and search for in migration dir 
    migrationFileExtension: ".js"
};

module.exports = config
