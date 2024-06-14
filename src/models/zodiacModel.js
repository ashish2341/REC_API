 
const mongoose = require('mongoose');

const zodiacSchema = new mongoose.Schema({
    Name: String,
    MobileNumber: Number,
    DateOfBirth: Date,
    CreatedDate: {
        type: Date,
        default: Date.now
    }
    
});

const zodiac = mongoose.model('Zodiac', zodiacSchema);

module.exports = zodiac;
