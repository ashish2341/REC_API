const mongoose = require('mongoose');

const projectEnquirySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    AllowedUser:[String],
    Email: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    EnquiryDate:{
        type:Date
    },
    EnquiryType:String,
    MolileNumber: {
        type:String,
        required: true
    },
    PropertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Properties' 
    },
    DeveloperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer' 
    },
    IsVisiable:{
        type: Boolean,
        default: false
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
