import mongoose from "mongoose";
const { Schema } = mongoose;

const scorecardSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        scorecard: [{
            goal: {
                type: Schema.Types.ObjectId,
                ref: 'Goal'
            },
            score: {
                type: Number,
                required: true
            }
        }]
    }
);

export const UserScorecard = mongoose.model('UserScorecard', scorecardSchema);
