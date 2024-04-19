const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { getRecordsSchema, idSchema } = require('../validators/commonValidator');
const { addProject, getAllProject, getProjectById, updateProject, deleteProject } = require('../controllers/projectController');
const projectSchemaValidation = require('../validators/projectValidation');

router.post('/addProject',auth,validate(projectSchemaValidation,'body'),addProject)
router.get('/allProject',auth,validate(getRecordsSchema,'query'),getAllProject)
router.get('/:id',auth,validate(idSchema,'params'),getProjectById)
router.patch('/updateProject/:id',validate(idSchema,'params'),auth,updateProject)
router.delete('/deleteProject/:id',auth,validate(idSchema,'params'),deleteProject)

 

module.exports = router