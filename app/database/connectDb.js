const dotenv = require('dotenv')
const path = require('path')
const { Sequelize } = require('sequelize')
dotenv.config({
    path: path.join(__dirname, '../../.env')
})

const sequelizeClient = new Sequelize(
    process.env.POSTGRES_DB, 
    process.env.POSTGRES_USER, 
    process.env.SOFTWARE_PASSWORD, {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
});


module.exports = sequelizeClient;