const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    Token: {
        type: String,
        required: true,
    },
    CreatedDate: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

module.exports = mongoose.model("Token", tokenSchema);