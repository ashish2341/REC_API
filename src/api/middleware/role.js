const constants = require('../../helper/constants');
const User = require("../../models/userModel");
const Login = require("../../models/loginModel");
const config = require('../../helper/config')
const jwt =require ('jsonwebtoken')


const validateRole = (roles) => async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', ''); 
        
        if (!token) {
            return res.status(401).json({ error: 'Access denied' });
        }

        const decoded = jwt.verify(token, config.JWT_KEY);
        
        const login = await Login.findById(decoded._id).populate("UserId");
        const user = await User.findById(login.UserId._id).populate("Roles");
        const routeRoles = roles;
        const userRoles = user.Roles.map(role => role.Role);
        const result = userRoles.some(r => routeRoles.includes(r));
       
        if (!result) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).send({ statusCode: 500, message: constants.auth.not_authorize });
    }
};

module.exports = validateRole;
