const { getDB } = require("../../db/db");
const constants = require("../../helper/constants");



exports.getMasterDBRecords = (dbName) => async (req, res) => {
    try {
        const db = getDB()
        let query = {};
      const isDeletedFieldExists = await db.collection(dbName).findOne({ IsDeleted: { $exists: true } });
    if (isDeletedFieldExists) {
     query = { IsDeleted: false };
     }
        let records = await db.collection(dbName).find(query).toArray()
        return res.status(constants.status_code.header.ok).send({data:records, success: true });
    } catch (error) {
       return  res.status(constants.status_code.header.server_error).send({ statusCode: 500, error:error.message, success: false });
    }
}
 

 
 







