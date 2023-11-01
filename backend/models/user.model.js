import mongoose from "mongoose";
const { Schema } = mongoose;

const goalSchema = new Schema({
    category: String,
    title: String,
    description: String,
    unit: String,
    completionBool: Boolean
});

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        goals: [goalSchema]
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model('User', userSchema);
