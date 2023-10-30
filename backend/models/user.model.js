import mongoose from "mongoose";
const { Schema } = mongoose;

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
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model('User', userSchema);
