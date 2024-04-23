const Joi = require('joi');

const projectEnquiryValidationSchema = Joi.object({
    Name: Joi.string().required(),
    Email: Joi.string().email().required(),
    Message: Joi.string().required(),
    MolileNumber: Joi.string().required(),
});

module.exports = projectEnquiryValidationSchema;
