const express = require('express')
 
const router = express.Router()

const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { getRecordsSchema, idSchema } = require('../validators/commonValidator');
const blogSchema = require('../validators/blogValidator');
const { addBlog, getAllBlog, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');

router.post('/addBlog',auth,validate(blogSchema,'body'),addBlog)
router.get('/allBlog',auth,validate(getRecordsSchema,'query'),getAllBlog)
router.get('/:id',auth,validate(idSchema,'params'),getBlogById)
router.patch('/updateBlog/:id',validate(idSchema,'params'),auth,updateBlog)
router.delete('/deleteBlog/:id',auth,validate(idSchema,'params'),deleteBlog)

 

module.exports = router