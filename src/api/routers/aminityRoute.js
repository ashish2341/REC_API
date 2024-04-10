const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
const aminitySchema = require('../validators/aminityValidator');
const { addAminity } = require('../controllers/aminityController');
const auth = require('../middleware/auth');

router.post('/addAminity',auth,validate(aminitySchema),addAminity)

module.exports = router