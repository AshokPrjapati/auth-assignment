const { Schema, model } = require("mongoose");

const userSchema = Schema({
    name: String,
    email: String,
    password: String
}, {
    versionKey: false
});

const UserModel = model("User", userSchema);

module.exports = UserModel;