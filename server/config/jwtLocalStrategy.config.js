const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require("../model/user.model");
require("dotenv").config();

// Configure Local Strategy
const localOptions = {
    usernameField: 'email',
    passwordField: 'password',
};

passport.use(new LocalStrategy(localOptions, async (email, password, done) => {
    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });

        // If user does not exist, return error
        if (!user) {
            // done(error, user, info);
            return done(null, false, { message: 'Incorrect email or password' });
        }

        // Check if the password is correct
        const isMatch = await user.comparePassword(password);

        // If password is incorrect, return error
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password' });
        }

        // Authentication successful, return the user object
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;