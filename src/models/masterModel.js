const mongoose = require('mongoose');
const { dbCollectionName } = require('../helper/constants');

 
const Soils = mongoose.model(dbCollectionName.soils, mongoose.Schema({}));
const Facings = mongoose.model(dbCollectionName.facings, mongoose.Schema({}));
const PropertyWithSubTypes = mongoose.model(dbCollectionName.propertyWithSubTypes, mongoose.Schema({}));
module.exports = {Soils,Facings,PropertyWithSubTypes}
