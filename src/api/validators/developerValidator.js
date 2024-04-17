const Joi = require('joi');

const AddDeveloperSchema = Joi.object({
    Name: Joi.string().required(),
    Logo: Joi.string().allow(''),
    CreatedDate: Joi.date(),
    UpdatedDate: Joi.date(),
    IsEnabled: Joi.boolean(),
    IsDeleted: Joi.boolean(),
    Images: Joi.array().items(Joi.string()),
    Documents: Joi.array().items(Joi.object({
        Type: Joi.string(),
        DocName: Joi.string(),
        URL: Joi.string(),
        Description: Joi.string(),
        IsDeleted: Joi.boolean(),
        CreatedDate: Joi.date(),
        CreatedBy: Joi.string() 
    })),
    VerifiedBy: Joi.string(), 
    VerificationDate: Joi.date(),
    DetailNote: Joi.string().allow(''),
    SocialMediaProfileLinks: Joi.array().items(Joi.string()),
    BranchOffices: Joi.array().items(Joi.object({
        Phone: Joi.string(),
        Mobile: Joi.string(),
        EmailId: Joi.string().email(),
        WhatsApp: Joi.string(),
        IsEnabled: Joi.boolean(),
        IsDeleted: Joi.boolean(),
        Area: Joi.string(),
        City: Joi.string(),
        State: Joi.string(),
        Country: Joi.string(),
        PinCode: Joi.string(),
        ContactPerson: Joi.array().items(Joi.object({
            Name: Joi.string(),
            Mobile: Joi.string(),
            EmailId: Joi.string().email(),
            Phone: Joi.string(),
            IsDeleted: Joi.boolean(),
            IsEnabled: Joi.boolean(),
            Designation: Joi.string()
        }))
    })),
    UserId: Joi.string(), 
    
});

const getAllDeveloperSchema = Joi.object({
    page: Joi.number().integer().min(1),
    pageSize: Joi.number().integer().min(1)
  });

  const getSearchDeveloperSchema = Joi.object({
    page: Joi.number().integer().min(1),
    pageSize: Joi.number().integer().min(1),
    search: Joi.string().allow('')
  });

  const idDeveloperSchema = Joi.object({
    id: Joi.string().required().length(24).error(new Error('Id is inValid')),
   
  });
module.exports = {AddDeveloperSchema,getAllDeveloperSchema,idDeveloperSchema,getSearchDeveloperSchema};
