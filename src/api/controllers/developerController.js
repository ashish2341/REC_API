const { ObjectId } = require("mongodb");
const constants = require("../../helper/constants");
const Developer = require("../../models/developerModel");
const Role = require("../../models/roleModel");
const User = require("../../models/userModel");
const Login = require("../../models/loginModel");
const Property = require("../../models/propertiesModel");
const moment = require('moment');
const { Soils, Facings, PropertyWithSubTypes, Preferences, PropertyStatus, OwnershipTypes, Area,Furnishedes, BuiltAreaTypes, BhkType, Banks, PossessionStatus } = require("../../models/masterModel");

exports.addDeveloper = async (req, res) => {
  try {
    const {Password,Name,Mobile,EmailId} = req.body
    const roleId = await Role.findOne({Role:'Developer'})
    if(!roleId){
     return res.status(constants.status_code.header.ok).send({ statusCode: 200, error: "Role is not exist in DB",success:false });
    }
   const user = new User({FirstName:Name,Mobile,EmailId,Roles:[roleId._id]});
   await user.save();
     const login = new Login({
       Mobile,
       Password,
       UserId: user._id
   });
   await login.save();

    const userId = req.user._id
    req.body.CreatedBy = userId;
    req.body.UpdatedBy = userId;
    req.body.UserId = user._id
    const developer = await Developer.create(req.body);
    return res
      .status(constants.status_code.header.ok)
      .send({ message: constants.curd.add, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ error: error.message, success: false });
  }
};

exports.getAllDeveloper = async (req, res) => {
  try {
    const { page, pageSize, search } = req.query;
    const pageNumber = parseInt(page) || 1;
    const size = parseInt(pageSize) || 10;
    const todayBuilderString = req.query.todayBuilder || '';
    
    const matchQuery = {
      IsDeleted: false,
      IsEnabled: true,
      $or: [
        { Name: { $regex: search || '', $options: 'i' } },
        { Description: { $regex: search || '', $options: 'i' } }
      ]
    };
    if(todayBuilderString == 'yes'){
      const startOfToday = moment().utc().startOf('day').toDate();
      const endOfToday = moment().utc().endOf('day').toDate();
      matchQuery.CreatedDate = { $gte: startOfToday, $lt: endOfToday }
    }
    const aggregationPipeline = [
      { $match: matchQuery },
      {
        $lookup: {
          from: 'properties',
          localField: '_id',
          foreignField: 'Builder',
          as: 'propertiesInfo'
        }
      },
      {
        $addFields: {
          PropertiesLength: { 
            $size: {
              $filter: {
                input: "$propertiesInfo",
                as: "property",
                cond: { 
                  $and: [
                    { $eq: ["$$property.IsDeleted", false] },
                    { $eq: ["$$property.IsEnabled", true] },
                    { $eq: ["$$property.IsFeatured", true] }
                  ]
                 }
              }
            }
           }
        }
      },
      { $sort: { CreatedDate: -1 } },
      { $skip: (pageNumber - 1) * size },
      { $limit: size },
      {
        $project: {
          propertiesInfo: 0 
        }
      }
    ];
    
    const records = await Developer.aggregate(aggregationPipeline);
    await Developer.populate(records, { path: 'Area' });
    let totalCount = 0;
    if (records.length > 0) {
      const totalCountPipeline = [{ $match: matchQuery }, { $count: "total" }];
      const [{ total }] = await Developer.aggregate(totalCountPipeline);
      totalCount = total || 0;
    }
    
    const totalPages = Math.ceil(totalCount / size);
    
    return res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      data: records,
      success: true,
      totalCount: totalCount,
      count: records.length,
      pageNumber: pageNumber,
      totalPages: totalPages
    });
    

  } catch (error) {
    res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.getDeveloperById = async (req, res) => {
  try {
    const { id } = req.params;
    const propertyPopulateField = [
      { path: "Facing", model: Facings },
      { path: "PropertySubtype", model: PropertyWithSubTypes },
      { path: "Soil", model: Soils },
      { path: "Preferences", model: Preferences },
      { path: "PropertyStatus", model: PropertyStatus },
      { path: "OwnershipType", model: OwnershipTypes },
      { path: "Area", model: Area },
      { path: "Furnished", model: Furnishedes },
      { path: "BuiltAreaType", model: BuiltAreaTypes },
      { path: "BhkType", model: BhkType },
      { path: "LoanDetails.ByBank", model: Banks },
      { path: "PosessionStatus", model: PossessionStatus },
      {path:"Builder",model:Developer},
      {path:"CreatedBy",model:User},
    ]
    const aggregationPipeline = [
      { $match: { _id: new ObjectId(id), IsDeleted: false,
        IsEnabled: true } },
      {
        $lookup: {
          from: 'properties',
          localField: '_id',
          foreignField: 'Builder',
          as: 'properties'
        }
        },
        {
          $addFields: {
            properties: {
              $filter: {
                input: "$properties",
                as: "property",
                cond: {
                  $and: [
                    { $eq: ["$$property.IsDeleted", false] },
                    { $eq: ["$$property.IsEnabled", true] },
                    { $eq: ["$$property.IsFeatured", true] }
                  ]
                }
              }
            }
          }
        }
        
    ];

   
    const [developer] = await Developer.aggregate(aggregationPipeline);
    await Developer.populate(developer, { path: 'Area' });
    if (!developer) {
      return res.status(404).json({ message: 'Developer not found' });
    }
    const populatedProperties = await Property.find({Builder: new ObjectId(id)}).populate(propertyPopulateField);
    developer.properties = populatedProperties;

    

    return res.status(200).json({
      statusCode: 200,
      success: true,
      data:developer
    });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};
exports.getDeveloperByUserId = async (req, res) => {
  try {
     
   const developer  = await Developer.findOne({UserId:req.user._id})
    return res.status(200).json({
      statusCode: 200,
      success: true,
      data:developer
    });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.updateDeveloper = async (req, res) => {
  try {
    if(!req.params.id){
      return res
      .status(404)
      .json({ error: "Id is required", success: false });
    }
    const developer = await Developer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!developer) {
      return res
        .status(404)
        .json({ error: "Developer not found", success: false });
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

exports.deleteDeveloper = async (req, res) => {
  try {
    const developer = await Developer.findByIdAndUpdate(req.params.id, {
      IsDeleted: true,
    });
    if (!developer) {
      return res
        .status(404)
        .json({ error: "Developer not found", success: false });
    }
    const user = await User.findByIdAndUpdate(developer.UserId, {
      IsDeleted: true,
    })
    const property = await Property.updateMany({ Builder: req.params.id }, { IsDeleted: true });
    res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, message: constants.curd.delete, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

