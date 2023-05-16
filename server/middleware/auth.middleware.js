const passport = require('passport');// Middleware to protect routes

// token based authentication middleware
exports.authenticate = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err) {
            // Handle authentication error
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!user) {
            // No user found, authentication failed
            return res.status(401).json({ error: 'User does not exists' });
        }

        // User authenticated, store user object in request
        req.user = user;
        next();
    })(req, res, next);
};

// session based Middleware to check if the user is logged in
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        // User is logged in, proceed to the next middleware
        return next();
    }
    res.status(401).send({ message: "login first" });
};