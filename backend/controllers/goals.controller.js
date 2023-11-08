// import { scorecard } from "../models/scorecard.model.js";
import { User } from "../models/user.model.js";
import { errorHandler } from "../errors/error.js";


export const getGoals = async (request, response, next) => {
    const userID = request.params.userID;

    if (request.user.id !== userID.toString()) {
        return response.status(403).send({
            success: false,
            error: "Access denied. You can only view your own goals."
        });
    }

    try {
        const user = await User.findById(userID).select("goals");
        if (!user) {
            return response.status(404).send({
                success: false,
                error: "User not found."
            });
        }

        response.status(200).send({
            success: true,
            goals: user.goals
        });
    } catch (error) {
        next(error);
    }
};

export const createGoal = async (request, response) => {
    const userID = request.params.userID;
    const newGoal = request.body;

    if (request.user.id !== userID.toString()) {
        return response.status(403).send({
            success: false,
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
            success: true,
            message: "Goal added successfully!"
        });
    } catch (error) {
        next(error);
    }
};

export const deleteGoal = async (request, response, next) => {
    const userID = request.params.userID;
    const goalID = request.params.goalID;

    if (request.user.id !== userID.toString()) {
        return response.status(403).send({
            success: false,
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
            success: true,
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