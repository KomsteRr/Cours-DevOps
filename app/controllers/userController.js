const User = require('../database/models/User')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
    path: path.join(__dirname, '../../.env')
})


module.exports = {

    async create(req, res) {

        const { firstName, lastName, email, password } = req.body

        try {
            const newUser = await User.create({ firstName, lastName, email, password })
            return res.status(201).json({ user: newUser })
        } catch(err) {
            return res.status(500).json({ err })
        }
    },


    async login(req, res) {



        const { email, password } = req.body

        console.log(email, password)

        try {
            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            console.log('user', user)

            const isPasswordValid = bcrypt.compareSync(password, user.password)
            console.log('isPassword', isPasswordValid)

            const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET_KEY, {  expiresIn: '90000'})
            console.log('token', token)
            
            return res.status(200).json({ token })



        } catch(err) {
            return res.status(500).json({ err })
        }
    }

}