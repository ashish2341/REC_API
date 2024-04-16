const mongoose = require('mongoose');

const facingSchema = new mongoose.Schema({
    Facing: {
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

const Facing = mongoose.model('Facing', facingSchema);

module.exports = Facing;
