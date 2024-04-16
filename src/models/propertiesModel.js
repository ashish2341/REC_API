const mongoose = require('mongoose');


const PropertySchema = new  mongoose.Schema({
    Titile: String,
    Description: String,
    Highlight: String,
    ProeprtyFor: { type: String, enum: ['Rent', 'Sale', 'Lease'] },
    ProjectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
    },
    PropertyTypeWithSubtype: [String],
    IsDeleted: Boolean,
    IsEnabled: Boolean,
    IsExclusive: Boolean,
    IsFeatured: Boolean,
    IsNew: Boolean,
    Features:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Features",
    },
    Aminities: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Aminity",
    },
    Facing: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Facing",
    },
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
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
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
    ApprovedBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    ReraNumber: String,
    Soil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Soil"
    },
    IsLoanable: Boolean,
    IsAlreadyLoaned: Boolean,
    LoanDetails: {
        ByBank: String,
        LoanSince: Date,
        LoanTill: Date
    },
    OwnershipType: String,//mongoose
    PropertyStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PropertyStatus"
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
    PurchaseRentBy: {
        BuyerId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        PurchaseDate: Date,
        PurchaseAmount: Number,
        RegistryNumber: String,
        TenantId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        RentAmount: Number,
        RentStartDate: Date,
        RentEndDate: Date,
        RenewedOn: Date,
        SellerId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        Documents: [String]
    },
    Preferences: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Preference"
        
    },
    DiscountPercentage: Number,
    DiscountForYears: Number,
    Surveillance: [String]
});

const Property = mongoose.model('Properties', PropertySchema);

module.exports = Property;
