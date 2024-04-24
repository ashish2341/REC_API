const mongoose = require('mongoose');
const { dbCollectionName } = require('../helper/constants');

 
const Soils = mongoose.model(dbCollectionName.soils, mongoose.Schema({}));
const Facings = mongoose.model(dbCollectionName.facings, mongoose.Schema({}));
const PropertyWithSubTypes = mongoose.model(dbCollectionName.propertyWithSubTypes, mongoose.Schema({}));
const AreaUnits = mongoose.model(dbCollectionName.areaUnits,mongoose.Schema({}));
const OwnershipTypes = mongoose.model(dbCollectionName.propertyOwnerShips,mongoose.Schema({}));
const PropertyStatus = mongoose.model(dbCollectionName.propertyStatus,mongoose.Schema({}));
const Preferences = mongoose.model(dbCollectionName.preferences,mongoose.Schema({}));
const Area = mongoose.model(dbCollectionName.area,mongoose.Schema({}));
const Fecnings = mongoose.model(dbCollectionName.fencings,mongoose.Schema({}));
const Floorings = mongoose.model(dbCollectionName.floorings,mongoose.Schema({}));
const Furnishedes = mongoose.model(dbCollectionName.furnishedes,mongoose.Schema({}));
const BuiltAreaTypes = mongoose.model(dbCollectionName.builtAreaTypes,mongoose.Schema({}));
const BhkType = mongoose.model(dbCollectionName.bhkTypes,mongoose.Schema({}));

module.exports = {Soils,Facings,PropertyWithSubTypes,AreaUnits,OwnershipTypes,
    Preferences,PropertyStatus,Area,Fecnings,Floorings,Furnishedes,BuiltAreaTypes,BhkType}