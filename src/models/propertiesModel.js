 
const mongoose = require('mongoose');
const { dbCollectionName } = require('../helper/constants');


const PropertySchema = new  mongoose.Schema({
    Titile: {type:String,required:true},
    Description:{type:String,required:true},
    Highlight: String,
    ProeprtyFor: { type: String, enum: ['Rent', 'Sale', 'Lease'],required:true },
    ProjectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
    },
    PropertyTypeWithSubtype: [{TypeId:{type:mongoose.Schema.Types.ObjectId,ref:dbCollectionName.propertyWithSubTypes},
    SubTypeId:{type:mongoose.Schema.Types.ObjectId,ref:dbCollectionName.propertyWithSubTypes}
}],
    IsDeleted: {type:Boolean,default:false},
    IsEnabled: {type:Boolean,default:true},
    IsExclusive: Boolean,
    IsFeatured: Boolean,
    IsNew: Boolean,
    Features:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Features",
    }],
    Aminities: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Aminity",
    }],
    Facing: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:dbCollectionName.facings,
    }],
    City: String,
    State: String,
    Country: String,
    Address: String,
    Landmark: String,
    PinCode: String,
    Location: {
        Latitude: Number,
        Longitude: Number
    },
    CreatedDate: { type: Date, default: Date.now },
    CreatedBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    UpdatedDate:{
        type: Date, default: Date.now
    },
    UpdatedBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    Bedrooms: Number,
    Bathrooms: Number,
    Fencing: String,
    Flooring: String,
    Furnished: String,
    BuiltAreaType: String,
    LandArea: Number,
    CoveredArea: Number,
    CarpetArea: Number,
    TotalPrice: Number,
    PerUnitPrice: Number,
    IsDisplayPrice: Boolean,
    IsNegotiable: Boolean,
    PosessionStatus: String,
    PosessionDate: Date,
    FloorNumber: Number,
    TotalFloors: Number,
    IsSingleProperty: Boolean,
    PricePerSquareFeet: Number,
    FloorsAllowed: Number,
    IsInterstedInJoinedVenture: Boolean,
    Balconies: Number,
    ApprovedBy: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    ReraNumber: String,
    Soil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: dbCollectionName.soils
    },
    IsLoanable: Boolean,
    IsAlreadyLoaned: Boolean,
    LoanDetails: {
        ByBank: String,
        LoanSince: Date,
        LoanTill: Date
    },
    OwnershipType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: dbCollectionName.propertyOwnerShips
    },
    PropertyStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: dbCollectionName.propertyStatus
    },
    Images: [{
        Name: String,
        Titile: String,
        URL: String,
        Type: String,
        IsDeleted: Boolean,
        IsEnabled: Boolean
    }],
    Documents: [{
        Name: String,
        Titile: String,
        URL: String,
        Type: String,
        IsDeleted: Boolean,
        IsEnabled: Boolean
    }],
    Videos: [{
        Name: String,
        Titile: String,
        URL: String,
        Type: String,
        IsDeleted: Boolean,
        IsEnabled: Boolean
    }],
    IsSold: Boolean,
    PurchaseRentBy:mongoose.Schema.Types.Mixed,
    Preferences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: dbCollectionName.preferences
        
    }],
    DiscountPercentage: Number,
    DiscountForYears: Number,
    Surveillance: [String]
});

const Property = mongoose.model('Properties', PropertySchema);

module.exports = Property;
