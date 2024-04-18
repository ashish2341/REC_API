const Joi = require('joi');

const projectEnquiryValidationSchema = Joi.object({
    Name: Joi.string(),
    Email: Joi.string().email(),
    Message: Joi.string(),
    IsDeleted: Joi.boolean(),
    IsEnabled: Joi.boolean(),
});

module.exports = projectEnquiryValidationSchema;
