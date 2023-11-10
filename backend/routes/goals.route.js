import express from "express";
import {
  getGoals,
  createGoal,
  deleteGoal,
  getGoal,
  updateGoal,
} from "../controllers/goals.controller.js";
import { tokenVerification } from "../verification/user.verify.js";

const router = express.Router();

router.get("/get-goals/:userID", tokenVerification, getGoals); // used for viewing all goals by category
router.post("/create-goal/:userID", tokenVerification, createGoal);
router.delete("/delete-goal/:userID/:goalID", tokenVerification, deleteGoal);
router.get("/get-goal/:userID/:goalID", tokenVerification, getGoal); // used for viewing a single goal
router.post("/update-goal/:userID/:goalID", tokenVerification, updateGoal);

export default router;
