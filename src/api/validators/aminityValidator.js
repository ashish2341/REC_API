const Joi = require('joi');

const AddAminitySchema = Joi.object({
    Aminity: Joi.string().required(),
    Icon: Joi.string(),
    IsForProperty: Joi.boolean().required(),
    IsForProject: Joi.boolean().required()
});

const getAllAminitySchema = Joi.object({
    page: Joi.number().integer().min(1),
    pageSize: Joi.number().integer().min(1)
  });

  const idAminitySchema = Joi.object({
    id: Joi.string().required().length(24).error(new Error('Id is inValid')),
   
  });
module.exports = {AddAminitySchema,getAllAminitySchema,idAminitySchema};
