const constants = require('../../helper/constants');
const User = require("../../models/userModel");
const Login = require("../../models/loginModel");
const Role = require("../../models/roleModel");
const config = require('../../helper/config')
const jwt =require ('jsonwebtoken')


 const role = async (req, res, next) => {
    
    try {
       
        const token = req.header('Authorization').replace('Bearer ', ''); 
        if (!token) {
          return res.status(401).json({ error: 'Access denied' });
        }
    const decoded = jwt.verify(token, config.JWT_KEY);
    
    const login = await Login.findById( decoded._id ).populate("UserId");
    const user = await User.findById(login.UserId._id).populate("Roles");
   
    const allowedRoles = req.body.Role
    const hasRole = user.Roles.some(role => allowedRoles.includes(role.Role));
        
        if (!hasRole) {
            return res.status(403).json({ error: 'unauthorised' });
        }

        next();
      } catch (error) {
        // console.error(error);
        return res.status(200).send({ statusCode : 500, message: constants.auth.not_authorize })
      }
};

module.exports = role;