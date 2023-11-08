// import { scorecard } from "../models/scorecard.model.js";
import { User } from "../models/user.model.js";
import { errorHandler } from "../errors/error.js";


export const getGoals = async (request, response, next) => {
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
        next(error);
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
        next(error);
    }
};

export const deleteGoal = async (request, response, next) => {
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
        next(error);
    }
};

// export const updateGoal = async (request, response, next) => {
//     try {
        
//     } catch (error) {
//         next(error);
//     }
// };