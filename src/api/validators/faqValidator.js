const Joi = require('joi');

const faqValidationSchema = Joi.object({
    Subject: Joi.string().required(),
    Answer: Joi.string().required(),
    Categories: Joi.array().items(Joi.string()),
    IsDeleted: Joi.boolean(),
    IsEnabled: Joi.boolean(),
    CreatedDate: Joi.date(),
    UpdatedDate: Joi.date(),
    
});

module.exports = faqValidationSchema;
