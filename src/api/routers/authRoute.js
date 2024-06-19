const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()

const { registerSchema ,loginSchema,sendOtpSchema,verifyOtpSchema, forgetSchema, imageSchema}  = require('../validators/authValidator');
const { validate } = require('../../helper/customValidation');
 const {uploadSingleFile,handleFileUpload} = require('../../helper/imgUpload')

router.post('/register',validate(registerSchema,'body'),authController.register)
router.post('/forgetPassword',validate(forgetSchema,'body'),authController.forgetPassword)
router.post('/login',validate(loginSchema,'body'),authController.login)
router.post('/sendOtp',validate(sendOtpSchema,'body'),authController.sendOtp)
router.post('/verifyOtp',validate(verifyOtpSchema,'body'),authController.verifyOtp)
router.post('/upload',handleFileUpload(uploadSingleFile.single('profilePic')),validate(imageSchema,'body'),authController.uploadSingleImage)
router.post('/uploadMultipleFiles', handleFileUpload(uploadSingleFile.array('multipleFiles')),authController.uploadMultipleFile)
router.post('/emailSendForForget',authController.sendMailforFogetPassword)
router.post('/reset/:userId/:token',authController.resetPassword)
 

module.exports = router