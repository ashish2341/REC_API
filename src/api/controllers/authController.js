const User = require("../../models/userModel");
const constants = require("../../helper/constants");
const Login = require("../../models/loginModel");
const bcrypt = require('bcryptjs');
// Register an user
exports.register =  async (req, res) => {
  try {
    const {UserName,Password,...restBody} = req.body
    const user = new User(restBody);
    
    await user.save();
    const login = new Login({
      UserName,
      Password,
      UserId: user._id
  });
  await login.save();
   res.status(constants.status_code.header.ok).send({ statusCode: 200, message: constants.auth.register_success });
  } catch (error) {
    res.status(constants.status_code.header.server_error).send({ statusCode: 500, error });
  }
};

exports.login =  async (req, res) => {
  try {
    const { UserName, Password } = req.body;
  console.log('body',req.body)
    // Find the user by username
    const user = await Login.findOne({ UserName});
   
    // Check if user exists and password matches
    if (!user || !(await bcrypt.compare(Password, user.Password))) {
        return res.status(401).json({statusCode: 401, message: 'Invalid username or password' });
    }

    // Generate token
    const token = await user.generateAuthToken();

    // Send token in response
    res.status(constants.status_code.header.ok).send({ statusCode: 200, message: token });
} catch (error) {
     
  res.status(constants.status_code.header.server_error).send({ statusCode: 500, error });
}
};
 

 

 
