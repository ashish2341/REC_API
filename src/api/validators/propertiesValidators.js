const Joi = require('joi');

const propertySchema = Joi.object({
    Title: Joi.string().allow(""),
    Description: Joi.string().allow(""),
    Highlight: Joi.string().allow(""),
    ProeprtyFor: Joi.string().valid('Sell'),
    ProjectId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    PropertySubtype:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().allow(""),
    IsDeleted: Joi.boolean(),
    IsEnabled: Joi.boolean(),
    IsExclusive: Joi.boolean(),
    IsFeatured: Joi.boolean(),
    IsNew: Joi.boolean(),
    City: Joi.string().allow(""),
    AreaUnits:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    Area:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    State: Joi.string().allow(""),
    Country: Joi.string().allow(""),
    Address: Joi.string().allow(""),
    Landmark: Joi.string().allow(""),
    PinCode: Joi.string().allow(""),
    Location: Joi.object({
        Latitude: Joi.string().allow(""),
        Longitude: Joi.string().allow("")
    }),
    Bedrooms: Joi.number().integer().min(0),
    Bathrooms: Joi.number().integer().min(0),
    Fencing: Joi.string().allow(""),
    Flooring: Joi.string().allow(""),
    Furnished: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    BuiltAreaType: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    Builder: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    LandArea: Joi.number().min(0).allow(""),
    CoveredArea: Joi.number().min(0).allow(""),
    CarpetArea: Joi.number().min(0).allow(""),
    LandAreaUnit:Joi.string().allow(""),
    TotalPrice: Joi.object({
        DisplayValue: Joi.string().allow(""),
        MinValue: Joi.number().allow(""),
        MaxValue: Joi.number().allow(""),
        MinPriceUnit:Joi.string().allow(""),
        MaxPriceUnit:Joi.string().allow("")
    }),
    DiscountPercentage: Joi.number().min(0),
    PerUnitPrice: Joi.number().min(0),
    IsDisplayPrice: Joi.boolean(),
    IsNegotiable: Joi.boolean(),
    PosessionStatus: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    PosessionDate: Joi.date().allow(""),
    BhkType:Joi.string().allow(""),
    FloorNumber: Joi.number().integer().min(0),
    TotalFloors: Joi.number().integer().min(0),
    IsSingleProperty: Joi.boolean(),
    PricePerSquareFeet: Joi.number().min(0),
    FloorsAllowed: Joi.number().integer().min(0),
    IsInterstedInJoinedVenture: Joi.boolean(),
    Balconies: Joi.number().integer().min(0),
    ApprovedBy: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    Features: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    Aminities: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    Facing: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    Preferences: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    ReraNumber: Joi.string().allow(""),
    Soil:  Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    IsLoanable: Joi.boolean(),
    IsAlreadyLoaned: Joi.boolean(),
    LoanDetails: Joi.object({
        ByBank: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
        LoanSince: Joi.date().allow(""),
        LoanTill: Joi.date()
    }),
    OwnershipType: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    DiscountForYears:Joi.number().allow(""),
    Surveillance:Joi.array().items(Joi.string()).allow(""),
    PropertyStatus: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    Faq:Joi.array().items(Joi.object({
    Question:Joi.string().required().allow(""),
    Answer:Joi.string().required()
    })),
    Images: Joi.array().items(Joi.object({
        Name: Joi.string().allow(""),
        Titile: Joi.string().allow(""),
        URL: Joi.string().allow(""),
        Type: Joi.string().allow(""),
    })),
    Documents: Joi.array().items(Joi.object({
        Name: Joi.string().allow(""),
        Titile: Joi.string().allow(""),
        URL: Joi.string().allow(""),
        Type: Joi.string().allow(""),
        
    })),
    Videos: Joi.array().items(Joi.object({
        Name: Joi.string().allow(""),
        Titile: Joi.string().allow(""),
        URL: Joi.string().allow(""),
        Type: Joi.string().allow(""),
      
    })),
    IsSold: Joi.boolean(),
    FloorAndCounter: Joi.object({
        Dining: Joi.string().allow(""),
        MasterBedroom: Joi.string().allow(""),
        OtherBedroom: Joi.string().allow(""),
        Kitchen: Joi.string().allow(""),
        Toilets: Joi.string().allow(""),
        Balcony: Joi.string().allow("")
    }),
    Fitting: Joi.object({
        Electrical: Joi.string().allow(""),
        Toilets: Joi.string().allow(""),
        Kitchen: Joi.string().allow(""),
        Doors: Joi.string().allow(""),
        Windows: Joi.string().allow(""),
        Others: Joi.string().allow(""),
    }),
    Brochure:Joi.string().allow(""),
    WallAndCeiling: Joi.object({
        Interior: Joi.string().allow(""),
        Exterior: Joi.string().allow(""),
        Kitchen: Joi.string().allow(""),
        Toilets: Joi.string().allow("")
    }),
    OwnerName:Joi.string().allow(""),
    SuitableFor:Joi.string().allow(""),
    ZoneType:Joi.string().allow(""),
    LocationHub :Joi.string().allow(""),
    CustomLocationHub :Joi.string().allow(""),
    CustomSuitable :Joi.string().allow(""),
    CustomZoneType :Joi.string().allow(""),
    BuiltUpArea: Joi.number().allow(""),
    PlotArea:Joi.number().allow(""),
    PlotLength: Joi.number().allow(""),
    Plotwidth: Joi.number().allow(""),
    WallType: Joi.string().allow(""),
    CellingHeight: Joi.number().allow(""),
    EntranceWidth: Joi.number().allow(""),
    TaxCharge: Joi.boolean().allow("") ,
    LeasedOrRented: Joi.boolean().allow(""),
    CurentRent: Joi.number().allow(""),   
    LeaseYears: Joi.number().allow(""),
    ExpectedReturn : Joi.number().allow(""),
    DgUpsCharge: Joi.boolean().allow(""),
    AgeofProperty:Joi.number().allow(""),
    Staircase :Joi.number().allow(""),
    passengerLifts:Joi.number().allow(""),
    ServiceLifts:Joi.number().allow(""),
    PublicParking:Joi.number().allow(""),
    PrivateParking:Joi.number().allow(""),
    PublicWashroom:Joi.number().allow(""),
    PrivateWashroom:Joi.number().allow(""),
    CompletePercentage:Joi.number().allow(""),
    ProeprtyType: Joi.string().valid("Residential", "Commercial") ,
    PaymentPlan:Joi.string().allow(""), 
    FloorPlan:Joi.string().allow(""),
    CustomFencing:Joi.string().allow(""), 
    CustomFlooring:Joi.string().allow(""),
    CustomWallType:Joi.string().allow(""), 

   
});
const propertyUpdateSchema = Joi.object({
    Title: Joi.string().allow(""),
    Description: Joi.string().allow(""),
    Highlight: Joi.string().allow(""),
    ProeprtyFor: Joi.string().valid('Sell'),
    ProjectId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    Builder: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    PropertySubtype:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    IsDeleted: Joi.boolean(),
    IsEnabled: Joi.boolean(),
    IsExclusive: Joi.boolean(),
    IsFeatured: Joi.boolean(),
    IsNew: Joi.boolean(),
    City: Joi.string().allow(""),
    AreaUnits:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    Area:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    State: Joi.string().allow(""),
    Country: Joi.string().allow(""),
    Address: Joi.string().allow(""),
    Landmark: Joi.string().allow(""),
    PinCode: Joi.string().allow(""),
    Location: Joi.object({
        Latitude: Joi.string().allow(""),
        Longitude: Joi.string().allow("")
    }),
    Bedrooms: Joi.number().integer().min(0),
    Bathrooms: Joi.number().integer().min(0),
    Fencing: Joi.string().allow(""),
    Flooring: Joi.string().allow(""),
    Furnished: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    BuiltAreaType: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    LandArea: Joi.number().min(0).allow(''),
    CoveredArea: Joi.number().min(0).allow(''),
    CarpetArea: Joi.number().min(0).allow(''),
    LandAreaUnit:Joi.string().allow(""),
    TotalPrice: Joi.object({
        DisplayValue: Joi.string().allow(""),
        MinValue: Joi.number().allow(""),
        MaxValue: Joi.number().allow(""),
        MinPriceUnit:Joi.string().allow(""),
        MaxPriceUnit:Joi.string().allow("")
    }),
    DiscountPercentage: Joi.number().min(0),
    PerUnitPrice: Joi.number().min(0),
    IsDisplayPrice: Joi.boolean(),
    IsNegotiable: Joi.boolean(),
    PosessionStatus: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    PosessionDate: Joi.date(),
    BhkType:Joi.string().allow(""),
    FloorNumber: Joi.number().integer().min(0),
    TotalFloors: Joi.number().integer().min(0),
    IsSingleProperty: Joi.boolean(),
    PricePerSquareFeet: Joi.number().min(0),
    FloorsAllowed: Joi.number().integer().min(0),
    IsInterstedInJoinedVenture: Joi.boolean(),
    Balconies: Joi.number().integer().min(0),
    ApprovedBy: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    Features: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    Aminities: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    Facing: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    Preferences: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    ReraNumber: Joi.string().allow(""),
    Soil:  Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    IsLoanable: Joi.boolean(),
    IsAlreadyLoaned: Joi.boolean(),
    LoanDetails: Joi.object({
        ByBank: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
        LoanSince: Joi.date().allow(""),
        LoanTill: Joi.date()
    }),
    OwnershipType: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    DiscountForYears:Joi.number().allow(""),
    Surveillance:Joi.array().items(Joi.string()),
    PropertyStatus: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).allow(""),
    Faq:Joi.array().items(Joi.object({
    Question:Joi.string().allow(""),
    Answer:Joi.string()
    })),
    Images: Joi.array().items(Joi.object({
        Name: Joi.string().allow(""),
        Titile: Joi.string().allow(""),
        URL: Joi.string().allow(""),
        Type: Joi.string().allow(""),
    })),
    Documents: Joi.array().items(Joi.object({
        Name: Joi.string().allow(""),
        Titile: Joi.string().allow(""),
        URL: Joi.string().allow(""),
        Type: Joi.string().allow(""),
    })),
    Videos: Joi.array().items(Joi.object({
        Name: Joi.string().allow(""),
        Titile: Joi.string().allow(""),
        URL: Joi.string().allow(""),
        Type: Joi.string().allow(""),
      
    })),
    IsSold: Joi.boolean(),
    FloorAndCounter: Joi.object({
        Dining: Joi.string().allow(""),
        MasterBedroom: Joi.string().allow(""),
        OtherBedroom: Joi.string().allow(""),
        Kitchen: Joi.string().allow(""),
        Toilets: Joi.string().allow(""),
        Balcony: Joi.string().allow("")
    }),
    Fitting: Joi.object({
        Electrical: Joi.string().allow(""),
        Toilets: Joi.string().allow(""),
        Kitchen: Joi.string().allow(""),
        Doors: Joi.string().allow(""),
        Windows: Joi.string().allow(""),
        Others: Joi.string().allow(""),
    }),
    Brochure:Joi.string().allow(""),
    WallAndCeiling: Joi.object({
        Interior: Joi.string().allow(""),
        Exterior: Joi.string().allow(""),
        Kitchen: Joi.string().allow(""),
        Toilets: Joi.string().allow("")
    }),
    OwnerName:Joi.string().allow(""),
    SuitableFor:Joi.string().allow(""),
    ZoneType:Joi.string().allow(""),
    LocationHub :Joi.string().allow(""),
    CustomLocationHub :Joi.string().allow(""),
    CustomSuitable :Joi.string().allow(""),
    CustomZoneType :Joi.string().allow(""),
    BuiltUpArea: Joi.number().allow(""),
    PlotArea:Joi.number().allow(""),
    PlotLength: Joi.number().allow(""),
    Plotwidth: Joi.number().allow(""),
    WallType: Joi.string().allow(""),
    CellingHeight: Joi.number().allow(""),
    EntranceWidth: Joi.number().allow(""),
    TaxCharge: Joi.boolean() ,
    LeasedOrRented: Joi.boolean(),
    CurentRent: Joi.number().allow(""),   
    LeaseYears: Joi.number().allow(""),
    ExpectedReturn : Joi.number().allow(""),
    DgUpsCharge: Joi.boolean(),
    AgeofProperty:Joi.number().allow(""),
    Staircase :Joi.number().allow(""),
    passengerLifts:Joi.number().allow(""),
    ServiceLifts:Joi.number().allow(""),
    PublicParking:Joi.number().allow(""),
    PrivateParking:Joi.number().allow(""),
    PublicWashroom:Joi.number().allow(""),
    PrivateWashroom:Joi.number().allow(""),
    CompletePercentage:Joi.number().allow(""),
    ProeprtyType: Joi.string().valid("Residential", "Commercial") ,
    PaymentPlan:Joi.string().allow(""), 
    FloorPlan:Joi.string().allow(""),
    CustomFencing:Joi.string().allow(""), 
    CustomFlooring:Joi.string().allow(""),
    CustomWallType:Joi.string().allow(""), 
 
   
});
const directionSchema = Joi.object({
    direction:Joi.string().required()
})

const getPropertySchema = Joi.object({
    sortBy:Joi.string().allow(''),
    sortOrder:Joi.string().allow(''),
    IsFeatured :Joi.boolean().allow(''),
    IsExclusive: Joi.boolean().allow(''),


  });
const budgetSchema = Joi.object({
    budget: Joi.array().length(2).items(Joi.number()),
    propertyType:Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    buyType:Joi.array().items(Joi.string()),
    bathroom:Joi.array().items(Joi.number()),
    landArea:Joi.array().items(Joi.number()),
    bhkType:Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
   facing:Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
   areaType:Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
   propertyStatus:Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
   posessionStatus:Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
   feature:Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)), 
})
const zodiacSchema = Joi.object({
    dob: Joi.string().required().pattern(/^\d{4}-\d{2}-\d{2}$/).message('Date formate should be YYYY-MM-DD'),
   
  });

module.exports ={ propertySchema,directionSchema,budgetSchema,zodiacSchema,propertyUpdateSchema,getPropertySchema};

