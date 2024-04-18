const express = require('express')
 
const router = express.Router()

const { validate } = require('../../helper/customValidation');

const auth = require('../middleware/auth');
const { addFeature, getAllFeature, getFeatureById, updateFeature, deleteFeature} = require('../controllers/featuresController');
const { addFeatureSchema} = require('../validators/featureValidator');
const { getRecordsSchema, idSchema } = require('../validators/commonValidator');

router.post('/addFeature',auth,validate(addFeatureSchema,'body'),addFeature)
router.get('/allFeature',auth,validate(getRecordsSchema,'query'),getAllFeature)
router.get('/:id',auth,validate(idSchema,'params'),getFeatureById)
router.patch('/updateFeature/:id',validate(idSchema,'params'),auth,updateFeature)
router.delete('/deleteFeature/:id',validate(idSchema,'params'),auth,deleteFeature)
 

module.exports = router