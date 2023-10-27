import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
// import { check, validationResult } from "express-validator";


export const registerUser = async (request, response) => {
    try {
        const { username, email, password } = request.body;
        if (
            !username ||
            !email ||
            !password
        ) {
            return response.status(400).send({
                error: 'Required field missing, please provide username, email and password.'
            })
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            passwordHash: hashedPassword
        });

        await newUser.save();
        
        return response.status(201).send({ message: 'Successfully registered. Please log in.' });
    } catch (error) {
        if (error.code && error.code === 11000) { // Check for duplication error
            if (error.keyPattern && error.keyPattern.username) {
                return response.status(400).send({ error: "Username already taken." });
            }
            if (error.keyPattern && error.keyPattern.email) {
                return response.status(400).send({ error: "Email address already registered. Use 'reset password' if you are unable to login." });
            }
        }
        console.log(error.message);
        response.status(500).send({error: error.message});
    }
};