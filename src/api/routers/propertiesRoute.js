const express = require('express')
 
const router = express.Router()

const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { addPropeties, getAllProperties, getPropertiesByDirections, getPopularProperties, getPropertiesByArea, getPropertiesByType } = require('../controllers/propertiesController');
const {propertySchema, directionSchema} = require('../validators/propertiesValidators');
const { getRecordsSchema } = require('../validators/commonValidator');


router.post('/addProperty',auth,validate(propertySchema,'body'),addPropeties)
router.get('/allProperties',auth,validate(getRecordsSchema,'query'),getAllProperties)
router.get('/propertyByDirections',auth,validate(directionSchema,"query"),getPropertiesByDirections)
router.get('/popularProperty',auth,getPopularProperties)
router.get('/propertyByArea',auth,getPropertiesByArea)
router.get('/propertyByType',auth,getPropertiesByType)

 

module.exports = router