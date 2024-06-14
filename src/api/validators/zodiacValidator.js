const Joi = require('joi');

const AddZodiacSchema = Joi.object({
    Name: Joi.string().required(),
    MobileNumber:Joi.number().required(),
    DateOfBirth: Joi.date().required(),
    
});

 

 
module.exports = {AddZodiacSchema};
