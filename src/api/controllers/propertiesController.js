
const { ObjectId } = require("mongodb");
const { getDB } = require("../../db/db");
const constants = require("../../helper/constants");
const { dbCollectionName } = require("../../helper/constants");
const { Soils, Facings, PropertyWithSubTypes, AreaUnits, Preferences, PropertyStatus, OwnershipTypes, Area, Fecnings, Floorings, Furnishedes, BuiltAreaTypes, BhkType, Banks, PossessionStatus } = require("../../models/masterModel");
const Properties = require("../../models/propertiesModel");
const { formatNumber, getDirection } = require("../../helper/utils");
const Features = require("../../models/featuresModel");
const Aminity = require("../../models/aminityModel");
const Developer = require("../../models/developerModel");
const User = require("../../models/userModel");
const moment = require('moment');
const ProjectEnquiry = require("../../models/projectEnquiryModel");
const config = require("../../helper/config");
const jwt = require('jsonwebtoken')

const propertyPopulateField = [
  { path: "Facing", model: Facings },
  { path: "PropertySubtype", model: PropertyWithSubTypes },
  // { path: "AreaUnits", model: AreaUnits },
  { path: "Soil", model: Soils },
  { path: "Preferences", model: Preferences },
  { path: "PropertyStatus", model: PropertyStatus },
  { path: "OwnershipType", model: OwnershipTypes },
  { path: "Area", model: Area },
  // { path: "Fencing", model: Fecnings },
  // { path: "Flooring", model: Floorings },
  { path: "Furnished", model: Furnishedes },
  { path: "BuiltAreaType", model: BuiltAreaTypes },
  { path: "BhkType", model: BhkType },
  { path: "Features", model: Features },
  { path: "Aminities", model: Aminity },
  { path: "LoanDetails.ByBank", model: Banks },
  { path: "PosessionStatus", model: PossessionStatus },
  {path:"Builder",model:Developer},
  {path:"CreatedBy",model:User},
]

exports.addPropeties = async (req, res) => {
  try {
    req.body.CreatedBy = req.user._id
    req.body.UpdatedBy = req.user._id
    if(req.user.roles?.includes('Developer')){
      const builderObj = await Developer.findOne({UserId:req.user._id})
      req.body.Builder = builderObj?._id
    }
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
    const todayPropertyString = req.query.todayProperty || '';
    const typeBuilder = req.query.type || '';
    const typeAdmin = req.query.type || '';
    const searchQuery = {
      IsDeleted: false,
      IsEnabled: true,
      $or: [
        { Title: { $regex: search, $options: 'i' } },
        { Description: { $regex: search, $options: 'i' } },
        // { Area: { $regex: search, $options: 'i' } },
      ]
    };
    
    if(todayPropertyString == 'yes'){
      const startOfToday = moment().utc().startOf('day').toDate();
      const endOfToday = moment().utc().endOf('day').toDate();
      searchQuery.CreatedDate = { $gte: startOfToday, $lt: endOfToday }
      delete searchQuery.IsEnabled
    }

    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, config.JWT_KEY)

    if(typeBuilder ==='builder'){
      searchQuery.CreatedBy = { $ne:new ObjectId(data._id)}
      delete searchQuery.IsEnabled 
    }
    if(typeAdmin ==='Admin'){
      searchQuery.CreatedBy = new ObjectId(data._id)
      delete searchQuery.IsEnabled  
    }
    const count = await Properties.countDocuments(searchQuery);
    const totalPages = Math.ceil(count / limit);
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const skip = (currentPage - 1) * limit;
    const properties = await Properties.find(searchQuery).populate(propertyPopulateField)
      .sort({ CreatedDate: -1 }) 
      .skip(skip<0 ? 1 : skip)
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
    const query = { IsDeleted: false, IsFeatured: true, IsEnabled: true }
    const properties = await Properties.find(query).populate(propertyPopulateField);
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
      {$match:{IsDeleted:false, IsEnabled: true}},
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
        {$match:{IsDeleted:false, IsEnabled: true}},
        {
          $group: {
            _id: '$PropertySubtype',
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
    const { 
      isFeatured,
      buyType, 
      budget, 
      propertyType, 
      bhkType, facing, areaType,propertyStatus,posessionStatus,feature,bathroom,landArea,search } = req.body;
    
    const queryObj = {IsDeleted: false, IsEnabled: true, $or: [
      { Title: { $regex: search || '', $options: 'i' } },
      { Description: { $regex: search || '', $options: 'i' } },
       
    ]};
    if(isFeatured)queryObj.IsFeatured= true;
    if (buyType?.length>0)  queryObj.ProeprtyFor = { $in: buyType };
    
    if (propertyType?.length>0)  queryObj.PropertySubtype = { $in: propertyType };
    if (bhkType?.length>0) queryObj.BhkType = { $in: bhkType };
    if (facing?.length>0) queryObj.Facing = { $in: facing };
    if (areaType?.length>0) queryObj.Area = { $in: areaType };
    if (propertyStatus?.length>0) queryObj.PropertyStatus = { $in: propertyStatus };
    if (posessionStatus?.length>0) queryObj.PosessionStatus = { $in: posessionStatus };
    if (bathroom?.length>0) queryObj.Bathrooms = { $in: bathroom };
    if (landArea?.length>0) queryObj.LandArea = { $in: landArea };
    if (feature?.length>0) queryObj.Features = { $in: feature };
 
    if (budget?.length > 0) {
      const minValue = Math.min(...budget);
      const maxValue = Math.max(...budget);

      queryObj['TotalPrice.MinValue'] = {$gte:minValue},
      queryObj['TotalPrice.MaxValue'] = {$lte:maxValue}
    };
    const sortBy = req.query.sortBy;
    const sortOrder = parseInt(req.query.sortOrder) || -1;

    if(req.query.IsFeatured != undefined){
      queryObj.IsFeatured = req.query.IsFeatured
    }
    if(req.query.IsExclusive != undefined){
      queryObj.IsExclusive = req.query.IsExclusive
    }
    let sortOptions = {};
    if (sortBy === 'Title' || sortBy === 'TotalPrice.MinValue' || sortBy === 'TotalPrice.MaxValue' || sortBy === 'CreatedDate') {
      sortOptions[sortBy] = sortOrder;
    } 
    const properties = await Properties.find(queryObj)
    .sort(sortOptions)
    .populate(propertyPopulateField);
    return res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      data: properties,
      count:properties.length,
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
          IsEnabled: true
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
   
    const minPrice = property?.TotalPrice?.MinValue -300000  ;
    const maxPrice = property?.TotalPrice?.MaxValue + 300000 ;
 
    const properties = await Properties.find({
      'TotalPrice.MinValue': { $gte: minPrice},
      'TotalPrice.MaxValue': { $lte: maxPrice},
      Area: property.Area, 
        _id: { $ne: property._id }
    }).populate(propertyPopulateField);
  
    const count =  properties.length;
   
    return res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      data: properties,
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

    const {direction,sign} = getDirection(req.params.dob);
    let faceQuery = { Facing: { $regex: direction, $options: 'i' } }
    const db = getDB()
    let faceRecords = await db.collection(dbCollectionName.facings).findOne(faceQuery)

    if (!faceRecords) {
      return res.status(404).send({ status: false, error: "Data not found" })
    }
    const result = {
      Facing: faceRecords,
      sign
     
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
exports.getPropertiesForReview = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const searchQuery = {
      IsDeleted: false,
      IsEnabled:false,
      $or: [
        { Title: { $regex: search, $options: 'i' } },
      ]
    };
    let sortOptions = {CreatedDate:-1};
   

    const count = await Properties.countDocuments(searchQuery);
    const totalPages = Math.ceil(count / limit);
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const skip = (currentPage - 1) * limit ;
    const properties = await Properties.find(searchQuery).populate(propertyPopulateField)
      .sort(sortOptions)
      .skip(skip<0 ? 1 : skip)
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

exports.getPropertiesByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    const developer  = await Developer.findOne({UserId:userId})
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const isEnable = req.query.isEnable; 
    const todayPropertyString = req.query.todayPropertyString || '';
    const searchQuery = {
      Builder:new ObjectId(developer?._id),
      IsDeleted: false,
      $or: [
        { Title: { $regex: search, $options: 'i' } },
        { ProeprtyType: { $regex: search, $options: 'i' } },
        
      ]
    };
   
    if (isEnable === 'true' || isEnable === 'false') {
      searchQuery.IsEnabled = isEnable;
    }
    
    if(todayPropertyString == 'yes'){
      const startOfToday = moment().utc().startOf('day').toDate();
      const endOfToday = moment().utc().endOf('day').toDate();
      searchQuery.CreatedDate = { $gte: startOfToday, $lt: endOfToday }
    }
    let sortOptions = { CreatedDate: -1 };

    const count = await Properties.countDocuments(searchQuery);
    const totalPages = Math.ceil(count / limit);
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const skip = (currentPage - 1) * limit;

    const properties = await Properties.find(searchQuery)
      .populate(propertyPopulateField)
      .sort(sortOptions)
      .skip(skip<0 ? 1 : skip)
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

exports.getDataForAdmin = async (req, res) => {
  try {

    const startOfToday = moment().utc().startOf('day').toDate();
    const endOfToday = moment().utc().endOf('day').toDate();

    const TotalUser = await User.find({ IsDeleted: false })
    const TodayUsers = await User.find({
      IsDeleted: false,
      CreatedDate: { $gte: startOfToday, $lt: endOfToday }
    });

    const TotalProperty = await Properties.find({ IsDeleted: false })
    const UnderReviewProperty = await Properties.find({ IsEnabled: false, IsDeleted: false })
    const ApprovedProperty = await Properties.find({ IsEnabled: true, IsDeleted: false })
    const TodayAddProperty = await Properties.find({
      IsDeleted: false,
      CreatedDate: { $gte: startOfToday, $lt: endOfToday }
    });

    const TotalBuilder = await Developer.find({ IsDeleted: false })
    const TodayAddBuilder = await Developer.find({
      IsDeleted: false,
      CreatedDate: { $gte: startOfToday, $lt: endOfToday }
    });
    // const TotalBuilderProperty = await Properties.find({ 
    //   IsDeleted: false,
    //   Builder: { $exists: true, $ne: null }

    // })

    const TotalAdminProperty = await Properties.find({ 
      IsDeleted: false,
      CreatedBy: new ObjectId(req.user._id)

    })
    
   
    const TotalEnquiry = await ProjectEnquiry.find({ IsDeleted: false })
    const TodayEnquiry = await ProjectEnquiry.find({
      IsDeleted: false,
      CreatedDate: { $gte: startOfToday, $lt: endOfToday }
    });
    const TotalEnquiryProperty = await ProjectEnquiry.find({ IsDeleted: false, EnquiryType: "Property" })
    const TotalEnquiryAstrology = await ProjectEnquiry.find({ IsDeleted: false, EnquiryType: "Astrology" })
    const TotalEnquiryContactUs = await ProjectEnquiry.find({ IsDeleted: false, EnquiryType: "ContactUs" })
    const TotalEnquiryProject = await ProjectEnquiry.find({ IsDeleted: false, EnquiryType: "Project" })

    return res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      totalUser: TotalUser.length,
      todayUsers: TodayUsers.length,
      totalProperty: TotalProperty.length,
      underReviewProperty: UnderReviewProperty.length,
      approvedProperty: ApprovedProperty.length,
      todayAddProperty: TodayAddProperty.length,
      totalBuilder: TotalBuilder.length,
      todayAddBuilder: TodayAddBuilder.length,
      totalBuilderProperty:TotalProperty.length- TotalAdminProperty.length,
      TotalAdminProperty:TotalAdminProperty.length,
      totalEnquiry: TotalEnquiry.length,
      todayEnquiry: TodayEnquiry.length,
      totalEnquiryProperty: TotalEnquiryProperty.length,
      totalEnquiryAstrology: TotalEnquiryAstrology.length,
      totalEnquiryContactUs: TotalEnquiryContactUs.length,
      totalEnquiryProject:TotalEnquiryProject.length,
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


exports.getDataForBuilder = async (req, res) => {
  try {
    const startOfToday = moment().utc().startOf('day').toDate();
    const endOfToday = moment().utc().endOf('day').toDate();
    const developer  = await Developer.findOne({UserId:req.user._id})
    if (req.user.roles?.includes('Developer')) {
      TotalPropertyBuilder = await Properties.countDocuments({ Builder:new ObjectId(developer?._id), IsDeleted: false })
      UnderReviewProperty = await Properties.countDocuments({ IsEnabled: false, IsDeleted: false, Builder:new ObjectId(developer?._id), })
      ApprovedProperty = await Properties.countDocuments({ IsEnabled: true, IsDeleted: false, Builder:new ObjectId(developer?._id), })
      TodayAddProperty = await Properties.countDocuments({
        IsDeleted: false,
        Builder:new ObjectId(developer?._id),
        CreatedDate: { $gte: startOfToday, $lt: endOfToday }
      });
    }
    const TotalEnquiry = await ProjectEnquiry.find({ IsDeleted: false,
      $or: [
        { "AllowedUser.UserId": req.user._id },
      ]
     })
    const TodayEnquiry = await ProjectEnquiry.find({
      IsDeleted: false,
      CreatedDate: { $gte: startOfToday, $lt: endOfToday },
      $or: [
        { "AllowedUser.UserId": req.user._id },
      ]
    });
    const TotalEnquiryProperty = await ProjectEnquiry.find({ IsDeleted: false, EnquiryType: "Property" , $or: [
      { "AllowedUser.UserId": req.user._id },
    ]})
    const TotalEnquiryAstrology = await ProjectEnquiry.find({ IsDeleted: false, EnquiryType: "Astrology" , $or: [
      { "AllowedUser.UserId": req.user._id },
    ]})
    const TotalEnquiryContactUs = await ProjectEnquiry.find({ IsDeleted: false, EnquiryType: "ContactUs" , $or: [
      { "AllowedUser.UserId": req.user._id },
    ]})
    const TotalEnquiryProject = await ProjectEnquiry.find({ IsDeleted: false, EnquiryType: "Project" , $or: [
      { "AllowedUser.UserId": req.user._id },
    ]})
   
    return res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      totalProperty: TotalPropertyBuilder,
      underReviewProperty: UnderReviewProperty,
      approvedProperty: ApprovedProperty,
      todayAddProperty: TodayAddProperty,
      totalEnquiry: TotalEnquiry.length,
      todayEnquiry: TodayEnquiry.length,
      totalEnquiryProperty: TotalEnquiryProperty.length,
      totalEnquiryAstrology: TotalEnquiryAstrology.length,
      totalEnquiryContactUs: TotalEnquiryContactUs.length,
      totalEnquiryProject:TotalEnquiryProject.length,
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

const getMonthName = (monthNumber) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[monthNumber - 1] || "Unknown";
};

const createAggregationPipeline = (startDate, endDate) => ([
  {
    $match: {
      CreatedDate: {
        $gte: startDate,
        $lt: endDate
      },
      IsEnabled: true,
      IsDeleted: false,
    }
  },
  {
    $group: {
      _id: { $month: "$CreatedDate" },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      month: { $arrayElemAt: [["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], { $subtract: ["$_id", 1] }] },
      count: 1
    }
  },
  {
    $sort: { _id: 1 } 
  }
]);

const createAggregationPipelineForBuilder = (startDate, endDate,{IsBuilder,id,IsProperty}) => ([
  {
    $match: {
      CreatedDate: {
        $gte: startDate,
        $lt: endDate
      },
      IsEnabled: true,
      IsDeleted: false,
      ...(IsBuilder ? { $or: [{ "AllowedUser.UserId": id }] } : {}),
      ...(IsProperty ? { $or: [{ CreatedBy: new ObjectId(id) }] } : {})
    }
  },
  {
    $group: {
      _id: { $month: "$CreatedDate" },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      month: { $arrayElemAt: [["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], { $subtract: ["$_id", 1] }] },
      count: 1
    }
  },
  {
    $sort: { _id: 1 } 
  }
]);

exports.getChartDataForAdmin = async(req,res)=>{
  try {
    const startDate = new Date(new Date().getFullYear(), new Date().getMonth()-11, 1);
    const endDate = new Date(new Date().getFullYear(), new Date().getMonth()+1, 1);

    const userPipeline = createAggregationPipeline(startDate, endDate);
    const builderPipeline = createAggregationPipeline(startDate, endDate);
    const propertiesPipeline = createAggregationPipeline(startDate, endDate);
    const enquiryPipeline = createAggregationPipeline(startDate, endDate);

    const [user, builder, properties, enquiry] = await Promise.all([
      User.aggregate(userPipeline),
      Developer.aggregate(builderPipeline),
      Properties.aggregate(propertiesPipeline),
      ProjectEnquiry.aggregate(enquiryPipeline)
    ]);

    return res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      user,
      builder,
      properties,
      enquiry,
      success: true
    });
  } catch (error) {
    return res.status(constants.status_code.header.server_error).send({
      statusCode: 500,
      error: error.message,
      success: false
    });
  }
}

exports.getChartDataForBuilder = async(req,res)=>{
  try {
    const startDate = new Date(new Date().getFullYear(), new Date().getMonth()-11, 1);
    const endDate = new Date(new Date().getFullYear(), new Date().getMonth()+1, 1);
 
    const propertiesPipeline = createAggregationPipelineForBuilder(startDate, endDate,{IsBuilder: false,id: req.user._id,IsProperty:true});
    const enquiryPipeline = createAggregationPipelineForBuilder(startDate, endDate,{IsBuilder: true,id: req.user._id,IsProperty:false});

    const [properties, enquiry] = await Promise.all([
      
      Properties.aggregate(propertiesPipeline),
      ProjectEnquiry.aggregate(enquiryPipeline)
    ]);

    return res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      properties,
      enquiry,
      success: true
    });
  } catch (error) {
    return res.status(constants.status_code.header.server_error).send({
      statusCode: 500,
      error: error.message,
      success: false
    });
  }
}