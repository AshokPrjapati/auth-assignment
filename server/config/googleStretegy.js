const passport = require('passport');
const { UserModel } = require('../model/user.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            let { name, picture, email } = profile._json;
            let user = await UserModel.findOne({ email });
            // if user not exists - create new one
            if (!user) {
                const newUser = {
                    name, photoURL: picture, email
                }
                user = new UserModel(newUser);
                await user.save();
                return done(null, newUser);
            }
            // exists
            return cb(null, user);
        } catch (error) {
            return cb(error, null);
        }
    }
));


// Serialize and deserialize user objects to/from the session
passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id).exec();
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
