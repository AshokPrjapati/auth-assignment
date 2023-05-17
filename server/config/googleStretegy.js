const passport = require('passport');
const { UserModel } = require('../model/user.model');
const { hashPassword } = require('../utils/bcryptUtils');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            let { picture, email } = profile._json;
            let password = await hashPassword(process.env.GUSER_PASS)
            let user = await UserModel.findOne({ email });
            // if user not exists - create new one
            if (!user) {
                const newUser = {
                    name: profile.displayName, photoURL: picture, email, password
                }
                user = new UserModel(newUser);
                await user.save();
                return cb(null, newUser);
            }
            // exists
            return cb(null, user);
        } catch (error) {
            return cb(error, null);
        }
    }
));

module.exports = passport;
