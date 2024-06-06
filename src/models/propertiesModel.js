 
const mongoose = require('mongoose');
const { dbCollectionName } = require('../helper/constants');
 


const PropertySchema = new  mongoose.Schema({
    Title: {type:String,required:true},
    Description:{type:String,required:true},
    Highlight: String,
    ProeprtyFor: { type: String, enum: ['Sell'],required:true },
    ProeprtyType: { type: String, enum: ["Residential", "Commercial"] },
    ProjectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
    },
    PropertySubtype: {type:mongoose.Schema.Types.ObjectId,ref:dbCollectionName.propertyWithSubTypes},
    IsDeleted: {type:Boolean,default:false},
    IsEnabled: {type:Boolean,default:false},
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
    AreaUnits: {
        type:mongoose.Schema.Types.ObjectId,
        ref:dbCollectionName.areaUnits,
    },
    Builder:{type:mongoose.Schema.Types.ObjectId,ref:'Developer'},
    BhkType:{type:mongoose.Schema.Types.ObjectId,ref:dbCollectionName.bhkTypes},
    Area:{type:mongoose.Schema.Types.ObjectId,ref:dbCollectionName.area},
    Fencing:{type:mongoose.Schema.Types.ObjectId,ref:dbCollectionName.fencings},
    Flooring:{type:mongoose.Schema.Types.ObjectId,ref:dbCollectionName.floorings},
    Furnished:{type:mongoose.Schema.Types.ObjectId,ref:dbCollectionName.furnishedes},
    BuiltAreaType: {type:mongoose.Schema.Types.ObjectId,ref:dbCollectionName.builtAreaTypes},
    City: String,
    State: String,
    Country: String,
    Address: String,
    Landmark: String,
    PinCode: String,
    Location: {
        Latitude: String,
        Longitude: String
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
    LandArea: Number,
    CoveredArea: Number,
    CarpetArea: Number,
    TotalPrice: {
        DisplayValue: String,
        MinValue:Number,
        MaxValue:Number,
        MinPriceUnit:String,
        MaxPriceUnit:String
    },
    PerUnitPrice: Number,
    LandAreaUnit:String,
    IsDisplayPrice: Boolean,
    IsNegotiable: Boolean,
    PosessionStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: dbCollectionName.possessiones
    },
    PosessionDate: Date,
    FloorNumber: Number,
    TotalFloors: Number,
    IsSingleProperty: Boolean,
    PricePerSquareFeet: Number,
    FloorsAllowed: Number,
    IsInterstedInJoinedVenture: Boolean,
    Balconies: Number,
    Faq:[{Question:String,Answer:String}],
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
        ByBank: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: dbCollectionName.banks
        }],
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
    }],
    Documents: [{
        Name: String,
        Titile: String,
        URL: String,
        Type: String,
    }],
    Videos: [{
        Name: String,
        Titile: String,
        URL: String,
        Type: String,
    }],
    IsSold: Boolean,
    // PurchaseRentBy:mongoose.Schema.Types.Mixed,
    Preferences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: dbCollectionName.preferences
        
    }],
    DiscountPercentage: Number,
    DiscountForYears: Number,
    Surveillance: [String],
    FloorAndCounter: {
        Dining: String,
        MasterBedroom: String,
        OtherBedroom: String,
        Kitchen: String,
        Toilets: String,
        Balcony: String
    },
    Fitting: {
        Electrical: String,
        Toilets: String,
        Kitchen:String ,
        Doors: String,
        Windows: String,
        Others: String,
    },
    Brochure:String,
    WallAndCeiling: {
        Interior: String,
        Exterior: String,
        Kitchen: String,
        Toilets: String
    },
    OwnerName:String,
    SuitableFor:String,
    ZoneType:String,
    LocationHub :String,
    CustomLocationHub :String,
    CustomSuitable :String,
    CustomZoneType :String,
    BuiltUpArea: Number,
    PlotArea:Number,
    PlotLength: Number,
    Plotwidth: Number,
    WallType: String,
    CellingHeight: Number,
    EntranceWidth: Number,
    TaxCharge: {type:Boolean,default:false},
    LeasedOrRented: {type:Boolean,default:false},
    CurentRent: Number,   
    LeaseYears: Number,
    ExpectedReturn : Number,
    DgUpsCharge: {type:Boolean,default:false} ,
    AgeofProperty: Number,
    Staircase :Number,
    passengerLifts:Number,
    ServiceLifts:Number,
    PublicParking:Number,
    PrivateParking:Number,
    PublicWashroom:Number,
    PrivateWashroom:Number,
    CompletePercentage:Number,


});

const Property = mongoose.model('Properties', PropertySchema);

module.exports = Property;
