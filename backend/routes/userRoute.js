import express from "express";
import { registerUser } from "../controllers/userSignUp.controller.js";
import { test } from "../controllers/test.controller.js";


const userRouter = express.Router();

userRouter.get('/test', test);

// route to register a new user, username and email must be unique, password hashed
userRouter.post('/sign-up', registerUser);

export default userRouter;