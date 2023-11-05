import express from "express";
import { getGoals, createGoal, deleteGoal } from "../controllers/goals.controller.js";
import { tokenVerification } from "../verification/user.verify.js";

const router = express.Router();

router.get("/get-goals/:userID", tokenVerification, getGoals); // used for viewing all goals by category
router.post("/create-goal/:userID", tokenVerification, createGoal);
router.delete("/delete-goal/:userID/:goalID", tokenVerification, deleteGoal);

export default router;