const Joi = require('joi');

const AddZodiacSchema = Joi.object({
    Name: Joi.string().required(),
    MobileNumber:Joi.number(),
    DateOfBirth: Joi.date(),
    
});

 

 
module.exports = {AddZodiacSchema};
