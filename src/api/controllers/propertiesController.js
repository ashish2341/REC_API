
const constants = require("../../helper/constants");
const { Soils, Facings } = require("../../models/masterModel");
const Properties = require("../../models/propertiesModel");
 

exports.addPropeties = async (req, res) => {
    try {
        req.body.CreatedBy = req.user._id
        req.body.UpdatedBy = req.user._id
        await Properties.create(req.body);
       return res.status(constants.status_code.header.ok).send({ statusCode: 201, message: constants.curd.add, success: true });
    } catch (error) {
        return res.status(constants.status_code.header.server_error).send({ statusCode: 500, error:error.message, success: false });
    }
};

 

exports.getAllProperties = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const search = req.query.search || '';
       
        const searchQuery = {
            $or: [
                { Titile: { $regex: search, $options: 'i' } },
                { Description: { $regex: search, $options: 'i' } }, 
            ]
        };

        
        const count = await Properties.countDocuments(searchQuery);
        const totalPages = Math.ceil(count / limit);
        const currentPage = Math.min(Math.max(page, 1), totalPages);
        const skip = (currentPage - 1) * limit;
        const properties = await Properties.find(searchQuery).populate({ 
            path: 'Soil', 
            model: Soils, 
        }).populate({
            path:"Facing",
            model:Facings
        })
            .skip(skip)
            .limit(limit);
        return res.status(constants.status_code.header.ok).send({
            statusCode: 200,
            data: properties,
            currentPage: currentPage,
            totalPages: totalPages,
            totalCount: count,
            success: true
        });
    } catch (error) {
        return res.status(constants.status_code.header.server_error).send({
            statusCode: 500,
            error: error.message,
            success: false
        });
    }
};

 









