const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
const {AddAminitySchema} = require('../validators/aminityValidator');
const { addAminity,getAllAminity,getAminityById,updateAminity,deleteAminity } = require('../controllers/aminityController');
const auth = require('../middleware/auth');
const { getRecordsSchema, idSchema } = require('../validators/commonValidator');

router.post('/addAminity',auth,validate(AddAminitySchema,'body'),addAminity)
router.get('/allAminity',auth,validate(getRecordsSchema,'query'),getAllAminity)
router.get('/aminity/:id',auth,validate(idSchema,'params'),getAminityById)
router.patch('/updateAminity/:id',validate(idSchema,'params'),auth,updateAminity)
router.delete('/deleteAminity/:id',auth,validate(idSchema,'params'),deleteAminity)

 

module.exports = router