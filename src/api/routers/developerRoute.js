const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { addDeveloper, getAllDeveloper, getDeveloperById, updateDeveloper, deleteDeveloper } = require('../controllers/developerController');
const { AddDeveloperSchema } = require('../validators/developerValidator');
const { getRecordsSchema, idSchema } = require('../validators/commonValidator');

router.post('/addDeveloper',auth,validate(AddDeveloperSchema,'body'),addDeveloper)
router.get('/allDeveloper',auth,validate(getRecordsSchema,'query'),getAllDeveloper)
router.get('/:id',auth,validate(idSchema,'params'),getDeveloperById)
router.patch('/updateDeveloper/:id',validate(idSchema,'params'),auth,updateDeveloper)
router.delete('/deleteDeveloper/:id',auth,validate(idSchema,'params'),deleteDeveloper)

 

module.exports = router