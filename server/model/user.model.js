const { Schema, model } = require("mongoose");


// user schema
const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false // Excludes the password field from query results
    },
    googleId: String
}, {
    versionKey: false
});

// google user schema
const googleUserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true,
        unique: true
    },
    googleId: String
}, {
    versionKey: false
});

// user model
const UserModel = model("User", userSchema);
const GoogleUser = model("GUser", googleUserSchema);

module.exports = { UserModel, GoogleUser };