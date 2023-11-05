import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../app.config.js";
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

export const signIn = async (request, response) => {
    const { email, password } = request.body;
    try {
        if (!email ||
            !password
        ) {
            return response.status(400).send({
                error: "Required field missing."
            })
        };
        const isValidUser = await User.findOne({ email });
        if (!isValidUser) return response.status(400).send({
            error: "Incorrect user credentials."
        });
        const isValidPassword = bcrypt.compareSync(password, isValidUser.passwordHash);
        if (!isValidPassword) return response.status(400).send({
            error: "Incorrect user credentials."
        });
        const userToken = jwt.sign({ id: isValidUser._id.toString() }, JWT_SECRET);
        // destructuring to remove password hash so it is not returned in response
        const { passwordHash: passwdHash, ...userInfo } = isValidUser._doc;
        response
            .cookie("access_token", userToken, { httpOnly: true })
            .status(200)
            .json(userInfo);
    } catch (error) {
        response.status(500).send({error: "Unable to sign you in."});
        console.log(error.message);
        response.status(500).send({error: error.message});
    }
};

export const signOut = async (request, response) => {
    try {
        response.clearCookie("access_token");
        response.status(200).json("User has been logged out.");
    } catch (error) {
        response.status(500).send({error: "An error has occurred."});
        console.log(error.message);
        response.status(500).send({error: error.message});
    }
};
