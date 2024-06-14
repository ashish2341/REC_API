const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { getRecordsSchema} = require('../validators/commonValidator');
const { AddZodiacSchema } = require('../validators/zodiacValidator');
const { addZodiac, getAllZodiac } = require('../controllers/zodiacController');

router.post('/addZodiac',auth,validate(AddZodiacSchema,'body'),addZodiac)
router.get('/allZodiac',validate(getRecordsSchema,'query'),getAllZodiac)


 

module.exports = router