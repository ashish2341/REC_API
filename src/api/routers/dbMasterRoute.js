const express = require('express')
 
const router = express.Router()
const auth = require('../middleware/auth');
const { getMasterDBRecords } = require('../controllers/dbMasterController');
const { dbCollectionName } = require('../../helper/constants');
 
 
router.get('/facing',auth,getMasterDBRecords(dbCollectionName.facings))
router.get('/propertyOwnerShip',auth,getMasterDBRecords(dbCollectionName.propertyOwnerShips))
router.get('/propertyStatus',auth,getMasterDBRecords(dbCollectionName.propertyStatus))
router.get('/preferences',auth,getMasterDBRecords(dbCollectionName.preferences))
router.get('/soils',auth,getMasterDBRecords(dbCollectionName.soils))
router.get('/propertyWithSubTypes',auth,getMasterDBRecords(dbCollectionName.propertyWithSubTypes))
router.get('/features',auth,getMasterDBRecords(dbCollectionName.features))
router.get('/aminities',auth,getMasterDBRecords(dbCollectionName.aminities))
router.get('/fencings',auth,getMasterDBRecords(dbCollectionName.fencings))
router.get('/floorings',auth,getMasterDBRecords(dbCollectionName.floorings))
router.get('/furnishedes',auth,getMasterDBRecords(dbCollectionName.furnishedes))
router.get('/builtAreaTypes',auth,getMasterDBRecords(dbCollectionName.builtAreaTypes))
router.get('/areas',auth,getMasterDBRecords(dbCollectionName.area))
router.get('/areaunits',auth,getMasterDBRecords(dbCollectionName.areaUnits))
router.get('/banks',auth,getMasterDBRecords(dbCollectionName.banks))
router.get('/bhkType',auth,getMasterDBRecords(dbCollectionName.bhkTypes))
router.get('/possession',auth,getMasterDBRecords(dbCollectionName.possessiones))

module.exports = router