const Joi = require('joi');

const propertySchema = Joi.object({
    Titile: Joi.string().required(),
    Description: Joi.string().required(),
    Highlight: Joi.string().required(),
    ProeprtyFor: Joi.string().valid('Rent', 'Sale', 'Lease').required(),
    ProjectId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    PropertyType:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    IsDeleted: Joi.boolean(),
    IsEnabled: Joi.boolean(),
    IsExclusive: Joi.boolean(),
    IsFeatured: Joi.boolean(),
    IsNew: Joi.boolean(),
    City: Joi.string(),
    AreaUnits:Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Area:Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    State: Joi.string(),
    Country: Joi.string(),
    Address: Joi.string(),
    Landmark: Joi.string(),
    PinCode: Joi.string(),
    Location: Joi.object({
        Latitude: Joi.number(),
        Longitude: Joi.number()
    }),
    Bedrooms: Joi.number().integer().min(0).required(),
    Bathrooms: Joi.number().integer().min(0).required(),
    Fencing: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Flooring: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Furnished: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    BuiltAreaType: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Builder: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    LandArea: Joi.number().min(0),
    CoveredArea: Joi.number().min(0),
    CarpetArea: Joi.number().min(0),
    TotalPrice: Joi.object({
        DisplayValue: Joi.string(),
        MinValue: Joi.number(),
        MaxValue: Joi.number()
    }),
    DiscountPercentage: Joi.number().min(0).required(),
    PerUnitPrice: Joi.number().min(0),
    IsDisplayPrice: Joi.boolean(),
    IsNegotiable: Joi.boolean(),
    PosessionStatus: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    PosessionDate: Joi.date(),
    BhkType:Joi.string().required(),
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
    ReraNumber: Joi.string(),
    Soil:  Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    IsLoanable: Joi.boolean(),
    IsAlreadyLoaned: Joi.boolean(),
    LoanDetails: Joi.object({
        ByBank: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
        LoanSince: Joi.date(),
        LoanTill: Joi.date()
    }),
    OwnershipType: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    DiscountForYears:Joi.number(),
    Surveillance:Joi.array().items(Joi.string()),
    PropertyStatus: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Faq:Joi.array().items(Joi.object({
    Question:Joi.string().required(),
    Answer:Joi.string().required()
    })),
    Images: Joi.array().items(Joi.object({
        Name: Joi.string(),
        Titile: Joi.string(),
        URL: Joi.string().required(),
        Type: Joi.string(),
    })).required(),
    Documents: Joi.array().items(Joi.object({
        Name: Joi.string(),
        Titile: Joi.string(),
        URL: Joi.string(),
        Type: Joi.string(),
        
    })),
    Videos: Joi.array().items(Joi.object({
        Name: Joi.string(),
        Titile: Joi.string(),
        URL: Joi.string(),
        Type: Joi.string(),
      
    })),
    IsSold: Joi.boolean(),
    FloorAndCounter: Joi.object({
        Dining: Joi.string(),
        MasterBedroom: Joi.string(),
        OtherBedroom: Joi.string(),
        Kitchen: Joi.string(),
        Toilets: Joi.string(),
        Balcony: Joi.string()
    }),
    Fitting: Joi.object({
        Electrical: Joi.string(),
        Toilets: Joi.string(),
        Kitchen: Joi.string(),
        Doors: Joi.string(),
        Windows: Joi.string(),
        Others: Joi.string()
    }),
    Brochure:Joi.string(),
    WallAndCeiling: Joi.object({
        Interior: Joi.string(),
        Exterior: Joi.string(),
        Kitchen: Joi.string(),
        Toilets: Joi.string()
    })
    // PurchaseRentBy: Joi.object().optional().when('ProeprtyFor', {
    //     is: 'Sale',
    //     then: Joi.object({
    //         BuyerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    //         PurchaseDate: Joi.date().required(),
    //         PurchaseAmount: Joi.number().min(0).required(),
    //         RegistryNumber: Joi.string().required(),
    //         SellerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    //         Documents: Joi.array().items(Joi.string())
    //     }).options({ presence: 'required' }),
        // can put one more `then` for "Lease"
    //     otherwise: Joi.object({
    //     TenantId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    //     RentAmount: Joi.number().min(0),
    //     RentStartDate: Joi.date(),
    //     RentEndDate: Joi.date(),
    //     RenewedOn: Joi.date(),
    //     SellerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    //     Documents: Joi.array().items(Joi.string())
    //     }).options({ presence: 'required' })
    // }),
   
});
const propertyUpdateSchema = Joi.object({
    Titile: Joi.string(),
    Description: Joi.string(),
    Highlight: Joi.string(),
    ProeprtyFor: Joi.string().valid('Rent', 'Sale', 'Lease'),
    ProjectId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Builder: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    PropertyType:Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    IsDeleted: Joi.boolean(),
    IsEnabled: Joi.boolean(),
    IsExclusive: Joi.boolean(),
    IsFeatured: Joi.boolean(),
    IsNew: Joi.boolean(),
    City: Joi.string(),
    AreaUnits:Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Area:Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    State: Joi.string(),
    Country: Joi.string(),
    Address: Joi.string(),
    Landmark: Joi.string(),
    PinCode: Joi.string(),
    Location: Joi.object({
        Latitude: Joi.number(),
        Longitude: Joi.number()
    }),
    Bedrooms: Joi.number().integer().min(0),
    Bathrooms: Joi.number().integer().min(0),
    Fencing: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Flooring: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Furnished: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    BuiltAreaType: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    LandArea: Joi.number().min(0),
    CoveredArea: Joi.number().min(0),
    CarpetArea: Joi.number().min(0),
    TotalPrice: Joi.object({
        DisplayValue: Joi.string(),
        MinValue: Joi.number(),
        MaxValue: Joi.number()
    }),
    DiscountPercentage: Joi.number().min(0),
    PerUnitPrice: Joi.number().min(0),
    IsDisplayPrice: Joi.boolean(),
    IsNegotiable: Joi.boolean(),
    PosessionStatus: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    PosessionDate: Joi.date(),
    BhkType:Joi.string(),
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
    ReraNumber: Joi.string(),
    Soil:  Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    IsLoanable: Joi.boolean(),
    IsAlreadyLoaned: Joi.boolean(),
    LoanDetails: Joi.object({
        ByBank: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
        LoanSince: Joi.date(),
        LoanTill: Joi.date()
    }),
    OwnershipType: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    DiscountForYears:Joi.number(),
    Surveillance:Joi.array().items(Joi.string()),
    PropertyStatus: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Faq:Joi.array().items(Joi.object({
    Question:Joi.string(),
    Answer:Joi.string()
    })),
    Images: Joi.array().items(Joi.object({
        Name: Joi.string(),
        Titile: Joi.string(),
        URL: Joi.string(),
        Type: Joi.string(),
    })),
    Documents: Joi.array().items(Joi.object({
        Name: Joi.string(),
        Titile: Joi.string(),
        URL: Joi.string(),
        Type: Joi.string(),
    })),
    Videos: Joi.array().items(Joi.object({
        Name: Joi.string(),
        Titile: Joi.string(),
        URL: Joi.string(),
        Type: Joi.string(),
      
    })),
    IsSold: Joi.boolean(),
    FloorAndCounter: Joi.object({
        Dining: Joi.string(),
        MasterBedroom: Joi.string(),
        OtherBedroom: Joi.string(),
        Kitchen: Joi.string(),
        Toilets: Joi.string(),
        Balcony: Joi.string()
    }),
    Fitting: Joi.object({
        Electrical: Joi.string(),
        Toilets: Joi.string(),
        Kitchen: Joi.string(),
        Doors: Joi.string(),
        Windows: Joi.string(),
        Others: Joi.string()
    }),
    Brochure:Joi.string(),
    WallAndCeiling: Joi.object({
        Interior: Joi.string(),
        Exterior: Joi.string(),
        Kitchen: Joi.string(),
        Toilets: Joi.string()
    })
    // PurchaseRentBy: Joi.object().optional().when('ProeprtyFor', {
    //     is: 'Sale',
    //     then: Joi.object({
    //         BuyerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    //         PurchaseDate: Joi.date().required(),
    //         PurchaseAmount: Joi.number().min(0).required(),
    //         RegistryNumber: Joi.string().required(),
    //         SellerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    //         Documents: Joi.array().items(Joi.string())
    //     }).options({ presence: 'required' }),
        // can put one more `then` for "Lease"
    //     otherwise: Joi.object({
    //     TenantId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    //     RentAmount: Joi.number().min(0),
    //     RentStartDate: Joi.date(),
    //     RentEndDate: Joi.date(),
    //     RenewedOn: Joi.date(),
    //     SellerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    //     Documents: Joi.array().items(Joi.string())
    //     }).options({ presence: 'required' })
    // }),
   
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
  const userPropertySchema = Joi.object({
    UserId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
   
  });

module.exports ={ propertySchema,directionSchema,budgetSchema,zodiacSchema,propertyUpdateSchema,getPropertySchema,userPropertySchema};

