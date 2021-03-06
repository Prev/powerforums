const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization !== undefined) {
            // If authorization header does exist.
            var authHeader = req.headers.authorization.split(" ");

            if (authHeader[1] !== undefined) {
                // If authorization header is well formed.
                const token = authHeader[1];
                const decoded = jwt.verify(token, global.JWT_KEY);
                res.locals.userData = new User(decoded);
                next();
            } else {
                // If authorization header is not well formed.
                throw "Authorization header was not well formed.";
            }
        } else {
            // If no authorization header was found in the http request,
            // it means user is guest. Guest permission will be added at checkPermission.
            next();
        }

    } catch (error) {
        // An error occured. Return a 401 response, don't be too verbose about the error...
        return res.status(401).json({ message: 'Authentication failed.' });
    }
}