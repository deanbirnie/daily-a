import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../app.config.js";
import { errorHandler } from '../errors/error.js';


export const registerUser = async (request, response, next) => {
    const { username, email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        passwordHash: hashedPassword
    });
    try{
        await newUser.save();
        response.status(201).json('User successfully registered.');
    } catch (error) {
        next(error);
    }
};

export const signIn = async (request, response, next) => {
    const { email, password } = request.body;
    try {
        
        const isValidUser = await User.findOne({ email });
        if (!isValidUser) return next(errorHandler(404, 'User not found.'));
        const isValidPassword = bcrypt.compareSync(password, isValidUser.passwordHash);
        if (!isValidPassword) return next(errorHandler(401, 'Incorrect email or password.'));
        const userToken = jwt.sign({ id: isValidUser._id.toString() }, JWT_SECRET);
        // destructuring to remove password hash so it is not returned in response
        const { passwordHash: passwdHash, ...userInfo } = isValidUser._doc;
        response
            .cookie("access_token", userToken, { httpOnly: true })
            .status(200)
            .json(userInfo);
    } catch (error) {
        next(error);
    }
};

export const signOut = async (request, response, next) => {
    try {
        response.clearCookie('access_token');
        response.status(200).json("User has been logged out.");
    } catch (error) {
        next(error);
    }
};
