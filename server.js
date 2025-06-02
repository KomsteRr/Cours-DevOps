const express= require('express')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors');
const sequelizeClient = require('./app/database/connectDb')
const userRoutes = require('./app/routes/userRoutes');
dotenv.config({
    path: path.join(__dirname, '.env')

})


async function testDbConnection() {
    try {

        await sequelizeClient.authenticate()
        console.log(`🚩 Connection with DB Server OK `)

    } catch (err) {
        console.log( `❌ Fail to connect to the DB Server`)
    }
}

testDbConnection()



const server = express()


server.use(cors())
server.use(express.json())


server.use('/api/v1/user', userRoutes)

server.set('port', process.env.PORT)
server.listen(server.get('port'), () => {
    console.log(`🚀Server running at ${server.get('port')}`)
}) 