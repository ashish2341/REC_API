const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()

const { registerSchema ,loginSchema,sendOtpSchema,verifyOtpSchema, forgetSchema}  = require('../validators/authValidator');
const { validate } = require('../../helper/customValidation');
 const {uploadSingleFile} = require('../../helper/imgUpload')

router.post('/register',validate(registerSchema,'body'),authController.register)
router.post('/forgetPassword',validate(forgetSchema,'body'),authController.forgetPassword)
router.post('/login',validate(loginSchema,'body'),authController.login)
router.post('/sendOtp',validate(sendOtpSchema,'body'),authController.sendOtp)
router.post('/verifyOtp',validate(verifyOtpSchema,'body'),authController.verifyOtp)
router.post('/upload',uploadSingleFile.single('profilePic'),authController.uploadSingleImage)
router.post('/uploadMultipleFiles',uploadSingleFile.array('mutipleFiles'),authController.uploadMultipleFile)
 
 

module.exports = router