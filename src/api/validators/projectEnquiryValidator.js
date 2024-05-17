const Joi = require('joi');

const projectEnquiryValidationSchema = Joi.object({
    Name: Joi.string().required(),
    Email: Joi.string().email().required(),
    Message: Joi.string().required(),
    MolileNumber: Joi.string().required(),
    PropertyId: Joi.string(),
    DeveloperId: Joi.string(),
    EnquiryData:Joi.string().required(),
    EnquiryType:Joi.string().valid('Project','Property','Astrology','ContactUs').required()
});
const getEnquirySchema = Joi.object({
    page: Joi.number().integer().min(1).required(),
    pageSize: Joi.number().integer().min(1).required(),
    search: Joi.string().allow(''),
    filter:Joi.string().valid('Project','Property','Astrology','ContactUs'),
  });

  const getEnquiryByDeveloperSchema = Joi.object({
    DeveloperId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    page: Joi.number().integer().min(1).required(),
    pageSize: Joi.number().integer().min(1).required(),
  });

module.exports = {projectEnquiryValidationSchema,getEnquirySchema,getEnquiryByDeveloperSchema};
