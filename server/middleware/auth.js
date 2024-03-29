const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Middleware function is basically a function that has access to the request and response cycle or the objects in response objects
    // Get the token from header

    const token = req.header('x-auth-token');
    
    // Check if not token

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify the token

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}