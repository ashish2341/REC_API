const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { addDeveloper, getAllDeveloper, getDeveloperById, updateDeveloper, deleteDeveloper } = require('../controllers/developerController');
const { AddDeveloperSchema, UpdateDeveloperSchema } = require('../validators/developerValidator');
const { getRecordsSchema, idSchema } = require('../validators/commonValidator');

router.post('/addDeveloper',auth,validate(AddDeveloperSchema,'body'),addDeveloper)
router.get('/allDeveloper',auth,validate(getRecordsSchema,'query'),getAllDeveloper)
router.get('/developer/:id',auth,validate(idSchema,'params'),getDeveloperById)
router.patch('/updateDeveloper/:id',auth,validate(UpdateDeveloperSchema,'body'),updateDeveloper)
router.delete('/deleteDeveloper/:id',auth,validate(idSchema,'params'),deleteDeveloper)

 

module.exports = router