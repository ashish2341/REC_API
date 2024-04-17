const Joi = require('joi');

const testimonialValidationSchema = Joi.object({
    MemberName: Joi.string().required(),
    Description: Joi.string().required(),
    Designation: Joi.string().required(),
    IsEnabled: Joi.boolean().default(true),
    Image: Joi.string().required()
});

module.exports = testimonialValidationSchema;
