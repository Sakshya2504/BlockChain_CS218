import mongoose from "mongoose";

// Define User Schema
const userSchema = new mongoose.Schema(
    {
        // Basic Info
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        // Wallet Address (unique identity)
        walletAddress: {
            type: String,
            required: true,
            unique: true, // no duplicate users
        },

        // Uploaded document (file name or path)
        document: {
            type: String,
            required: true,
        },

        // Hash of document (stored on blockchain)
        hash: {
            type: String,
            required: true,
        },

        // Verification status
        status: {
            type: String,
            enum: ["Pending", "Verified", "Revoked"],
            default: "Pending",
        },

        // Who verified the user (optional)
        verifiedBy: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true, // adds createdAt & updatedAt
    }
);

// Create Model
const User = mongoose.model("User", userSchema);

export default User;