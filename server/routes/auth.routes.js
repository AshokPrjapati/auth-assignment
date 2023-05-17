const express = require('express');
const authRouter = express.Router();
const { login, logout, register } = require("../controller/auth.controller");
const { authenticate } = require("../middleware/auth.middleware");
const passport = require('passport');

// Login route
authRouter.post('/login', login);

// login success route
authRouter.get('/status', (req, res) => {

    if (req.isAuthenticated()) {
        if (req.user) {
            return res.status(200).json({ error: false, isAuthenticated: true, user: req.user })
        }
        return res.status(500).json({ message: "issue with server" });
    }
    res.status(401).send({ error: "unauthorize", isAuthenticated: false });

})

// login failed route
authRouter.post('/login/failed', (req, res) => {
    res.status(401).json({ error: true, message: "log in failure" });
});

// Logout route
authRouter.post('/logout', logout);

// Register route
authRouter.post('/register', register);

// Routes for google authentication
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback',
    passport.authenticate('google',
        {
            successRedirect: process.env.CLIENT_URL,
            failureRedirect: "/login/failed"
        }
    ),

);

module.exports = authRouter;