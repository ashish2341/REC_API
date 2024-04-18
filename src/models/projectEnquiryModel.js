const mongoose = require('mongoose');

const projectEnquirySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Message: {
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
});

const ProjectEnquiry = mongoose.model('ProjectEnquiry', projectEnquirySchema);

module.exports = ProjectEnquiry;
