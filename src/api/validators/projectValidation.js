const Joi = require('joi');

// Define Joi schema for the Project model
const projectSchemaValidation = Joi.object({
    Title: Joi.string().required(),
    Description: Joi.string().required(),
    Highlight: Joi.string().required(),
    PropertyTypes: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    IsExclusive: Joi.boolean(),
    IsFeatured: Joi.boolean(),
    IsNew: Joi.boolean(),
    Features: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    Amenities: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)), 
    Facing: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)), 
    Area: Joi.string().required(),
    City: Joi.string(),
    State: Joi.string(),
    Country: Joi.string(),
    Address: Joi.string(),
    Landmark: Joi.string(),
    PinCode: Joi.string(),
    Location: Joi.object({
        Latitude: Joi.number(),
        Longitude: Joi.number()
    }),
    CreatedDate: Joi.date().default(Date.now),
    CreatedBy: Joi.string(),
    UpdatedDate: Joi.date().default(Date.now),
    UpdatedBy: Joi.string(),
    AvailableUnits: Joi.number(),
    ReraNumber: Joi.string(),
    ProjectStatus: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Images: Joi.array().items(Joi.object({
        Name: Joi.string(),
        Title: Joi.string(),
        URL: Joi.string(),
        Type: Joi.string(),
        IsDeleted: Joi.boolean().default(false),
        IsEnabled: Joi.boolean().default(true)
    })),
    Documents: Joi.array().items(Joi.object({
        Name: Joi.string(),
        Title: Joi.string(),
        URL: Joi.string(),
        Type: Joi.string(),
        IsDeleted: Joi.boolean().default(false),
        IsEnabled: Joi.boolean().default(true)
    })),
    Videos: Joi.array().items(Joi.object({
        Name: Joi.string(),
        Title: Joi.string(),
        URL: Joi.string(),
        Type: Joi.string(),
        IsDeleted: Joi.boolean().default(false),
        IsEnabled: Joi.boolean().default(true)
    }))
});

module.exports = projectSchemaValidation;
