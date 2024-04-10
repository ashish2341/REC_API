const jwt = require('jsonwebtoken')
 
const constants = require('../../helper/constants')
const config = require('../../helper/config')
const User = require('../../models/userModel')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, config.JWT_KEY)
        const user = await User.findOne({ _id: data._id })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(200).send({ statusCode : 500, message: constants.auth.not_authorize })
    }

}
module.exports = auth