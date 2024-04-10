const Joi = require('joi');

const aminitySchema = Joi.object({
    Aminity: Joi.string().required(),
    Icon: Joi.string(),
    IsForProperty: Joi.boolean().required(),
    IsForProject: Joi.boolean().required()
});

module.exports = aminitySchema;
