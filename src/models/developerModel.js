const mongoose = require('mongoose');
const { dbCollectionName } = require('../helper/constants');

const developerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    SocialMediaProfileLinks: {
        Twitter: String,
        Facebook:String,
        LinkedIn:String,
        Instagram :String
    },
    Mobile: String,
    EmailId: String,
    WhatsApp: String,
    Area:{type:mongoose.Schema.Types.ObjectId,ref:dbCollectionName.area},
    Description:String,
    DetailNote:String,
    Logo: String,
    EstablishDate:Date,
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
    Images: [String],
    Documents: [{
        Type: String,
        DocName: String,
        URL: String,
        Description: String,
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
            ref: 'User'
        }
    }],
    VerifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    VerificationDate: Date,
    BranchOffices: [{
        Phone: Number,
        Mobile: Number,
        EmailId: String,
        WhatsApp: String,
        Area: String,
        City: String,
        State: String,
        Country: String,
        PinCode: String,
        ContactPerson: [{
            Name: String,
            Mobile: String,
            EmailId: String,
            Phone: String,
            Designation: String
        }]
    }],
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    UpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Developer = mongoose.model('Developer', developerSchema);

module.exports = Developer;
