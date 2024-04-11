
const constants = require("../../helper/constants");
const Aminity = require("../../models/aminityModel");

exports.addAminity = async (req, res) => {
    try {
        req.body.CreatedBy = req.user._id
        req.body.UpdatedBy = req.user._id
        const aminity = await Aminity.create(req.body);
        res.status(constants.status_code.header.ok).send({ statusCode: 201, message: constants.curd.add, success: true });
    } catch (error) {
        res.status(constants.status_code.header.server_error).send({ statusCode: 500, error, success: false });
    }
};

exports.getAllAminity = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const pageNumber = parseInt(page) || 1;
        const size = parseInt(pageSize) || 10;

        const totalCount = await Aminity.countDocuments();
        const totalPages = Math.ceil(totalCount / size);

        const records = await Aminity.find().skip((pageNumber - 1) * size).limit(size);
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

exports.getAminityById = async (req, res) => {
    try {
        const aminity = await Aminity.findById(req.params.id);
        if (!aminity) {
            return res.status(404).json({ error: 'Aminity not found',success:false });
        }
        res.status(constants.status_code.header.ok).send({ statusCode: 200, data: aminity,success:true });
    } catch (error) {

        res.status(constants.status_code.header.server_error).send({ statusCode: 500, error,success:false });
    }
}

exports.updateAminity = async (req, res) => {
    try {



        const aminity = await Aminity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!aminity) {
            return res.status(404).json({ error: 'Aminity not found',success:false });
        }
        res.status(constants.status_code.header.ok).send({ statusCode: 200, message: constants.curd.update,success:true });
    } catch (error) {
        res.status(constants.status_code.header.server_error).send({ statusCode: 500, error,success:false });
    }
}

exports.deleteAminity = async (req, res) => {
    try {
        const aminity = await Aminity.findByIdAndDelete(req.params.id);
        if (!aminity) {
            return res.status(404).json({ error: 'Aminity not found',success:false });
        }
        res.status(constants.status_code.header.ok).send({ statusCode: 200, message: constants.curd.delete,success:true });
    } catch (error) {

        res.status(constants.status_code.header.server_error).send({ statusCode: 500, error,success:false });
    }
}







