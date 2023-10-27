import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            unique: true
        }
    }
);

const goalSchema = new Schema(
    {
        name: {
            type: String,
            unique: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'categorySchema'            
        },
        unit: {
            type: String,
        }
    }
);

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
        categories: [categorySchema],
        goals: [goalSchema]
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model('User', userSchema);
