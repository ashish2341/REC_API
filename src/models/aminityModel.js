const mongoose = require('mongoose');

const aminitySchema = new mongoose.Schema({
    Aminity: {
        type: String,
        required: true
    },
    Icon: String,
    CreatedDate: {
        type: Date,
        default: Date.now
    },
    UpdatedDate: {
        type: Date,
        default: Date.now
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
        ref: 'User' // Assuming a User model for creators
    },
    UpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    IsForProperty: Boolean,
    IsForProject: Boolean
});

const Aminity = mongoose.model('Aminity', aminitySchema);

module.exports = Aminity;
