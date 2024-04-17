const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
    Subject: {
        type: String,
        required: true
    },
    Answer: {
        type: String,
        required: true
    },
    Categories: {
        type: [String],
        default: []
    },
    IsDeleted: {
        type: Boolean,
        default: false
    },
    IsEnabled: {
        type: Boolean,
        default: true
    },
    CreatedDate: {
        type: Date,
        default: Date.now
    },
    UpdatedDate: {
        type: Date,
        default: Date.now
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    UpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = FAQ;
