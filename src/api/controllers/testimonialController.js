const constants = require("../../helper/constants");
const Testimonial = require("../../models/testimonialModel");

exports.addTestimonial = async (req, res) => {
  try {
    
    const testimonial = await Testimonial.create(req.body);
    return res
      .status(constants.status_code.header.ok)
      .send({ message: constants.curd.add, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ error: error.message, success: false });
  }
};

exports.getAllTestimonial = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const pageNumber = parseInt(page) || 1;
    const size = parseInt(pageSize) || 10;
    const search = req.query.search || '';
       
    const searchQuery = {
      IsDeleted: false,
      IsEnabled: true,
        $or: [
            { MemberName: { $regex: search, $options: 'i' } }, 
        ]
    };

    const totalCount = await Testimonial.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalCount / size);

    const records = await Testimonial.find(searchQuery)
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

exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res
        .status(404)
        .json({ error: "Testimonial not found", success: false });
    }
    return res
      .status(constants.status_code.header.ok)
      .send({ statusCode: 200, data: testimonial, success: true });
  } catch (error) {
    return res
      .status(constants.status_code.header.server_error)
      .send({ statusCode: 500, error: error.message, success: false });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!testimonial) {
      return res
        .status(404)
        .json({ error: "Testimonial not found", success: false });
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

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, {
      IsDeleted: true,
    });
    if (!testimonial) {
      return res
        .status(404)
        .json({ error: "Testimonial not found", success: false });
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

 
