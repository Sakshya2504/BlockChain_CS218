import User from "../models/User.js";
import crypto from "crypto";

// ===============================
// 🔹 REGISTER USER
// ===============================
export const registerUser = async (req, res) => {
    try {
        const { name, email, walletAddress } = req.body;

        // 🔹 Check if file exists
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // 🔹 Generate hash of file (identity proof)
        const fileBuffer = req.file.buffer;

        const hash = crypto
            .createHash("sha256")
            .update(fileBuffer)
            .digest("hex");

        // 🔹 Check if user already exists
        const existingUser = await User.findOne({ walletAddress });

        if (existingUser) {
            return res.status(400).json({ message: "User already registered" });
        }

        // 🔹 Create new user
        const newUser = new User({
            name,
            email,
            walletAddress,
            document: req.file.originalname, // file name
            hash,
            status: "Pending",
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            hash, // 🔹 send hash to frontend (for blockchain)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// ===============================
// 🔹 GET USER BY WALLET
// ===============================
export const getUser = async (req, res) => {
    try {
        const { address } = req.params;

        const user = await User.findOne({ walletAddress: address });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// ===============================
// 🔹 GET PENDING USERS
// ===============================
export const getPendingUsers = async (req, res) => {
    try {
        const users = await User.find({ status: "Pending" });

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// ===============================
// 🔹 VERIFY USER
// ===============================
export const verifyUser = async (req, res) => {
    try {
        const { address } = req.body;

        const user = await User.findOne({ walletAddress: address });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.status = "Verified";
        user.verifiedBy = "Verifier"; // later replace with wallet

        await user.save();

        res.json({ message: "User verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// ===============================
// 🔹 REVOKE USER
// ===============================
export const revokeUser = async (req, res) => {
    try {
        const { address } = req.body;

        const user = await User.findOne({ walletAddress: address });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.status = "Revoked";

        await user.save();

        res.json({ message: "User revoked successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};