const Joi = require('joi');


const AddBannerSchema = Joi.object({
    BannerName: Joi.string().required(),
        Url: Joi.string().required(),
    
    
});

module.exports = AddBannerSchema;
