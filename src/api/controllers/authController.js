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
const jwt =require ('jsonwebtoken');
const Token = require("../../models/tokenModel");
const sendEmail = require("../../helper/sendMail");
const crypto = require("crypto");
// Register an user
exports.register = async (req, res) => {
  try {
     const {Password,Role:role,...restBody} = req.body
     const roleId = await Role.findOne({Role:role})
     if(!roleId){
      return res.status(constants.status_code.header.ok).send({ statusCode: 200, error: "Role is not exist in DB",success:false });
     }
     const checklogin = await Login.findOne({Mobile:req.body.Mobile})
     if(checklogin){
      return res.status(constants.status_code.header.ok).send({ statusCode: 200, error: "Mobile is already Exist",success:false });
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
    
   
    const htmlContent = `
    <p>Hi ${req.body.FirstName},</p>
    <p>Your account has been created successfully. Here are your login credentials:</p>
    <p>
      Mobile: <b> ${req.body.Mobile} </b> <br>
      Password:  <b>${Password} </b>
    </p>
  `;
  
   
   await sendEmail(req.body.EmailId, "Account Creation", htmlContent);
    return res.status(constants.status_code.header.ok).send({ message: constants.auth.register_success,success:true});
  } catch (error) {
    return res.status(constants.status_code.header.server_error).send({ error: errorResponse(error),success:false });
  }
};

exports.login = async (req, res) => {
  try {
    const { Mobile, Password } = req.body;
   
    const user = await Login.findOne({ Mobile }).populate("UserId");
    const UserCheck = await User.findOne({ Mobile })
    // Check if user exists and password matches
    if (!UserCheck ||!user || !(await bcrypt.compare(Password, user.Password))) {
      return res.status(401).json({ success:false, error: 'Invalid Mobile or Password' });
    }

    const signUpData = await User.findById(user.UserId._id).populate("Roles");
        
    const userRoles = signUpData.Roles.map(role => role.Role);
    const token = jwt.sign({ _id: signUpData._id, roles:userRoles }, config.JWT_KEY)
    // Send token in response
    res.status(constants.status_code.header.ok).send({ 
      success:true, 
      message: token,
      userId: signUpData._id,
      firstName: signUpData.FirstName,
      role: userRoles,
      profilePhoto: signUpData.ProfilePhoto
      
     });
  } catch (error) {

    return res.status(constants.status_code.header.server_error).send({ success:false, error: error.message });
  }
};

exports.uploadSingleImage = async (req, res) => {
  try {
    // const portPath = req.hostname === "localhost" ? `:${PORT}/uploads/${req.file.filename}`: `/uploads/${req.file.filename}`
    // const imageUrl = `${req.protocol}://${req.hostname}${portPath}`;
    res.status(200).send({ imageUrl:req.file.filename, success: true });
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
      // const portPath = req.hostname === "localhost" ? `:${PORT}/uploads/${file.filename}`: `/uploads/${file.filename}`
      // const imageUrl = `${req.protocol}://${req.hostname}${portPath}`;
      imageUrls.push(req.file.filename);
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


exports.sendMailforFogetPassword = async(req,res) => {
  try {
    const user = await User.findOne({ EmailId: req.body.email });
    if (!user)
        return res.status(200).json({ message: 'user with given email does not exist',success:false });
    let token = await Token.findOne({ UserId: user._id });
    if (!token) {
        token = await new Token({
            UserId: user._id,
            Token: crypto.randomBytes(32).toString("hex"),
        }).save();
    }
     const link = `https://www.therec.in/forgetPassword/${user._id}/${token.Token}`
    const htmlContent = `Hi, Here is your <a href="${link}">Link</a> to reset your password`;
    
    await sendEmail(user.EmailId, "Password reset", htmlContent);
   
    return res.status(200).json({ message: 'password reset link sent to your email account',success:true });
} catch (error) {
    return res.status(500).json({ error: error.message, success: false })
}

}

exports.resetPassword = async(req,res) => {
  try {
    const user = await User.findById(req.params.userId);
    const login = await Login.findOne({UserId:req.params.userId});
    if (!user) return res.status(400).json({ message: 'invalid link or expired',success:false });
    const token = await Token.findOne({
        UserId: user._id,
        Token: req.params.token,
    });
    if (!token) return res.status(400).json({ message: 'invalid link or expired',success:false });
    login.Password = req.body.password;
    await login.save();
    await Token.findByIdAndDelete(token._id)
    return res.status(200).json({ message: 'password reset sucessfully.',success:true });
} catch (error) {
    return res.status(500).json({ error: error.message, success: false })
}
}






