
const { getDB } = require("../../db/db");
const constants = require("../../helper/constants");
const {dbCollectionName} = require("../../helper/constants");
const { Soils, Facings,PropertyWithSubTypes } = require("../../models/masterModel");
const Properties = require("../../models/propertiesModel");
 

exports.addPropeties = async (req, res) => {
    try {
        req.body.CreatedBy = req.user._id
        req.body.UpdatedBy = req.user._id
        await Properties.create(req.body);
       return res.status(constants.status_code.header.ok).send({ statusCode: 201, message: constants.curd.add, success: true });
    } catch (error) {
        return res.status(constants.status_code.header.server_error).send({ statusCode: 500, error:error.message, success: false });
    }
};

 

exports.getAllProperties = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const search = req.query.search || '';
       
        const searchQuery = {
            $or: [
                { Titile: { $regex: search, $options: 'i' } },
                { Description: { $regex: search, $options: 'i' } }, 
            ]
        };

        
        const count = await Properties.countDocuments(searchQuery);
        const totalPages = Math.ceil(count / limit);
        const currentPage = Math.min(Math.max(page, 1), totalPages);
        const skip = (currentPage - 1) * limit;
        const properties = await Properties.find(searchQuery).populate({
            path:"Facing",
            model:Facings
        }) .populate({
            path: 'PropertyType',
            model: PropertyWithSubTypes,
          }).sort({ CreatedDate: -1 })
            .skip(skip)
            .limit(limit);
        return res.status(constants.status_code.header.ok).send({
            statusCode: 200,
            data: properties,
            currentPage: currentPage,
            totalPages: totalPages,
            totalCount: count,
            success: true
        });
    } catch (error) {
        return res.status(constants.status_code.header.server_error).send({
            statusCode: 500,
            error: error.message,
            success: false
        });
    }
};

exports.getPropertiesByDirections = async (req, res) => {
    try {
       
        const directions = req.query.direction;
        
        let faceQuery = {Facing: { $regex: directions, $options: 'i' } }
        const db = getDB()
        let faceRecords = await db.collection(dbCollectionName.facings).findOne(faceQuery)
        
        if(!faceRecords){
            return res.status(404).send({status:false,error:"Data not found"})
        }
        const query = {
            Facing: faceRecords._id 
        };

        const properties = await Properties.find(query);
        return res.status(constants.status_code.header.ok).send({
            statusCode: 200,
            data: properties,
            success: true
        });
    } catch (error) {
        return res.status(constants.status_code.header.server_error).send({
            statusCode: 500,
            error: error.message,
            success: false
        });
    }
};

exports.getPopularProperties = async (req, res) => {
    try {
      const query = {IsDeleted:false,IsFeatured:true}
        const properties = await Properties.find(query);
        return res.status(constants.status_code.header.ok).send({
            statusCode: 200,
            data: properties,
            success: true
        });
    } catch (error) {
        return res.status(constants.status_code.header.server_error).send({
            statusCode: 500,
            error: error.message,
            success: false
        });
    }
};
exports.getPropertiesByArea = async (req, res) => {
    try {
        const propertiesByCity = await Properties.aggregate([
            {
                $group: {
                    _id: '$Area',
                    properties: { $push: '$$ROOT' } 
                }
            }
        ]);
      
        
        return res.status(constants.status_code.header.ok).send({
            statusCode: 200,
            data: propertiesByCity,
            success: true
        });
    } catch (error) {
        return res.status(constants.status_code.header.server_error).send({
            statusCode: 500,
            error: error.message,
            success: false
        });
    }
};
exports.getPropertiesByType = async (req, res) => {
    try {
        let properties = await Properties.aggregate([
            {
              $lookup: {
                from: "propertywithsubtypes",  // Name of the collection to join with
                localField: "PropertyType",  // Field in the "properties" collection
                foreignField: "_id",   // Field in the "propertywithsubtypes" collection
                as: "area"   // Name for the joined field
              }
            },
            {
              $unwind: "$area"   // Unwind the array created by the lookup
            },
            {
              $group: {
                _id: "$area.Type",   // Group by the "Type" field of the "propertywithsubtypes" collection
                properties: { $push: "$$ROOT" }   // Push entire documents into the "properties" array
              }
            }
          ])
      
        
        return res.status(constants.status_code.header.ok).send({
            statusCode: 200,
            data: properties,
            success: true
        });
    } catch (error) {
        return res.status(constants.status_code.header.server_error).send({
            statusCode: 500,
            error: error.message,
            success: false
        });
    }
};








