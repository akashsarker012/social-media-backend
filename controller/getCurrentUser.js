// authMiddleware.js
const jwt = require('jsonwebtoken');

function getCurrentUser(req, res, next) {
    const token = req.cookies.token || req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
        req.user = decoded;
        // res.send(req.user);
        next();
        return(req.user);
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = { getCurrentUser };
