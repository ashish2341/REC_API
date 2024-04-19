const mongoose = require('mongoose');
const { dbCollectionName } = require('../helper/constants');

const blogSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    CreatedDate: {
        type: Date,
        default: Date.now
    },
    Tags: [String],
    BlogType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: dbCollectionName.blogTypes
    },
    Images: [String],
    UpdatedDate: {
        type: Date,
        default: Date.now
    },
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

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
