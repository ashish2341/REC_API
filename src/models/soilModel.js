const mongoose = require('mongoose');

const soilSchema = new mongoose.Schema({
    Soil: {
        type: String,
        required: true
    },
    IsDeleted: {
        type: Boolean,
        default: false
    },
    IsEnabled: {
        type: Boolean,
        default: true
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    CreatedDate: {
        type: Date,
        default: Date.now
    },
    UpdatedDate: {
        type: Date,
        default: Date.now
    },
    UpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Soil = mongoose.model('Soil', soilSchema);

module.exports = Soil;
