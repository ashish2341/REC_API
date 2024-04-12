const Joi = require('joi');

const addPropertyFacingSchema = Joi.object({
    TemplateType: Joi.string().required(),
    TemplateContent: Joi.string().required(),
    IsDeleted: Joi.boolean().default(false),
    IsEnabled: Joi.boolean().default(true),
    CreatedBy: Joi.string().allow(''), 
    UpdatedBy: Joi.string().allow('')
});

const getAllPropertyFacingSchema = Joi.object({
    page: Joi.number().integer().min(1),
    pageSize: Joi.number().integer().min(1)
  });

  const idPropertyFacingSchema = Joi.object({
    id: Joi.string().required().length(24).error(new Error('Id is inValid')),
   
  });
module.exports = {addPropertyFacingSchema,getAllPropertyFacingSchema,idPropertyFacingSchema};
