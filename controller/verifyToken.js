const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.cookies.token || req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
        
        req.user = decoded;
        const currentUser = req.user;
        console.log(currentUser);
        res.json({ currentUser , message:"current user" });
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token',});
    }
}

module.exports = { verifyToken };
