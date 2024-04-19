const Joi = require('joi');

const blogSchema = Joi.object({
    Title: Joi.string().required(),
    Description: Joi.string().required(),
    Tags: Joi.array().items(Joi.string()),
    BlogType: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Images: Joi.array().items(Joi.string()),
    
    
});

module.exports = blogSchema;
