const constants = require("../../helper/constants");
const ProjectEnquiry = require("../../models/projectEnquiryModel");

exports.addProjectEnquiry = async (req, res) => {
  try {
    const projectEnquiry = await ProjectEnquiry.create(req.body);
    return res
      .status(constants.status_code.header.ok)
      .send({ message: constants.curd.add, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ error: error.message, success: false });
  }
};

exports.getAllProjectEnquiry = async (req, res) => {
  
  try {
    const { page, pageSize,filter } = req.query;
    const pageNumber = parseInt(page) || 1;
    const size = parseInt(pageSize) || 10;
    const search = req.query.search || '';
       
    const searchQuery = {
        IsDeleted: false,
        $or: [
            { Name: { $regex: search, $options: 'i' } }, 
            { Email: { $regex: search, $options: 'i' } }, 
            { Message: { $regex: search, $options: 'i' } }, 
        ]
    };

    if (filter) {
      searchQuery.EnquiryType = filter;
  }
    const totalCount = await ProjectEnquiry.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalCount / size);

    const records = await ProjectEnquiry.find(searchQuery)
      .skip((pageNumber - 1) * size)
      .limit(size);
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

exports.getProjectEnquiryById = async (req, res) => {
  try {
    const projectEnquiry = await ProjectEnquiry.findById(req.params.id);
    if (!projectEnquiry) {
      return res
        .status(404)
        .json({ error: "ProjectEnquiry not found", success: false });
    }
    return res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, data: projectEnquiry, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.updateProjectEnquiry = async (req, res) => {
  try {
    const projectEnquiry = await ProjectEnquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!projectEnquiry) {
      return res
        .status(404)
        .json({ error: "ProjectEnquiry not found", success: false });
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

exports.deleteProjectEnquiry = async (req, res) => {
  try {
    const projectEnquiry = await ProjectEnquiry.findByIdAndUpdate(req.params.id,{
        IsDeleted: true,
    });
    if (!projectEnquiry) {
      return res
        .status(404)
        .json({ error: "ProjectEnquiry not found", success: false });
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

 
