const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    Feature: {
        type: String,
        required: true
    },
    Icon: {
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
    CreatedDate: {
        type: Date,
        default: Date.now
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Assuming you have a User model
    },
    UpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    UpdatedDate: {
        type: Date,
        default: Date.now
    }
});

const Features = mongoose.model('Features', featureSchema);

module.exports = Features;
