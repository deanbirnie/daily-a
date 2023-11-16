import jwt from 'jsonwebtoken';
import { errorHandler } from "../errors/error.js";

export const tokenVerification = (request, response, next) => {
    // Accessing the token from cookies
    const token = request.cookies['access_token'];
    
    // Check if the token exists
    if (!token) {
        return next(errorHandler(401, 'Unauthorised'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded Token: ", decoded);
        request.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};
