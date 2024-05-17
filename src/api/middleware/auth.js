const jwt = require('jsonwebtoken')
 
const constants = require('../../helper/constants')
const config = require('../../helper/config')
const Login = require('../../models/loginModel')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, config.JWT_KEY)
       console.log(data)
        req.user = data
        req.token = token
        next()
    } catch (error) {
        res.status(200).send({ statusCode : 500, message: constants.auth.not_authorize })
    }

}
module.exports = auth