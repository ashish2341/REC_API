const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { getRecordsSchema, idSchema } = require('../validators/commonValidator');
const testimonialValidationSchema = require('../validators/testimonialValidator');
const { addTestimonial, getAllTestimonial, getTestimonialById, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController');

router.post('/addTestimonial',auth,validate(testimonialValidationSchema,'body'),addTestimonial)
router.get('/allTestimonial',auth,validate(getRecordsSchema,'query'),getAllTestimonial)
router.get('/testimonial/:id',auth,validate(idSchema,'params'),getTestimonialById)
router.patch('/updateTestimonial/:id',validate(idSchema,'params'),auth,updateTestimonial)
router.delete('/deleteTestimonial/:id',auth,validate(idSchema,'params'),deleteTestimonial)

 

module.exports = router