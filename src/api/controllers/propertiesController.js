
const { getDB } = require("../../db/db");
const constants = require("../../helper/constants");
const {dbCollectionName} = require("../../helper/constants");
const { Soils, Facings,PropertyWithSubTypes, AreaUnits, Preferences, PropertyStatus, OwnershipTypes, Area, Fecnings, Floorings, Furnishedes, BuiltAreaTypes } = require("../../models/masterModel");
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
            IsDeleted: false,
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
          }) .populate({
            path: 'AreaUnits',
            model: AreaUnits,
          }) .populate({
            path: 'Soil',
            model: Soils,
          }) .populate({
            path: 'Preferences',
            model: Preferences,
          }).populate({
            path: 'PropertyStatus',
            model: PropertyStatus,
          }).populate({
            path: 'OwnershipType',
            model: OwnershipTypes,
          }).populate({
            path: 'Area',
            model: Area,
          }).populate({
            path: 'Fecnings',
            model: Fecnings,
          }).populate({
            path: 'Floorings',
            model: Floorings,
          }).populate({
            path: 'Furnishedes',
            model: Furnishedes,
          }).populate({
            path: 'BuiltAreaTypes',
            model: BuiltAreaTypes,
          })
          .sort({ CreatedDate: -1 })
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

exports.getPropertiesById = async (req, res) => {
    try {
      const properties = await Properties.findById(req.params.id).populate({
        path:"Facing",
        model:Facings
    }) .populate({
        path: 'PropertyType',
        model: PropertyWithSubTypes,
      }) .populate({
        path: 'AreaUnits',
        model: AreaUnits,
      }) .populate({
        path: 'Soil',
        model: Soils,
      }) .populate({
        path: 'Preferences',
        model: Preferences,
      }).populate({
        path: 'PropertyStatus',
        model: PropertyStatus,
      }).populate({
        path: 'OwnershipType',
        model: OwnershipTypes,
      }).populate({
        path: 'Area',
        model: Area,
      }).populate({
        path: 'Fecnings',
        model: Fecnings,
      }).populate({
        path: 'Floorings',
        model: Floorings,
      }).populate({
        path: 'Furnishedes',
        model: Furnishedes,
      }).populate({
        path: 'BuiltAreaTypes',
        model: BuiltAreaTypes,
      })
      
      if (!properties) {
        return res
          .status(404)
          .json({ error: "Properties not found", success: false });
      }
      return res
        .status(constants.status_code.header.ok)
        .send({ statusCode: 200, data: properties, success: true });
    } catch (error) {
      return res
        .status(constants.status_code.header.server_error)
        .send({ statusCode: 500, error: error.message, success: false });
    }
  };
  
  exports.updateProperties = async (req, res) => {
    try {
      const properties = await Properties.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!properties) {
        return res
          .status(404)
          .json({ error: "Properties not found", success: false });
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
  
  exports.deleteProperties = async (req, res) => {
    try {
      const properties = await Properties.findByIdAndUpdate(req.params.id, {
        IsDeleted: true,
      });
      if (!properties) {
        return res
          .status(404)
          .json({ error: "Properties not found", success: false });
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
                propertiesCount: { $count: {} }
            }
        },
        {
          $lookup: {
            from: 'areas',
            localField: '_id',
            foreignField: 'Area',
            as: 'areaInfo'
        }
        },
        {
            $unwind: '$areaInfo' // Unwind the array if needed
        },  
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
        let properties = await Properties.aggregate(
          [
            {
                $lookup: {
                    from: "propertywithsubtypes",
                    localField: "PropertyType",
                    foreignField: "_id",
                    as: "area"
                }
            },
            {
                $unwind: "$area"
            },
            {
                $group: {
                    _id: "$area.Type",
                    PropCount: { $count: {} },
                    PropImage: { $first: "$area.PropImage" }, // Extract PropImage from the first document in the group
                    PropType: { $first: "$area.Type" },
                    PropDesc: { $first: "$area.PropDescription" } 
                }
            },
            {
                $project: {
                    _id: 0, // Exclude _id field from the output
                    PropType: 1,
                    PropImage: 1,
                    PropCount: 1,
                    PropDesc:1
                }
            }
        ]
        
        )
      
        
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
exports.getPropertiesByBudget = async (req, res) => {
    try {
        const { buyType, budget, propertyType } = req.query;
        const [minBudget, maxBudget] = budget.split('-').map(parseFloat);
        const query = {
            ProeprtyFor: buyType,
            TotalPrice: { $gte: minBudget, $lte: maxBudget },
            PropertyType: propertyType
        };
        const properties = await Properties.find(query).populate('PropertyType').populate('Facing');
      
        
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








