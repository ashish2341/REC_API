const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { idSchema } = require('../validators/commonValidator');
const faqValidationSchema = require('../validators/faqValidator');
const { addFAQ, getAllFAQ, getFAQById, updateFAQ, deleteFAQ } = require('../controllers/faqController');

router.post('/addFAQ',auth,validate(faqValidationSchema,'body'),addFAQ)
router.get('/allFAQ',getAllFAQ)
router.get('/:id',auth,validate(idSchema,'params'),getFAQById)
router.patch('/updateFAQ/:id',validate(idSchema,'params'),auth,updateFAQ)
router.delete('/deleteFAQ/:id',auth,validate(idSchema,'params'),deleteFAQ)

 

module.exports = router