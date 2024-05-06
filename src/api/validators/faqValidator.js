const Joi = require('joi');

const faqValidationSchema = Joi.object({
    Subject: Joi.string().required(),
    Answer: Joi.string().required(),
    Categories: Joi.array().items(Joi.string()),
    IsEnabled: Joi.boolean(),
    
    
});

module.exports = faqValidationSchema;
