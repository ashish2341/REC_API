const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    MemberName: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Designation: {
        type: String,
        required: true
    },
    IsEnabled: {
        type: Boolean,
        default: true
    },
    IsDeleted: {
        type: Boolean,
        default: false
    },
    Image: {
        type: String,
        required: true
    }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
