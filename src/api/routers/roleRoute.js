const express = require('express')
 
const router = express.Router()
const { validate } = require('../../helper/customValidation');
 
 
const auth = require('../middleware/auth');
const { roleSchema} = require('../validators/authValidator');
const { addRole, getAllRole, updateRole, deleteRole } = require('../controllers/roleController');
const { idSchema } = require('../validators/commonValidator');

router.post('/addRole',auth,validate(roleSchema,'body'),addRole)
router.get('/allRole',auth,getAllRole)
router.patch('/updateRole/:id',auth,validate(idSchema,'params'),updateRole)
router.delete('/deleteRole/:id',auth,validate(idSchema,'params'),deleteRole)
 

module.exports = router