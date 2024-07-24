const mongoose = require('mongoose');

const projectEnquirySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    AllowedUser:[{UserId:String,Status:Boolean}],
    IsActionTaken:{type:Boolean,default:false},  
    Email: {
        type: String,
    },
    Message: {
        type: String
    },
    EnquiryDate:{
        type:Date },
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
   
    IsDeleted: {
        type: Boolean,
        default: false
    },
    IsEnabled: {
        type: Boolean,
        default: true
    },
    IsActive: {
        type: Boolean,
        default: false
    },
    CreatedDate:{
        type:Date,
        default:Date.now()
    }
});

const ProjectEnquiry = mongoose.model('ProjectEnquiry', projectEnquirySchema);

module.exports = ProjectEnquiry;
