const mongoose = require('mongoose');


const bannerSchema = new mongoose.Schema({
    BannerName:String,
    Url:String,
    IsEnabled: {
        type: Boolean,
        default: true
    },
    IsDeleted: {
        type: Boolean,
        default: false
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    UpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
