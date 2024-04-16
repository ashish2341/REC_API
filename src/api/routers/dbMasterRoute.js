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

module.exports = router