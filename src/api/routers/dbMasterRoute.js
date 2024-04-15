const express = require('express')
 
const router = express.Router()
const auth = require('../middleware/auth');
const { getFacing, getPropertyOwnerShip, getPropertyStatus, getPreferences } = require('../controllers/dbMasterController');
 
 
router.get('/facing',auth,getFacing)
router.get('/propertyOwnerShip',auth,getPropertyOwnerShip)
router.get('/propertyStatus',auth,getPropertyStatus)
router.get('/preferences',auth,getPreferences)

module.exports = router