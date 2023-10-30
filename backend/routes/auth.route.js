import express from "express";
import { registerUser, signIn, signOut } from "../controllers/auth.controller.js";
import { test } from "../controllers/test.controller.js";


const router = express.Router();

router.get("/test", test);

router.post("/sign-up", registerUser);
router.post("/sign-in", signIn);
router.get("/sign-out", signOut);

export default router;