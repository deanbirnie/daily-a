import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const { Schema } = mongoose;

const scorecardSchema = new Schema({
    date: Date,
    goalSelected: [{
        goalID: { type: ObjectId, ref: 'User.goals' },
        value: Number
    }],
    userID: {type: ObjectId, ref: 'User'}
},
{
    timestamps: true
});

export const scorecard = mongoose.model('scorecards', scorecardSchema);
