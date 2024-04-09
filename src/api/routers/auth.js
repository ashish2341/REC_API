const express = require('express')
const User = require('../../models/user')
const authController = require('../controllers/authController')
const router = express.Router()
const auth = require('../middleware/auth')
const constants = require('../../helper/constants')

const { celebrate, Joi } = require('celebrate');

router.post('/api/auth/register', celebrate({
    body: Joi.object({
        first_name: Joi.string().error(new Error('First Name is required')),
        last_name: Joi.string().error(new Error('Last Name is required')),
        email: Joi.string().required().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).error((errors) => {
            for (err of errors) {
              switch (err.code) {
                case ('string.empty'): {
                  return new Error('Email is required')
                }
                case 'string.pattern.base': {
                  return new Error('Email should be valid')
                }
                default: {
                  return new Error(err.code)
                }
              }
            }
          }),
        password: Joi.string().required().min(8).error((errors) => {
            for (err of errors) {
              switch (err.code) {
                case ('string.empty'): {
                  return new Error('Password is required')
                }
                case 'string.min':
                case 'string.max':
                case 'string.pattern.base': {
                  return new Error('Password should be minimum 8 characters')
                }
                default: {
                  return new Error(err.code)
                }
              }
            }
          }),
        role: Joi.string(),
        device_id: Joi.string().allow(''),
        device_token: Joi.string().allow(''),
        device_type: Joi.string().allow(''),
        mobile_number: Joi.string().regex(/[0-9]+/).min(10).max(10).error((errors) => {
            for (err of errors) {
              switch (err.code) {
                case ('string.empty'): {
                  return new Error('Phone number is required')
                }
                case 'string.min':
                case 'string.max':
                case 'string.pattern.base': {
                  return new Error('Mobile number should be 10 digit numeric value')
                }
                default: {
                  return new Error(err.code)
                }
              }
            }
          }),
        device_ip: Joi.string().allow(''),
        fb_id: Joi.string().allow(''),
        is_seller: Joi.string().default('no'),
        gmail_id: Joi.string().allow('')
    }),
}), async (req, res) => {
    authController.register(req, res);
})

 

module.exports = router