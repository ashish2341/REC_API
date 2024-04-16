const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    Preference: {
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
        ref: "User"
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

const Preference = mongoose.model('Preference', preferenceSchema);

module.exports = Preference;
