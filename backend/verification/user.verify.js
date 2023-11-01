import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../app.config.js";


export const tokenVerification = (request, response) => {
    const token = request.cookies.access_token;

    if (!token) return response.status(401).send({error: "Unauthorized"});

    jwt.verify(token, JWT_SECRET, (error, user) => {
        if (error) return response.status(403).send({error: "Forbidden"});
        request.user = user;
    });
};