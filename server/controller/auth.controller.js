const passport = require('passport');
const UserModel = require('../model/user.model');
const { generateToken } = require("../utils/jwtUtils");
const bcrypt = require('bcrypt');
const { hashPassword } = require('../utils/bcryptUtils');
const BlacklistedToken = require('../model/blacklistToken.model');

module.exports = {

    // Controller function for user registration
    register: async (req, res) => {
        let { email, password } = req.body;
        try {
            // Check if the user already exists
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }
            try {
                let hashedPassword = await hashPassword(password);
                console.log(hashedPassword)
                req.body.password = hashedPassword;
            } catch (error) {
                console.log(error)
                return res.status(500).send({ message: "something went wrong" })
            }

            // Create a new user
            const newUser = new UserModel(req.body);
            await newUser.save();

            // Generate JWT token
            const token = generateToken({ id: newUser._id, email });

            // Send the token in the response
            res.json({ token, message: "register succesfull" });
        } catch (error) {
            // Handle error
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    // Controller function for user login
    login: (req, res, next) => {
        const { email } = req.body;
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                // Handle authentication error
                return res.status(401).json({ error: info });
            }

            if (!user) {
                // Authentication failed
                return res.status(401).json({ error: info });
            }

            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                // Generate JWT token
                const token = generateToken({ id: user._id, email });
                // Send the token in the response
                return res.json({ token })
            });

        })(req, res, next);
    },

    // Controller function for user logout

    logout: (req, res) => {
        // Get the token from the request headers
        const token = req.headers.authorization.split(' ')[1];

        // Verify the token to check if it's valid and not expired
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                // Token verification failed, return an error response
                return res.status(401).json({ message: 'Invalid or expired token' });
            }

            // Token is valid, proceed with session destruction and blacklisting
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ message: 'Failed to destroy session' });
                }

                // Create a new entry in the blacklist collection with the token
                const blacklistedToken = new BlacklistedToken({ token });
                blacklistedToken.save((err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Failed to blacklist token' });
                    }

                    return res.json({ message: 'Logout successful' });
                });
            });
        });
    }
}