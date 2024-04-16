const mongoose = require('mongoose');

const propertyStatusSchema = new mongoose.Schema({
    Status: {
        type: String,
        required: true
    },
    IsEnabled: {
        type: Boolean,
        default: true
    },
    IsDeleted: {
        type: Boolean,
        default: false
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

const PropertyStatus = mongoose.model('PropertyStatus', propertyStatusSchema);

module.exports = PropertyStatus;
