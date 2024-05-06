const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { getRecordsSchema, idSchema } = require('../validators/commonValidator');
const { addProjectEnquiry, getAllProjectEnquiry, getProjectEnquiryById, updateProjectEnquiry, deleteProjectEnquiry } = require('../controllers/projectEnquiryController');
const projectEnquiryValidationSchema = require('../validators/projectEnquiryValidator');

router.post('/addProjectEnquiry',validate(projectEnquiryValidationSchema,'body'),addProjectEnquiry)
router.get('/allProjectEnquiry',auth,validate(getRecordsSchema,'query'),getAllProjectEnquiry)
router.get('/projectEnquiry/:id',auth,validate(idSchema,'params'),getProjectEnquiryById)
router.patch('/updateProjectEnquiry/:id',validate(idSchema,'params'),auth,updateProjectEnquiry)
router.delete('/deleteProjectEnquiry/:id',auth,validate(idSchema,'params'),deleteProjectEnquiry)

 

module.exports = router