 

const Joi = require('joi');

const registerSchema = {
    body: Joi.object().keys({
        FirstName: Joi.string().required().error(new Error('First Name is required')),
        LastName: Joi.string().optional(),
        Age: Joi.number().optional(),
        Gender: Joi.string().valid('Male', 'Female', 'Other').optional(),
        Mobile: Joi.string().pattern(/^[0-9]{10}$/).required().error(new Error('Mobile number is required and should be 10 digits')),
        Phone: Joi.string().optional(),
        Area: Joi.string().optional(),
        City: Joi.string().optional(),
        State: Joi.string().optional(),
        Country: Joi.string().optional(),
        PinCode: Joi.string().optional(),
        RoleId: Joi.string().optional(), // Assuming RoleId is a string
        IsEnabled: Joi.boolean().default(true),
        IsDeleted: Joi.boolean().default(false),
        ProfilePhoto: Joi.string().optional(),
        UserName: Joi.string().required().error(new Error('UserName is required')),
        Password: Joi.string().required().error(new Error('Password is required')),
        EmailId: Joi.string().email().required().error(new Error('Email is required and should be valid')),
    }),
};

const loginSchema = {
    body: Joi.object().keys({
        UserName: Joi.string().required().error(new Error('UserName is required')),
        Password: Joi.string().required().error(new Error('Password is required')),
        
    }),
};
module.exports = {
    registerSchema,
    loginSchema
};
