const express = require('express');
const authRouter = express.Router();
const { login, logout, register } = require("../controller/auth.controller");
const { authenticate } = require("../middleware/auth.middleware");

// Login route
authRouter.post('/login', login);

// Logout route
authRouter.post('/logout', authenticate, logout);

// Register route
authRouter.post('/register', register);

module.exports = authRouter;