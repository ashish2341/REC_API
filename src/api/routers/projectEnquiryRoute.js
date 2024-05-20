const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { getRecordsSchema, idSchema } = require('../validators/commonValidator');
const { addProjectEnquiry, getAllProjectEnquiry, getProjectEnquiryById, updateProjectEnquiry, deleteProjectEnquiry, getEnquiryByDeveloperId, getUserEnquiry } = require('../controllers/projectEnquiryController');
const {projectEnquiryValidationSchema,getEnquirySchema, getEnquiryByDeveloperSchema} = require('../validators/projectEnquiryValidator');

router.post('/addProjectEnquiry',validate(projectEnquiryValidationSchema,'body'),addProjectEnquiry)
router.get('/allProjectEnquiry',validate(getEnquirySchema,'query'),getAllProjectEnquiry)
router.get('/projectEnquiry/:id',auth,validate(idSchema,'params'),getProjectEnquiryById)
router.patch('/updateProjectEnquiry/:id',validate(idSchema,'params'),auth,updateProjectEnquiry)
router.delete('/deleteProjectEnquiry/:id',auth,validate(idSchema,'params'),deleteProjectEnquiry)
router.get('/enquiryGetByDeveloperId',auth,getEnquiryByDeveloperId)
router.get('/userEnquiry',auth,getUserEnquiry)
 

module.exports = router