const { Schema, model } = require("mongoose");


// user schema
const blacklistSchema = Schema({
    blacklistToken: {
        type: String
    }
}, {
    versionKey: false
});

// user model
const BlacklistedToken = model("BlacklistToken", blacklistSchema);

module.exports = BlacklistedToken;