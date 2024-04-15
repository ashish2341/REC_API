const { getDB } = require("../../db/db");
const constants = require("../../helper/constants");


exports.getFacing = async (req, res) => {
    try {
        const db = getDB()
        let facing = await db.collection('facings').find().toArray()
        return res.status(constants.status_code.header.ok).send({data: facing, success: true });
    } catch (error) {
       return  res.status(constants.status_code.header.server_error).send({ statusCode: 500, error:error.message, success: false });
    }
}
exports.getPropertyOwnerShip = async (req, res) => {
    try {
        const db = getDB()
        let ownerShip = await db.collection('propertyOwnerShips').find().toArray()
        return res.status(constants.status_code.header.ok).send({data: ownerShip, success: true });
    } catch (error) {
       return  res.status(constants.status_code.header.server_error).send({ statusCode: 500, error:error.message, success: false });
    }
}

exports.getPropertyStatus = async (req, res) => {
    try {
        const db = getDB()
        let propStatus = await db.collection('propertyStatus').find().toArray()
        return res.status(constants.status_code.header.ok).send({data:propStatus, success: true });
    } catch (error) {
       return  res.status(constants.status_code.header.server_error).send({ statusCode: 500, error:error.message, success: false });
    }
}

exports.getPropertyStatus = async (req, res) => {
    try {
        const db = getDB()
        let propStatus = await db.collection('propertyStatus').find().toArray()
        return res.status(constants.status_code.header.ok).send({data:propStatus, success: true });
    } catch (error) {
       return  res.status(constants.status_code.header.server_error).send({ statusCode: 500, error:error.message, success: false });
    }
}

exports.getPreferences = async (req, res) => {
    try {
        const db = getDB()
        let preferences = await db.collection('preferences').find().toArray()
        return res.status(constants.status_code.header.ok).send({data:preferences, success: true });
    } catch (error) {
       return  res.status(constants.status_code.header.server_error).send({ statusCode: 500, error:error.message, success: false });
    }
}
 

 
 







