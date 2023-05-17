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
        default: "",
        select: false // Excludes the password field from query results
    },
    photoURL: {
        type: String,
        default: ''
    }
}, {
    versionKey: false
});


const UserModel = model("User", userSchema);


module.exports = { UserModel };