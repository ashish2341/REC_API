const constants = require("../../helper/constants");
const User = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const Login = require("../../models/loginModel");
const jwt =require ('jsonwebtoken');
const config = require('../../helper/config')


exports.getAllUser = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const pageNumber = parseInt(page) || 1;
        const size = parseInt(pageSize) || 10;
        const search = req.query.search || '';
           
        const searchQuery = {
          IsDeleted: false,
            $or: [
                { FirstName: { $regex: search, $options: 'i' } }, 
            ]
        };
    
        const totalCount = await User.countDocuments(searchQuery);
        const totalPages = Math.ceil(totalCount / size);
    
        const records = await User.find(searchQuery)
          .populate('Roles')
          .sort({ CreatedDate: -1 })
          .skip((pageNumber - 1) * size)
          .limit(size)
          ;
        return res.status(constants.status_code.header.ok).send({
          statusCode: 200,
          data: records,
          success: true,
          totalCount: totalCount,
          count: records.length,
          pageNumber: pageNumber,
          totalPages: totalPages,
        });
      } catch (error) {
        res
          .status(constants.status_code.header.server_error)
          .send({ statusCode: 500, error: error.message, success: false });
      }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('Roles');
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found", success: false });
    }
    return res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, data: user, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found", success: false });
    }
    res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, message: constants.curd.update, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};
exports.updatePassword = async (req, res) => {
  const { OldPassword, NewPassword } = req.body;
  try {
    const u = await User.findById(req.params.id);
    if (!u) {
      return res.status(404).json({ error: "User not found", success: false });
    }
   
    const token = req.header('Authorization').replace('Bearer ', ''); 
        
        if (!token) {
            return res.status(401).json({ error: 'Access denied' });
        }

        const decoded = jwt.verify(token, config.JWT_KEY);
        
        const login = await Login.findById(decoded._id);
  
    const isMatch = await bcrypt.compare(OldPassword, login.Password);
    if (!isMatch) {
      return res.status(400).json({ error: "Old password does not match", success: false });
    }

    login.Password = NewPassword;

    await login.save();

    res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      message: constants.curd.update,
      success: true,
    });
  } catch (error) {
    return res.status(constants.status_code.header.server_error).send({
      statusCode: 500,
      error: error.message,
      success: false,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      IsDeleted: true,
    });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found", success: false });
    }
    res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, message: constants.curd.delete, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

 
