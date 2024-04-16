const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
const {AddAminitySchema,getAllAminitySchema, idAminitySchema, getSearchAminitySchema} = require('../validators/aminityValidator');
const { addAminity,getAllAminity,getAminityById,updateAminity,deleteAminity, searchAminity } = require('../controllers/aminityController');
const auth = require('../middleware/auth');

router.post('/addAminity',auth,validate(AddAminitySchema,'body'),addAminity)
router.get('/allAminity',auth,validate(getAllAminitySchema,'query'),getAllAminity)
router.get('/searchAminity',auth,validate(getSearchAminitySchema,'query'),searchAminity)
router.get('/:id',auth,validate(idAminitySchema,'params'),getAminityById)
router.patch('/updateAminity/:id',validate(idAminitySchema,'params'),auth,updateAminity)
router.delete('/deleteAminity/:id',auth,validate(idAminitySchema,'params'),deleteAminity)

 

module.exports = router