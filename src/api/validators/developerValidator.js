const Joi = require('joi');

const AddDeveloperSchema = Joi.object({
    Name: Joi.string().required(),
    Password: Joi.string().required(),
    SocialMediaProfileLinks: Joi.object({
        Twitter: Joi.string().allow(''),
        Facebook: Joi.string().allow(''),
        LinkedIn: Joi.string().allow(''),
        Instagram: Joi.string().allow('')
    }),
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
    BranchOffices: Joi.array().items(Joi.object({
        Phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'Phone number must be a 10-digit number'
        }),
        Mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'Mobile number must be a 10-digit number'
        }),
        EmailId: Joi.string().email(),
        WhatsApp: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'Whatsapp number must be a 10-digit number'
        }),
    
        Area: Joi.string(),
        City: Joi.string(),
        State: Joi.string(),
        Country: Joi.string(),
        PinCode: Joi.string().pattern(/^[0-9]{6}$/).messages({
            'string.pattern.base': 'PinCode must be a 6-digit number'
        }),
        ContactPerson: Joi.array().items(Joi.object({
            Name: Joi.string(),
            Mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
                'string.pattern.base': 'Mobile number must be a 10-digit number'
            }),
            EmailId: Joi.string().email(),
            Phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
                'string.pattern.base': 'Phone number must be a 10-digit number'
            }),
            Designation: Joi.string()
        }))
    })),
   
    
});
const UpdateDeveloperSchema = Joi.object({
    Name: Joi.string(),
    SocialMediaProfileLinks: Joi.object({
        Twitter: Joi.string().allow(''),
        Facebook: Joi.string().allow(''),
        LinkedIn: Joi.string().allow(''),
        Instagram: Joi.string().allow('')
    }),
    Logo: Joi.string().required(),
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
    Description:Joi.string().allow(""),
    EstablishDate:Joi.date(),
    Images: Joi.array().items(Joi.string()).required(),
    Documents: Joi.array().items(Joi.object({
        Type: Joi.string(),
        DocName: Joi.string(),
        URL: Joi.string().required(),
        Description: Joi.string()
    })),
    DetailNote: Joi.string().allow(''),
    BranchOffices: Joi.array().items(Joi.object({
        Phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'Phone number must be a 10-digit number'
        }),
        Mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'Mobile number must be a 10-digit number'
        }),
        EmailId: Joi.string().email(),
        WhatsApp: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'Whatsapp must be a 10-digit number'
        }),
    
        Area: Joi.string().allow(""),
        City: Joi.string().allow(""),
        State: Joi.string().allow(""),
        Country: Joi.string().allow(""),
        PinCode: Joi.string().pattern(/^[0-9]{6}$/).allow("").messages({
            'string.pattern.base': 'PinCode must be a 10-digit number'
        }),
        _id: Joi.string(),
        ContactPerson: Joi.array().items(Joi.object({
            Name: Joi.string(),
            Mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
                'string.pattern.base': 'Mobile number must be a 10-digit number'
            }),
            EmailId: Joi.string().email(),
            Phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
                'string.pattern.base': 'Phone number must be a 10-digit number'
            }),
            Designation: Joi.string().allow(""),
            _id: Joi.string()
        }))
    })),
   
    
});

  

  
module.exports = {AddDeveloperSchema,UpdateDeveloperSchema};
