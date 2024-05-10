const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { getRecordsSchema, idSchema } = require('../validators/commonValidator');
const AddBannerSchema = require('../validators/bannerValidator');
const { addBanner, getAllBanner, getBannerById, updateBanner, deleteBanner } = require('../controllers/bannerController');

router.post('/addBanner',auth,validate(AddBannerSchema,'body'),addBanner)
router.get('/allBanner',getAllBanner)
router.get('/banner/:id',auth,validate(idSchema,'params'),getBannerById)
router.patch('/updateBanner/:id',validate(idSchema,'params'),auth,updateBanner)
router.delete('/deleteBanner/:id',auth,validate(idSchema,'params'),deleteBanner)

 

module.exports = router