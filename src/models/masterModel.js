const mongoose = require('mongoose');
const { dbCollectionName } = require('../helper/constants');

 
const Soils = mongoose.model(dbCollectionName.soils, mongoose.Schema({}));
const Facings = mongoose.model(dbCollectionName.facings, mongoose.Schema({}));
const PropertyWithSubTypes = mongoose.model(dbCollectionName.propertyWithSubTypes, mongoose.Schema({}));
const AreaUnits = mongoose.model(dbCollectionName.areaUnits,mongoose.Schema({}));
const OwnershipTypes = mongoose.model(dbCollectionName.propertyOwnerShips,mongoose.Schema({}));
const PropertyStatus = mongoose.model(dbCollectionName.propertyStatus,mongoose.Schema({}));
const Preferences = mongoose.model(dbCollectionName.preferences,mongoose.Schema({}));
module.exports = {Soils,Facings,PropertyWithSubTypes,AreaUnits,OwnershipTypes,Preferences,PropertyStatus}