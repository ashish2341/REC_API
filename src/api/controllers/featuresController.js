
const constants = require("../../helper/constants");
const Feature = require("../../models/featuresModel");

exports.addFeature = async (req, res) => {
    try {
        req.body.CreatedBy = req.user._id
        req.body.UpdatedBy = req.user._id
        const feature = await Feature.create(req.body);
        res.status(constants.status_code.header.ok).send({ statusCode: 201, message: constants.curd.add, success: true });
    } catch (error) {
        res.status(constants.status_code.header.server_error).send({ statusCode: 500, error, success: false });
    }
};

exports.getAllFeature = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const pageNumber = parseInt(page) || 1;
        const size = parseInt(pageSize) || 10;

        const totalCount = await Feature.countDocuments();
        const totalPages = Math.ceil(totalCount / size);

        const records = await Feature.find().skip((pageNumber - 1) * size).limit(size);
        res.status(constants.status_code.header.ok).send({
            statusCode: 200, data:
                records, success: true, totalCount: totalCount,
            count: records.length,
            pageNumber: pageNumber,
            totalPages: totalPages,
        });
    } catch (error) {
        res.status(constants.status_code.header.server_error).send({ statusCode: 500, error, success: false });
    }
}

exports.getFeatureById = async (req, res) => {
    try {
        const feature = await Feature.findById(req.params.id);
        if (!feature) {
            return res.status(404).json({ error: 'Feature not found',success:false });
        }
        res.status(constants.status_code.header.ok).send({ statusCode: 200, data: feature,success:true });
    } catch (error) {

        res.status(constants.status_code.header.server_error).send({ statusCode: 500, error,success:false });
    }
}

exports.updateFeature = async (req, res) => {
    try {



        const feature = await Feature.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!feature) {
            return res.status(404).json({ error: 'Feature not found',success:false });
        }
        res.status(constants.status_code.header.ok).send({ statusCode: 200, message: constants.curd.update,success:true });
    } catch (error) {
        res.status(constants.status_code.header.server_error).send({ statusCode: 500, error,success:false });
    }
}

exports.deleteFeature = async (req, res) => {
    try {
        const feature = await Feature.findByIdAndUpdate(req.params.id,{IsDeleted:true});
        if (!feature) {
            return res.status(404).json({ error: 'Feature not found',success:false });
        }
        res.status(constants.status_code.header.ok).send({ statusCode: 200, message: constants.curd.delete,success:true });
    } catch (error) {

        res.status(constants.status_code.header.server_error).send({ statusCode: 500, error,success:false });
    }
}







