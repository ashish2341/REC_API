const express = require('express')
 
const router = express.Router()

const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { addPropeties, getAllProperties } = require('../controllers/propertiesController');
const {propertySchema} = require('../validators/propertiesValidators');
const { getRecordsSchema } = require('../validators/commonValidator');


router.post('/addProperty',auth,validate(propertySchema,'body'),addPropeties)
router.get('/allProperties',auth,validate(getRecordsSchema,'query'),getAllProperties)

 

module.exports = router