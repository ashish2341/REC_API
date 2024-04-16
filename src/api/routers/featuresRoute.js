const express = require('express')
 
const router = express.Router()

const { validate } = require('../../helper/customValidation');

const auth = require('../middleware/auth');
const { addFeature, getAllFeature, getFeatureById, updateFeature, deleteFeature, searchFeatures } = require('../controllers/featuresController');
const { addFeatureSchema, getAllFeatureSchema, idFeatureSchema } = require('../validators/featureValidator');

router.post('/addFeature',auth,validate(addFeatureSchema,'body'),addFeature)
router.get('/allFeature',auth,validate(getAllFeatureSchema,'query'),getAllFeature)
router.get('/searchFeature',auth,searchFeatures)
router.get('/:id',auth,validate(idFeatureSchema,'params'),getFeatureById)
router.patch('/updateFeature/:id',validate(idFeatureSchema,'params'),auth,updateFeature)
router.delete('/deleteFeature/:id',validate(idFeatureSchema,'params'),auth,deleteFeature)
 

module.exports = router