const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../helper/config')

const loginSchema = mongoose.Schema({
    Mobile: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    Password: {
        type: String,
        required: true,
        trim: true,
    },
    UserId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}
    })

loginSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('Password')) {
        user.Password = await bcrypt.hash(user.Password, 8)
    }
    
    next()
})

loginSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000 && error.errmsg.indexOf('dup key') > -1) {
        next({ message: Object.keys(error.keyPattern)[0] + ' is already in use' });
    }
    else if (error.errors && error.errors.role && error.errors.role.properties && error.errors.role.properties.message) {
        next({ message: error.errors.role.properties.message });
    }
    else {
        next(error);
    }
});

loginSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({ _id: user._id }, config.JWT_KEY)
    user.token = token;
    await user.save()
    return token
}

 

const Login = mongoose.model('Login', loginSchema)

module.exports = Login