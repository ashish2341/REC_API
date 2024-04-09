const mongoose = require('mongoose')
const validator = require('validator')
const constants = require('../helper/constants')
 

const userSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        trim: true
    },
    LastName: {
        type: String,
        trim: true
    },
    Age: Number,
    Gender: {
        type: String,
        enum: ['Male', "Female", "Other"]
    },
    Mobile: {
        type: String,
        required: true
    },
    Phone: String,
    Area: String,
    City: String,
    State: String,
    Country: String,
    PinCode: String,
    RoleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },

    IsEnabled: {
        type: Boolean,
        default: true
    },
    IsDeleted: {
        type: Boolean,
        default: false
    },
    ProfilePhoto: String,

    EmailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw { message: constants.model.user.email_invalid }
            }
        }
    },

},)

const User = mongoose.model('User', userSchema)

module.exports = User