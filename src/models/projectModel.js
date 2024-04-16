const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Highlight: {
        type: String
    },
    PropertyTypes: [{
        type: String
    }],
    IsDeleted: {
        type: Boolean,
        default: false
    },
    IsEnabled: {
        type: Boolean,
        default: true
    },
    IsExclusive: {
        type: Boolean,
        default: false
    },
    IsFeatured: {
        type: Boolean,
        default: false
    },
    IsNew: {
        type: Boolean,
        default: false
    },
    Features: [{
        type: String
    }],
    Amenities: [{
        type: String
    }],
    Facing: [{
        type: String
    }],
    City: {
        type: String
    },
    State: {
        type: String
    },
    Country: {
        type: String
    },
    Address: {
        type: String
    },
    Landmark: {
        type: String
    },
    PinCode: {
        type: String
    },
    Location: {
        Latitude: {
            type: Number
        },
        Longitude: {
            type: Number
        }
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
    },
    AvailableUnits: {
        type: Number
    },
    ReraNumber: {
        type: String
    },
    ApprovedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    ProjectStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PropertyStatus"
    },
    Images: [{
        Name: String,
        Title: String,
        URL: String,
        Type: String,
        IsDeleted: {
            type: Boolean,
            default: false
        },
        IsEnabled: {
            type: Boolean,
            default: true
        }
    }],
    Documents: [{
        Name: String,
        Title: String,
        URL: String,
        Type: String,
        IsDeleted: {
            type: Boolean,
            default: false
        },
        IsEnabled: {
            type: Boolean,
            default: true
        }
    }],
    Videos: [{
        Name: String,
        Title: String,
        URL: String,
        Type: String,
        IsDeleted: {
            type: Boolean,
            default: false
        },
        IsEnabled: {
            type: Boolean,
            default: true
        }
    }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
