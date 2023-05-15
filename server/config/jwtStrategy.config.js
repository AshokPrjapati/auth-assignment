const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { UserModel } = require("../model/user.model");
require("dotenv").config();

// Configure JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

//JwtStrategy is responsible for verifying the authenticity and validity of a token

passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
        try {
            // Find the user based on the JWT payload
            const user = await UserModel.findOne({ email: payload.email });
            // If user not found, return false
            if (!user) {
                return done(null, false, { message: 'User not exists' });
            }
            // If user is found, return the user
            done(null, user);
        } catch (error) {
            console.log(error)
            done(error, false);
        }
    })
);

module.exports = passport;