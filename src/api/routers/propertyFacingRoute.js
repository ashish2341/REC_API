const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { addPropertyFacing, getAllPropertyFacing, getPropertyFacingById, updatePropertyFacing, deletePropertyFacing } = require('../controllers/propertyFacingController');
const { addPropertyFacingSchema, getAllPropertyFacingSchema, idPropertyFacingSchema } = require('../validators/propertyFacingValidator');


router.post('/addPropertyFacing',auth,validate(addPropertyFacingSchema,'body'),addPropertyFacing)
router.get('/allPropertyFacing',auth,validate(getAllPropertyFacingSchema,'query'),getAllPropertyFacing)
router.get('/:id',auth,validate(idPropertyFacingSchema,'params'),getPropertyFacingById)
router.patch('/updatePropertyFacing/:id',validate(idPropertyFacingSchema,'params'),auth,updatePropertyFacing)
router.delete('/deletePropertyFacing/:id',auth,validate(idPropertyFacingSchema,'params'),deletePropertyFacing)
 

module.exports = router