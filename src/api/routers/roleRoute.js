const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
 
 
const auth = require('../middleware/auth');
const { roleSchema, idRoleSchema } = require('../validators/authValidator');
const { addRole, getAllRole, updateRole, deleteRole } = require('../controllers/roleController');

router.post('/addRole',auth,validate(roleSchema,'body'),addRole)
router.get('/allRole',auth,getAllRole)
router.patch('/updateRole/:id',auth,validate(idRoleSchema,'params'),updateRole)
router.delete('/deleteRole/:id',auth,validate(idRoleSchema,'params'),deleteRole)
 

module.exports = router