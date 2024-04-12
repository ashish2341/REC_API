const constants = require("../../helper/constants");
const PropertyFacing = require("../../models/propertyFacingModel");

exports.addPropertyFacing = async (req, res) => {
  try {
    req.body.CreatedBy = req.user._id;
    req.body.UpdatedBy = req.user._id;
    const propertyFacing = await PropertyFacing.create(req.body);
    res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 201, message: constants.curd.add, success: true });
  } catch (error) {
    res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error, success: false });
  }
};

exports.getAllPropertyFacing = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const pageNumber = parseInt(page) || 1;
    const size = parseInt(pageSize) || 10;

    const totalCount = await PropertyFacing.countDocuments();
    const totalPages = Math.ceil(totalCount / size);

    const records = await PropertyFacing.find()
      .skip((pageNumber - 1) * size)
      .limit(size);
    res.status(constants.status_code.header.ok).send({
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
      .send({ statusCode: 500, error, success: false });
  }
};

exports.getPropertyFacingById = async (req, res) => {
  try {
    const propertyFacing = await PropertyFacing.findById(req.params.id);
    if (!propertyFacing) {
      return res
        .status(404)
        .json({ error: "PropertyFacing not found", success: false });
    }
    res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, data: propertyFacing, success: true });
  } catch (error) {
    res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error, success: false });
  }
};

exports.updatePropertyFacing = async (req, res) => {
  try {
    const propertyFacing = await PropertyFacing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!propertyFacing) {
      return res
        .status(404)
        .json({ error: "PropertyFacing not found", success: false });
    }
    res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, message: constants.curd.update, success: true });
  } catch (error) {
    res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error, success: false });
  }
};

exports.deletePropertyFacing = async (req, res) => {
  try {
    const propertyFacing = await PropertyFacing.findByIdAndDelete(
      req.params.id
    );
    if (!propertyFacing) {
      return res
        .status(404)
        .json({ error: "PropertyFacing not found", success: false });
    }
    res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, message: constants.curd.delete, success: true });
  } catch (error) {
    res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error, success: false });
  }
};
