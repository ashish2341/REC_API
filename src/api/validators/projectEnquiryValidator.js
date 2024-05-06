const Joi = require('joi');

const projectEnquiryValidationSchema = Joi.object({
    Name: Joi.string().required(),
    Email: Joi.string().email().required(),
    Message: Joi.string().required(),
    MolileNumber: Joi.string().required(),
    EnquiryData:Joi.string().required(),
    EnquiryType:Joi.string().valid('Project','Property','Astrology','ContactUs').required()
});

module.exports = projectEnquiryValidationSchema;
