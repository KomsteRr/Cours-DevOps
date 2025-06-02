const { DataTypes, Model } = require('sequelize')
const bcrypt = require('bcrypt')
const sequelizeClient = require('../connectDb')
class User extends Model {}


User.init({

    firstName: {
        type: DataTypes.STRING,
        allowNull: false, 
        set(value){
            this.setDataValue('firstName', value.charAt(0).toUpperCase()+ value.slice(1).toLowerCase())
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false, 
        set(value){
            this.setDataValue('lastName', value.charAt(0).toUpperCase()+ value.slice(1).toLowerCase())
        }
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false, 
        set(value) {
            this.setDataValue('password', bcrypt.hashSync(value, 10))
        }

    }
    , role : {
        type: DataTypes.ENUM(['admin', 'user']),
        allowNull: false,
        defaultValue: "user",
    }

}, {
    sequelize: sequelizeClient,
    tableName: 'users'
})



async function sync() {

    await User.sync({
        alter: true
    })

}


//sync()


module.exports = User