import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../app.config.js';

export const tokenVerification = (req, res, next) => {
    // Accessing the token from cookies
    const token = req.cookies['access_token'];
    
    // Check if the token exists
    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded Token: ", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ error: 'Invalid token.' });
    }
};

// export default tokenVerification;
