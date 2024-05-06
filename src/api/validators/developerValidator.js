const Joi = require('joi');

const AddDeveloperSchema = Joi.object({
    Name: Joi.string().required(),
    SocialMediaProfileLinks: Joi.array().items(
        Joi.object({ Name: Joi.string(), URL: Joi.string() })
      ),
    Logo: Joi.string().allow(''),
    Area:Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Mobile: Joi.number().integer().min(1000000000).max(9999999999).required().messages({
        'number.base': 'Mobile number must be a number',
        'number.integer': 'Mobile number must be an integer',
        'number.min': 'Mobile number must be at least 10 digits long',
        'number.max': 'Mobile number cannot be longer than 10 digits'
    }),
    EmailId: Joi.string().email().required(),
    WhatsApp: Joi.number().integer().min(1000000000).max(9999999999).required().messages({
        'number.base': 'Mobile number must be a number',
        'number.integer': 'Mobile number must be an integer',
        'number.min': 'Mobile number must be at least 10 digits long',
        'number.max': 'Mobile number cannot be longer than 10 digits'
    }),
    Description:Joi.string(),
    EstablishDate:Joi.date().required(),
    Images: Joi.array().items(Joi.string()),
    Documents: Joi.array().items(Joi.object({
        Type: Joi.string(),
        DocName: Joi.string(),
        URL: Joi.string(),
        Description: Joi.string(),  
    })),
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
            Designation: Joi.string()
        }))
    })),
   
    
});
const UpdateDeveloperSchema = Joi.object({
    Name: Joi.string(),
    SocialMediaProfileLinks: Joi.array().items(
        Joi.object({ Name: Joi.string(), URL: Joi.string() })
      ),
    Logo: Joi.string().allow(''),
    Area:Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Mobile: Joi.number().integer().min(1000000000).max(9999999999).messages({
        'number.base': 'Mobile number must be a number',
        'number.integer': 'Mobile number must be an integer',
        'number.min': 'Mobile number must be at least 10 digits long',
        'number.max': 'Mobile number cannot be longer than 10 digits'
    }),
    EmailId: Joi.string().email(),
    WhatsApp: Joi.number().integer().min(1000000000).max(9999999999).messages({
        'number.base': 'Mobile number must be a number',
        'number.integer': 'Mobile number must be an integer',
        'number.min': 'Mobile number must be at least 10 digits long',
        'number.max': 'Mobile number cannot be longer than 10 digits'
    }),
    Description:Joi.string(),
    EstablishDate:Joi.date(),
    Images: Joi.array().items(Joi.string()),
    Documents: Joi.array().items(Joi.object({
        Type: Joi.string(),
        DocName: Joi.string(),
        URL: Joi.string(),
        Description: Joi.string(),  
    })),
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
            Designation: Joi.string()
        }))
    })),
   
    
});


  

  
module.exports = {AddDeveloperSchema,UpdateDeveloperSchema};
