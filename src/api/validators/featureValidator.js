const Joi = require('joi');

const addFeatureSchema = Joi.object({
    Feature: Joi.string().required(),
    Icon: Joi.string().required(),
    IsEnabled: Joi.boolean().default(true),
    IsDeleted: Joi.boolean().default(false),
    CreatedBy: Joi.string().allow(''), 
    UpdatedBy: Joi.string().allow(''),
});

const getAllFeatureSchema = Joi.object({
    page: Joi.number().integer().min(1),
    pageSize: Joi.number().integer().min(1)
  });

  const getSearchFeatureSchema = Joi.object({
    page: Joi.number().integer().min(1),
    pageSize: Joi.number().integer().min(1),
    search: Joi.string().allow('')
  });

  const idFeatureSchema = Joi.object({
    id: Joi.string().required().length(24).error(new Error('Id is inValid')),
   
  });

module.exports = {addFeatureSchema,getAllFeatureSchema,idFeatureSchema,getSearchFeatureSchema};
