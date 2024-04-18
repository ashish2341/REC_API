const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Logo: String,
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
    DetailNote: String,
    SocialMediaProfileLinks: [String],
    BranchOffices: [{
        Phone: String,
        Mobile: String,
        EmailId: String,
        WhatsApp: String,
        IsEnabled: {
            type: Boolean,
            default: true
        },
        IsDeleted: {
            type: Boolean,
            default: false
        },
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
            IsDeleted: {
                type: Boolean,
                default: false
            },
            IsEnabled: {
                type: Boolean,
                default: true
            },
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
