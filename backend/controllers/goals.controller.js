// import { scorecard } from "../models/scorecard.model.js";
import { User } from "../models/user.model.js";


export const getGoals = async (request, response) => {
    const userID = request.params.userID;

    console.log("Token User ID: ", request.user.id);
    console.log("Param User ID: ", userID);

    if (request.user.id !== userID.toString()) {
        return response.status(403).send({
            error: "Access denied. You can only view your own goals."
        });
    }

    try {
        const user = await User.findById(userID).select("goals");
        if (!user) {
            return repsponse.status(404).send({
                error: "User not found."
            });
        }

        response.status(200).send({
            goals: user.goals
        });
    } catch (error) {
        response.status(500).send({
            error: "Error occurred while retrieving goals: " + error.message
        });
        console.log(error.message);
    }
};

export const createGoal = async (request, response) => {
    const userID = request.params.userID;
    const newGoal = request.body;

    console.log("Token User ID: ", request.user.id);
    console.log("Param User ID: ", userID);

    if (request.user.id !== userID.toString()) {
        return response.status(403).send({
            error: "Access denied. You can only update your own goals."
        });
    }

    try {
        await User.findByIdAndUpdate(
            userID,
            { $push: { goals: newGoal } },
            { new : true, useFindAndModify: false }
        );
        response.status(200).send({
            message: "Goal added successfully!"
        });
    } catch (error) {
        response.status(500).send({
            error: "Error occurred while adding goal: " + error.message
        });
        console.log(error.message);
    }
};

export const deleteGoal = async (request, response) => {
    const userID = request.params.userID;
    const goalID = request.params.goalID;

    console.log("Token User ID: ", request.user.id);
    console.log("Param User ID: ", userID);

    if (request.user.id !== userID.toString()) {
        return response.status(403).send({
            error: "Access denied. You can only delete your own goals."
        });
    }

    try {
        await User.findByIdAndUpdate(
            userID,
            { $pull: { goals: { _id: goalID } } },
            { new: true, useFindAndModify: false }
        );
        response.status(200).send({
            message: "Goal deleted successfully!"
        });
    } catch (error) {
        response.status(500).send({
            error: "Error occurred while deleting goal: " + error.message
        });
        console.log(error.message);
    }
};