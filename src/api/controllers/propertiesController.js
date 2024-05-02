
const { ObjectId } = require("mongodb");
const { getDB } = require("../../db/db");
const constants = require("../../helper/constants");
const { dbCollectionName } = require("../../helper/constants");
const { Soils, Facings, PropertyWithSubTypes, AreaUnits, Preferences, PropertyStatus, OwnershipTypes, Area, Fecnings, Floorings, Furnishedes, BuiltAreaTypes, BhkType, Banks, PossessionStatus } = require("../../models/masterModel");
const Properties = require("../../models/propertiesModel");
const { formatNumber, getDirection } = require("../../helper/utils");
const Features = require("../../models/featuresModel");
const Aminity = require("../../models/aminityModel");
const propertyPopulateField = [
  { path: "Facing", model: Facings },
  { path: "PropertyType", model: PropertyWithSubTypes },
  { path: "AreaUnits", model: AreaUnits },
  { path: "Soil", model: Soils },
  { path: "Preferences", model: Preferences },
  { path: "PropertyStatus", model: PropertyStatus },
  { path: "OwnershipType", model: OwnershipTypes },
  { path: "Area", model: Area },
  { path: "Fencing", model: Fecnings },
  { path: "Flooring", model: Floorings },
  { path: "Furnished", model: Furnishedes },
  { path: "BuiltAreaType", model: BuiltAreaTypes },
  { path: "BhkType", model: BhkType },
  { path: "Features", model: Features },
  { path: "Aminities", model: Aminity },
  { path: "LoanDetails.ByBank", model: Banks },
  { path: "PosessionStatus", model: PossessionStatus }
]

exports.addPropeties = async (req, res) => {
  try {
    req.body.CreatedBy = req.user._id
    req.body.UpdatedBy = req.user._id
    await Properties.create(req.body);
    return res.status(constants.status_code.header.ok).send({ statusCode: 201, message: constants.curd.add, success: true });
  } catch (error) {
    return res.status(constants.status_code.header.server_error).send({ statusCode: 500, error: error.message, success: false });
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
        // { Area: { $regex: search, $options: 'i' } },
      ]
    };


    const count = await Properties.countDocuments(searchQuery);
    const totalPages = Math.ceil(count / limit);
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const skip = (currentPage - 1) * limit;
    const properties = await Properties.find(searchQuery).populate(propertyPopulateField).sort({ CreatedDate: -1 })
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
    const properties = await Properties.findById(req.params.id)
      .populate(propertyPopulateField);

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

    let faceQuery = { Facing: { $regex: directions, $options: 'i' } }
    const db = getDB()
    let faceRecords = await db.collection(dbCollectionName.facings).findOne(faceQuery)

    if (!faceRecords) {
      return res.status(404).send({ status: false, error: "Data not found" })
    }
    const query = {
      Facing: faceRecords._id
    };

    const properties = await Properties.find(query)
    .populate(propertyPopulateField);;
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
    const query = { IsDeleted: false, IsFeatured: true }
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
          foreignField: '_id',
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
          $group: {
            _id: '$PropertyType',
            propertiesCount: { $count: {} }
          }
        },
        {
          $lookup: {
            from: 'propertywithsubtypes',
            localField: '_id',
            foreignField: '_id',
            as: 'areaInfo'
          }
        },
        {
          $unwind: '$areaInfo' // Unwind the array if needed
        },
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
    const { buyType, budget, propertyType, bhkType, facing, areaType,propertyStatus,posessionStatus } = req.body;
    
    const queryObj = {IsDeleted: false};
   
    

    if (buyType?.length>0)  queryObj.ProeprtyFor = { $in: buyType };
    if (propertyType?.length>0)  queryObj.PropertyType = { $in: propertyType };
    if (bhkType?.length>0) queryObj.BhkType = { $in: bhkType };
    if (facing?.length>0) queryObj.Facing = { $in: facing };
    if (areaType?.length>0) queryObj.Area = { $in: areaType };
    if (propertyStatus?.length>0) queryObj.PropertyStatus = { $in: propertyStatus };
    if (posessionStatus?.length>0) queryObj.PosessionStatus = { $in: posessionStatus };

    const properties = await Properties.find(queryObj)
    .populate(propertyPopulateField);
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

exports.getPropertiesByAreaOrPropertyType = async (req, res) => {
  try {
      
      
      const areaId = req.query.Area;
      const propertyTypeId = req.query.PropertyType;
      const searchQuery = {
          IsDeleted: false,
          
      };

      // Check if areaId is provided, then add it to the search query
      if (areaId) {
          searchQuery.Area = areaId;
      }else if(propertyTypeId) {
        searchQuery.PropertyType = propertyTypeId;
    }

      const count = await Properties.countDocuments(searchQuery);
     
      const properties = await Properties.find(searchQuery).populate(propertyPopulateField)
      return res.status(constants.status_code.header.ok).send({
          statusCode: 200,
          data: properties,
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

exports.getSimilarProperties = async (req, res) => {
  try {
    const property = await Properties.findById(req.params.id)

    if (!property) {
        return res.status(404).json({ message: 'Property not found' });
    }
    const TotalPrice = property.TotalPrice;
    const priceRange = TotalPrice.split('-').map(val => parseInt(val));

    // Calculate the average price and adjust by 20-30
    const minPrice = priceRange[0] - 30;
    const maxPrice = priceRange[1] + 30;
 console.log(minPrice,maxPrice)
    // Find properties with average prices within the adjusted range
    const similarProperties = await Properties.find({
      // Convert the price range to a regex pattern for flexible matching
      // totalPrice: { $regex: `^[${minPrice}-${maxPrice}]` }
      TotalPrice: { $gte: minPrice, $lte: maxPrice },
      Area:property.Area,
      _id: { $ne: property._id }
    });
  //  console.log(similarProperties)
    const count =  similarProperties.length;
    // console.log(count)
    return res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      data: similarProperties,
      count: count,
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

exports.getPropertiesByDob = async (req, res) => {
  try {

    const {direction,rashi} = getDirection(req.params.dob);
    let faceQuery = { Facing: { $regex: direction, $options: 'i' } }
    const db = getDB()
    let faceRecords = await db.collection(dbCollectionName.facings).findOne(faceQuery)

    if (!faceRecords) {
      return res.status(404).send({ status: false, error: "Data not found" })
    }
    const result = {
      Facing: faceRecords,
      rashi
     
    };

   
    return res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      data: result,
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