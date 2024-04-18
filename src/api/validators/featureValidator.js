const Joi = require('joi');

const addFeatureSchema = Joi.object({
    Feature: Joi.string().required(),
    Icon: Joi.string().required(),
    IsEnabled: Joi.boolean().default(true),
    IsDeleted: Joi.boolean().default(false),
    CreatedBy: Joi.string().allow(''), 
    UpdatedBy: Joi.string().allow(''),
});

 

 

module.exports = {addFeatureSchema};
