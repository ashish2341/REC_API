const { ObjectId } = require("mongodb");
const constants = require("../../helper/constants");
const Developer = require("../../models/developerModel");

exports.addDeveloper = async (req, res) => {
  try {
    const userId = req.user._id
    req.body.CreatedBy = userId;
    req.body.UpdatedBy = userId;
    req.body.UserId = userId
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
    
    const matchQuery = {
      IsDeleted: false,
      $or: [
        { Name: { $regex: search || '', $options: 'i' } },
        { Description: { $regex: search || '', $options: 'i' } }
      ]
    };
    
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
          PropertiesLength: { $size: "$propertiesInfo" }
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
    const aggregationPipeline = [
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: 'properties',
          localField: '_id',
          foreignField: 'Builder',
          as: 'properties'
        }
      }
    ];

   
    const [developer] = await Developer.aggregate(aggregationPipeline);

    if (!developer) {
      return res.status(404).json({ message: 'Developer not found' });
    }

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
    res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, message: constants.curd.delete, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

