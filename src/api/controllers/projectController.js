const constants = require("../../helper/constants");
const Project = require("../../models/projectModel");
const {Facings,PropertyWithSubTypes, PropertyStatus, Area } = require("../../models/masterModel");

exports.addProject = async (req, res) => {
  try {
    req.body.CreatedBy = req.user._id;
    req.body.UpdatedBy = req.user._id;
    const project = await Project.create(req.body);
    return res
      .status(constants.status_code.header.ok)
      .send({ message: constants.curd.add, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ error: error.message, success: false });
  }
};

exports.getAllProject = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const pageNumber = parseInt(page) || 1;
    const size = parseInt(pageSize) || 10;
    const search = req.query.search || '';
       
    const searchQuery = {
      IsDeleted: false,
      IsEnabled: true,
        $or: [
            { Title: { $regex: search, $options: 'i' } }, 
        ]
    };

    const totalCount = await Project.countDocuments(searchQuery).populate({
        path:"Facing",
        model:Facings
    }) .populate({
        path: 'PropertyType',
        model: PropertyWithSubTypes,
      }).populate({
        path: 'Area',
        model: Area})
        .populate({
          path: 'ProjectStatus',
          model: PropertyStatus})
      .sort({ CreatedDate: -1 });

    const totalPages = Math.ceil(totalCount / size);

    const records = await Project.find(searchQuery)
      .sort({ CreatedDate: -1 })
      .skip((pageNumber - 1) * size)
      .limit(size)
      ;
    return res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      data: records,
      success: true,
      totalCount: totalCount,
      count: records.length,
      pageNumber: pageNumber,
      totalPages: totalPages,
    });
  } catch (error) {
    res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate({
      path:"Facing",
      model:Facings
  }) .populate({
      path: 'PropertyType',
      model: PropertyWithSubTypes,
    }).populate({
      path: 'Area',
      model: Area})
      .populate({
        path: 'ProjectStatus',
        model: PropertyStatus});
    if (!project) {
      return res
        .status(404)
        .json({ error: "Project not found", success: false });
    }
    return res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, data: project, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) {
      return res
        .status(404)
        .json({ error: "Project not found", success: false });
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

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, {
      IsDeleted: true,
    });
    if (!project) {
      return res
        .status(404)
        .json({ error: "Project not found", success: false });
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

 
