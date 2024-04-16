const constants = require("../../helper/constants");
const Feature = require("../../models/featuresModel");

exports.addFeature = async (req, res) => {
  try {
    req.body.CreatedBy = req.user._id;
    req.body.UpdatedBy = req.user._id;
    const feature = await Feature.create(req.body);
    return res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 201, message: constants.curd.add, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.getAllFeature = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const pageNumber = parseInt(page) || 1;
    const size = parseInt(pageSize) || 10;

    const totalCount = await Feature.countDocuments({ IsDeleted: false });
    const totalPages = Math.ceil(totalCount / size);

    const records = await Feature.find({ IsDeleted: false })
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
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.getFeatureById = async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    if (!feature) {
      return res
        .status(404)
        .json({ error: "Feature not found", success: false });
    }
    return res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, data: feature, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.updateFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!feature) {
      return res
        .status(404)
        .json({ error: "Feature not found", success: false });
    }
    return res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, message: constants.curd.update, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndUpdate(req.params.id, {
      IsDeleted: true,
    });
    if (!feature) {
      return res
        .status(404)
        .json({ error: "Feature not found", success: false });
    }
    return res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, message: constants.curd.delete, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.searchFeatures = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const searchQuery = {
      $or: [{ Feature: { $regex: search, $options: "i" } }],
    };

    const count = await Feature.countDocuments(searchQuery);

    const totalPages = Math.ceil(count / limit);

    const currentPage = Math.min(Math.max(page, 1), totalPages);

    const skip = (currentPage - 1) * limit;

    const features = await Feature.find(searchQuery).skip(skip).limit(limit);

    return res.status(constants.status_code.header.ok).send({
      statusCode: 200,
      data: features,
      currentPage: currentPage,
      totalPages: totalPages,
      totalCount: count,
      success: true,
    });
  } catch (error) {
    return res.status(constants.status_code.header.server_error).send({
      statusCode: 500,
      error: error.message,
      success: false,
    });
  }
};
