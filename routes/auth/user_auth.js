const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' })
const JWT_SECRET = process.env.JWT_SECRET

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({ 'error': 'access rejected!' });
        return;
    }
    try {
        const decodetoken = jwt.verify(token, JWT_SECRET);
        req.staff = decodetoken;
        next();
    } catch (error) {
        res.status(404).json({ 'error': 'wrong token' });
    }
}