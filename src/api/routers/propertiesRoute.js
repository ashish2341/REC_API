const express = require('express')
 
const router = express.Router()

const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { addPropeties, getAllProperties, getPropertiesByDirections, getPopularProperties, 
    getPropertiesByArea, getPropertiesByType, getPropertiesByBudget } = require('../controllers/propertiesController');
const {propertySchema, directionSchema, budgetSchema} = require('../validators/propertiesValidators');
const { getRecordsSchema } = require('../validators/commonValidator');


router.post('/addProperty',auth,validate(propertySchema,'body'),addPropeties)
router.get('/allProperties',auth,validate(getRecordsSchema,'query'),getAllProperties)
router.get('/propertyByDirections',auth,validate(directionSchema,"query"),getPropertiesByDirections)
router.get('/popularProperty',getPopularProperties)
router.get('/propertyByArea',getPropertiesByArea)
router.get('/propertyByType',getPropertiesByType)
router.get('/propertyByBudget',auth,validate(budgetSchema,'query'),getPropertiesByBudget)

 

module.exports = router