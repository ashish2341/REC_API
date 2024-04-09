const User = require("../../models/user");
const constants = require("../../helper/constants");
 
// Register an user
exports.register = async function (req, res) {
  try {
    const admin = new User(req.body);
    if (req.admin) admin.created_by = req.admin.email;
    await admin.save();
    res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, message: constants.auth.register_success });
  } catch (error) {
    res.status(constants.status_code.header.server_error).send({ statusCode: 500, error });
  }
};

 

 

 
