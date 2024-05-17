const express = require('express')
 
const router = express.Router()

const { validate} = require('../../helper/customValidation');
const auth = require('../middleware/auth');

const { addPropeties, getAllProperties, getPropertiesByDirections, getPopularProperties, 
    getPropertiesByArea, getPropertiesByType, getPropertiesByBudget, getPropertiesById, updateProperties, deleteProperties, getPropertiesWithArea, getPropertiesByAreaOrPropertyType, getSimilarProperties, 
    getPropertiesByDob,
    getPropertiesForReview,
    getPropertiesByUserId} = require('../controllers/propertiesController');
const {propertySchema, directionSchema, budgetSchema, zodiacSchema, propertyUpdateSchema, getPropertySchema, userPropertySchema} = require('../validators/propertiesValidators');
const { getRecordsSchema, idSchema } = require('../validators/commonValidator');
const { roleSchema } = require('../validators/authValidator');
const validateRole = require('../middleware/role');


router.post('/addProperty',auth,validate(propertySchema,'body'),addPropeties)
router.get('/allProperties',validate(getRecordsSchema,'query'),validateRole(['Admin','Buyer']),getAllProperties)
router.get('/propertyByDirections',validate(directionSchema,"query"),getPropertiesByDirections)
router.get('/popularProperty',getPopularProperties)
router.get('/propertyByArea',getPropertiesByArea)
router.get('/getPropertiesByAreaOrPropertyType',getPropertiesByAreaOrPropertyType)
router.get('/propertyByType',getPropertiesByType)
router.post('/propertyByBudget',validate(budgetSchema,'post'),validate(getPropertySchema,'query'),getPropertiesByBudget)
router.get('/property/:id',validate(idSchema,'params'),getPropertiesById)
router.patch('/updateProperty/:id',validate(propertyUpdateSchema,'body'),auth,updateProperties)
router.delete('/deleteProperty/:id',auth,validate(idSchema,'params'),deleteProperties)
router.get('/similarProperty/:id',getSimilarProperties)
router.get('/zodiac/:dob',validate(zodiacSchema,'params'),getPropertiesByDob)
router.get('/reviewProperty',validate(getPropertySchema,'query'),getPropertiesForReview)
router.get('/propertyByUserId',auth,validate(getRecordsSchema,'query'),getPropertiesByUserId)


 

module.exports = router