import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../app.config.js';
import { errorHandler } from "../errors/error.js";

export const tokenVerification = (request, response, next) => {
    // Accessing the token from cookies
    const token = request.cookies['access_token'];
    
    // Check if the token exists
    if (!token) {
        return next(errorHandler(401, 'Unauthorised'));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log("Decoded Token: ", decoded);
        request.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};

// export default tokenVerification;
