const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/user.model');
const { generateToken } = require("../utils/jwtUtils");

module.exports = {

    // Controller function for user registration
    register: async (req, res) => {
        const { email } = req.body;
        try {
            // Check if the user already exists
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Create a new user
            const newUser = new User(req.body);
            await newUser.save();

            // Generate JWT token
            const token = generateToken({ id: newUser._id, email });

            // Send the token in the response
            res.json({ token });
        } catch (error) {
            // Handle error
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    // Controller function for user login
    login: (req, res) => {
        const { email } = req.body;
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err) {
                // Handle authentication error
                return res.status(401).json({ error: 'Unauthorized' });
            }

            if (!user) {
                // Authentication failed
                return res.status(401).json({ error: 'Unauthorized' });
            }

            // Generate JWT token
            const token = generateToken({ id: user._id, email });

            // Send the token in the response
            return res.json({ token });
        })(req, res);
    },

    // Controller function for user logout
    logout: (req, res) => {
        // Expire JWT token by setting an empty cookie with an expired date
        res.cookie('token', '', { expires: new Date(0) });
        res.json({ message: 'Logged out successfully' });
    }
}