const express = require('express')
 
const router = express.Router()

 
const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { getRecordsSchema, idSchema } = require('../validators/commonValidator');
const { getUserById, getAllUser, updateUser, deleteUser } = require('../controllers/userController');
const validateRole = require('../middleware/role');

router.get('/allUser',auth,validate(getRecordsSchema,'query'),validateRole(["Admin"]),getAllUser)
router.get('/user/:id',auth,validate(idSchema,'params'),validateRole(["Admin"]),getUserById)
router.patch('/updateUser/:id',validate(idSchema,'params'),auth,validateRole(["Admin"]),updateUser)
router.delete('/deleteUser/:id',auth,validate(idSchema,'params'),validateRole(["Admin"]),deleteUser)

module.exports = router