const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require("passport");
const connection = require("./config/db.config");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const { UserModel, GoogleUser } = require("./model/user.model");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('./config/localStrategy.config');
require('./config/jwtStrategy.config');
require("dotenv").config();


const app = express();

app.use(express.json());
app.use(cors());


// mongo store
const mongoStore = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    mongooseConnection: mongoose.connection,
});

// session middleware - provides a way to store and manage session data for each user session.
let sessionMiddleware = session({
    secret: process.env.SECRET_KEY, // any string, used for sign the session ID cookie

    // resave - session store on every request, even if the session data hasn't changed.
    resave: false, // resource-intensive so false

    // saveUninitialized: a new session should be created for each new visitor who hasn't yet established a session
    saveUninitialized: false, // can also result in empty sessions being stored in the session store so false

    // store - by default is server memory
    store: mongoStore // session data is stored in MongoDB
});

app.use(sessionMiddleware); // session creation, session ID generation, and session data storage

// Passport middleware
app.use(passport.initialize()); // sets up the framework for authentication
app.use(passport.session()); // works with express-session to enable session-based authentication with Passport.js.

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        console.log(profile)
        try {
            let user = await GoogleUser.findOne({ googleId: profile.id });

            if (!user) {
                user = new GoogleUser({ name: profile.displayName, googleId: profile.id, photo: profile._json.picture });
                await user.save();
            }

            return cb(null, user);
        } catch (error) {
            return cb(error, null);
        }
    }
));

// Routes
app.use('/auth', authRouter);


// Serialize and deserialize user objects to/from the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await GoogleUser.findById(id).exec();
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
// Start the server
const port = process.env.PORT || 8080;
app.listen(port, async () => {
    // Connect to MongoDB
    try {
        await connection;
        console.log("connected to mongoDB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running on port ${port}`);
});
