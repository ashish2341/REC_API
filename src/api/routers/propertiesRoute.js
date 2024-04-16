const express = require('express')
 
const router = express.Router()

const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { addPropeties, getAllProperties } = require('../controllers/propertiesController');
const propertySchema = require('../validators/propertiesValidators');



router.post('/addProperty',auth,validate(propertySchema,'body'),addPropeties)
router.get('/allProperties',auth,getAllProperties)

 

module.exports = router