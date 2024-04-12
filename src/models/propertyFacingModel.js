const mongoose = require('mongoose');

const propertyFacingSchema = new mongoose.Schema({
    TemplateType: {
        type: String,
        required: true
    },
    TemplateContent: {
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
    CreatedDate: {
        type: Date,
        default: Date.now
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true
    },
    UpdatedDate: {
        type: Date,
        default: Date.now
    },
    UpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const PropertyFacing = mongoose.model('PropertyFacing', propertyFacingSchema);

module.exports = PropertyFacing;
