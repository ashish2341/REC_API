const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { addDeveloper, getAllDeveloper, getDeveloperById, updateDeveloper, deleteDeveloper } = require('../controllers/developerController');
const { AddDeveloperSchema, getAllDeveloperSchema, idDeveloperSchema } = require('../validators/developerValidator');

router.post('/addDeveloper',auth,validate(AddDeveloperSchema,'body'),addDeveloper)
router.get('/allDeveloper',auth,validate(getAllDeveloperSchema,'query'),getAllDeveloper)
router.get('/:id',auth,validate(idDeveloperSchema,'params'),getDeveloperById)
router.patch('/updateDeveloper/:id',validate(idDeveloperSchema,'params'),auth,updateDeveloper)
router.delete('/deleteDeveloper/:id',auth,validate(idDeveloperSchema,'params'),deleteDeveloper)

 

module.exports = router