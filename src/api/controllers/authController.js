const User = require("../../models/userModel");
const constants = require("../../helper/constants");
const Login = require("../../models/loginModel");
const bcrypt = require('bcryptjs');
const { PORT } = require("../../helper/config");
const { sendOtpHandle, verifyOtpHandle } = require("../../helper/otp");
const Role = require("../../models/roleModel");
const Developer = require('../../models/developerModel')
const { errorResponse } = require("../../helper/responseTransformer");
const config = require('../../helper/config')
const jwt =require ('jsonwebtoken')
// Register an user
exports.register = async (req, res) => {
  try {
     const {Password,Role:role,...restBody} = req.body
     const roleId = await Role.findOne({Role:role})
     if(!roleId){
      return res.status(constants.status_code.header.ok).send({ statusCode: 200, error: "Role is not exist in DB",success:false });
     }
    const user = new User({...restBody,Roles:[roleId._id]});
 
    await user.save();
      const login = new Login({
        Mobile:req.body.Mobile,
        Password,
        UserId: user._id
    });
    await login.save();
    // save builder profile
    if(role=='Developer'){
         const developerObj = new Developer({Name:req.body.FirstName,UserId:user._id})
         await developerObj.save()
    }
    return res.status(constants.status_code.header.ok).send({ message: constants.auth.register_success,success:true});
  } catch (error) {
    return res.status(constants.status_code.header.server_error).send({ error: errorResponse(error),success:false });
  }
};

exports.login = async (req, res) => {
  try {
    const { Mobile, Password } = req.body;
   
    const user = await Login.findOne({ Mobile });
    console.log('user new ',user)
    // Check if user exists and password matches
    if (!user || !(await bcrypt.compare(Password, user.Password))) {
      return res.status(401).json({ success:false, error: 'Invalid Mobile or Password' });
    }

    // Generate token
    const token = await user.generateAuthToken();
    const decoded = jwt.verify(token, config.JWT_KEY);
        
    const login = await Login.findById(decoded._id).populate("UserId");
    const users = await User.findById(login.UserId._id).populate("Roles");
        
    const userRoles = users.Roles.map(role => role.Role);
    // Send token in response
    res.status(constants.status_code.header.ok).send({ 
      success:true, 
      message: token,
      userId: login.UserId._id,
      firstName: login.UserId.FirstName,
      role: userRoles
     });
  } catch (error) {

    return res.status(constants.status_code.header.server_error).send({ success:false, error: error.message });
  }
};

exports.uploadSingleImage = async (req, res) => {
  try {
    const portPath = req.hostname === "localhost" ? `:${PORT}/uploads/${req.file.filename}`: `/uploads/${req.file.filename}`
    const imageUrl = `${req.protocol}://${req.hostname}${portPath}`;
    res.status(200).send({ imageUrl, success: true });
  } catch (error) {

    return res.status(500).json({ error: error.message, success: false });
  }
}

exports.uploadMultipleFile = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded', success: false });
    }

    const imageUrls = [];
    req.files.forEach(file => {
      const portPath = req.hostname === "localhost" ? `:${PORT}/uploads/${file.filename}`: `/uploads/${file.filename}`
      const imageUrl = `${req.protocol}://${req.hostname}${portPath}`;
      imageUrls.push(imageUrl);
    });

    res.status(200).send({ imageUrls, success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
}


exports.sendOtp = async(req,res) => {
  try{
    const {Mobile} = req.body
    
      const otpRes = await sendOtpHandle(Mobile)
      if(otpRes){
        return res.status(200).send({ message: "Otp successfully send", success: true });
      }else{
        return res.status(500).send({ error: "Some thing went error", success: false });
      }
      
      
  }
   catch(error){
   return  res.status(500).json({ error: error.message, success: false });
   }

}
exports.verifyOtp = async(req,res) => {
  try{
    const {Mobile,Otp} = req.body
   
      const verfyRes = await verifyOtpHandle(Mobile,Otp)
      if(verfyRes){
        return res.status(200).send({ message: "Otp successfully verified", success: true });
      }else{
        return res.status(200).send({ error: "Otp is wrong", success: false });
      }
      
      
  }
   catch(error){
   return  res.status(500).json({ error: error.message, success: false });
   }

}

exports.forgetPassword = async(req,res) => {
  try{
    const {Mobile,NewPassword} = req.body
   
      const user = await  Login.findOne({Mobile})
      if(!user){
        return res.status(404).send({ error: "User is not exist", success: false});
      } 
    
    user.Password = NewPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully',success:true });
      
  }
   catch(error){
    return res.status(500).json({ error: error.message, success: false });
   }

}





