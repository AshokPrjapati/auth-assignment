const express = require('express');
const authRouter = express.Router();
const { login, logout, register } = require("../controller/auth.controller");
const { authenticate } = require("../middleware/auth.middleware");
const passport = require('passport');

// Login route
authRouter.post('/login', login);

// Logout route
authRouter.post('/logout', authenticate, logout);

// Register route
authRouter.post('/register', register);

// Routes for authentication
authRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }));

authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect or respond with data as needed
        res.status(200).send({ message: "login Success" });
    }
);

module.exports = authRouter;