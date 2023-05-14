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
    }
}, {
    versionKey: false
});

// user model
const UserModel = model("User", userSchema);

module.exports = UserModel;