 
const constants = require("../../helper/constants");
const Aminity = require("../../models/aminityModel");
 
// Register an user
exports.addAminity =  async (req, res) => {
    try {
        const aminity = await Aminity.create(req.body);
        res.status(constants.status_code.header.ok).send({ statusCode: 201, message: constants.curd.add });
    } catch (error) {
        res.status(constants.status_code.header.server_error).send({ statusCode: 500, error });
    }
};

 
 

 

 
