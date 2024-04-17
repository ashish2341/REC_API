const Joi = require('joi');

const PurchaseRentSchema = Joi.object({
    BuyerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    PurchaseDate: Joi.date(),
    PurchaseAmount: Joi.number().min(0),
    RegistryNumber: Joi.string(),
    TenantId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    RentAmount: Joi.number().min(0),
    RentStartDate: Joi.date(),
    RentEndDate: Joi.date(),
    RenewedOn: Joi.date(),
    SellerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Documents: Joi.array().items(Joi.string())
});

const propertySchema = Joi.object({
    Titile: Joi.string().required(),
    Description: Joi.string().required(),
    Highlight: Joi.string().required(),
    ProeprtyFor: Joi.string().valid('Rent', 'Sale', 'Lease').required(),
    ProjectId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    PropertyTypeWithSubtype: Joi.array().items(Joi.object({
        TypeId:Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
        SubTypeId:Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    })),
    IsDeleted: Joi.boolean(),
    IsEnabled: Joi.boolean(),
    IsExclusive: Joi.boolean(),
    IsFeatured: Joi.boolean(),
    IsNew: Joi.boolean(),
    Features: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    Aminities: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    Facing: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    City: Joi.string(),
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
    Fencing: Joi.string(),
    Flooring: Joi.string(),
    Furnished: Joi.string(),
    BuiltAreaType: Joi.string(),
    LandArea: Joi.number().min(0),
    CoveredArea: Joi.number().min(0),
    CarpetArea: Joi.number().min(0),
    TotalPrice: Joi.number().min(0),
    PerUnitPrice: Joi.number().min(0),
    IsDisplayPrice: Joi.boolean(),
    IsNegotiable: Joi.boolean(),
    PosessionStatus: Joi.string(),
    PosessionDate: Joi.date(),
    FloorNumber: Joi.number().integer().min(0),
    TotalFloors: Joi.number().integer().min(0),
    IsSingleProperty: Joi.boolean(),
    PricePerSquareFeet: Joi.number().min(0),
    FloorsAllowed: Joi.number().integer().min(0),
    IsInterstedInJoinedVenture: Joi.boolean(),
    Balconies: Joi.number().integer().min(0),
    ApprovedBy: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    ReraNumber: Joi.string(),
    Soil:  Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    IsLoanable: Joi.boolean(),
    IsAlreadyLoaned: Joi.boolean(),
    LoanDetails: Joi.object({
        ByBank: Joi.string(),
        LoanSince: Joi.date(),
        LoanTill: Joi.date()
    }),
    OwnershipType: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    PropertyStatus: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    Images: Joi.array().items(Joi.object({
        Name: Joi.string(),
        Titile: Joi.string(),
        URL: Joi.string(),
        Type: Joi.string(),
        IsDeleted: Joi.boolean(),
        IsEnabled: Joi.boolean()
    })),
    Documents: Joi.array().items(Joi.object({
        Name: Joi.string(),
        Titile: Joi.string(),
        URL: Joi.string(),
        Type: Joi.string(),
        IsDeleted: Joi.boolean(),
        IsEnabled: Joi.boolean()
    })),
    Videos: Joi.array().items(Joi.object({
        Name: Joi.string(),
        Titile: Joi.string(),
        URL: Joi.string(),
        Type: Joi.string(),
        IsDeleted: Joi.boolean(),
        IsEnabled: Joi.boolean()
    })),
    IsSold: Joi.boolean(),
    PurchaseRentBy: Joi.object({
        BuyerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
        PurchaseDate: Joi.date(),
        PurchaseAmount: Joi.number().min(0),
        RegistryNumber: Joi.string(),
        TenantId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
        RentAmount: Joi.number().min(0),
        RentStartDate: Joi.date(),
        RentEndDate: Joi.date(),
        RenewedOn: Joi.date(),
        SellerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
        Documents: Joi.array().items(Joi.string())
    }).when('ProeprtyFor', {
        is: 'Rent',
        then: PurchaseRentSchema
    }).when('ProeprtyFor', {
        is: 'Sale',
        then: PurchaseRentSchema.keys({
            BuyerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            PurchaseDate: Joi.date().required(),
            PurchaseAmount: Joi.number().min(0).required(),
            SellerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            Documents: Joi.array().items(Joi.string())
        })
    })
});

module.exports = propertySchema;
