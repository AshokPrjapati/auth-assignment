const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require("../model/user.model");
const { comparePassword } = require('../utils/bcryptUtils');
require("dotenv").config();

// Configure Local Strategy
const localOptions = {
    usernameField: 'email',
    passwordField: 'password',
};

passport.use(new LocalStrategy(localOptions, async (email, password, done) => {

    try {
        // Find the user by email
        const user = await UserModel.findOne({ email }).select('password');
        // If user does not exist, return error
        if (!user) {
            // done(error, user, info);
            return done(null, false, { message: 'User does not exists' });
        }


        // Check if the password is correct
        let isMatch;
        try {
            isMatch = await comparePassword(password, user.password);
        } catch (error) {
            console.log(error);
            return done(error, false, { message: "Internal server error" });
        }

        // If password is incorrect, return error
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password' });
        }

        // Authentication successful, return the user object
        return done(null, user);
    } catch (error) {
        return done(error, false, { message: "Internal server error" });
    }
}));

module.exports = passport;