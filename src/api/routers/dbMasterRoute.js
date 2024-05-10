const express = require('express')
 
const router = express.Router()
const auth = require('../middleware/auth');
const { getMasterDBRecords } = require('../controllers/dbMasterController');
const { dbCollectionName } = require('../../helper/constants');
 
 
router.get('/facing',getMasterDBRecords(dbCollectionName.facings))
router.get('/propertyOwnerShip',getMasterDBRecords(dbCollectionName.propertyOwnerShips))
router.get('/propertyStatus',getMasterDBRecords(dbCollectionName.propertyStatus))
router.get('/preferences',getMasterDBRecords(dbCollectionName.preferences))
router.get('/soils',getMasterDBRecords(dbCollectionName.soils))
router.get('/propertyWithSubTypes',getMasterDBRecords(dbCollectionName.propertyWithSubTypes))
router.get('/features',getMasterDBRecords(dbCollectionName.features))
router.get('/aminities',getMasterDBRecords(dbCollectionName.aminities))
router.get('/fencings',getMasterDBRecords(dbCollectionName.fencings))
router.get('/floorings',getMasterDBRecords(dbCollectionName.floorings))
router.get('/furnishedes',getMasterDBRecords(dbCollectionName.furnishedes))
router.get('/builtAreaTypes',getMasterDBRecords(dbCollectionName.builtAreaTypes))
router.get('/areas',getMasterDBRecords(dbCollectionName.area))
router.get('/areaunits',getMasterDBRecords(dbCollectionName.areaUnits))
router.get('/banks',getMasterDBRecords(dbCollectionName.banks))
router.get('/bhkType',getMasterDBRecords(dbCollectionName.bhkTypes))
router.get('/possession',getMasterDBRecords(dbCollectionName.possessiones))

module.exports = router