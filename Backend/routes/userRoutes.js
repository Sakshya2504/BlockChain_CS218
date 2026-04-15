import express from "express";
import multer from "multer";

// 🔹 Import controller functions
import {
    registerUser,
    getUser,
    getPendingUsers,
    verifyUser,
    revokeUser,
} from "../controllers/userController.js";

const router = express.Router();

// ===============================
// 🔹 MULTER SETUP (IMPORTANT)
// ===============================

// 🔹 Store file in memory (not disk)
const storage = multer.memoryStorage();

const upload = multer({ storage });

// ===============================
// 🔹 ROUTES
// ===============================

// 📌 Register user (with file upload)
router.post("/register", upload.single("file"), registerUser);

// 📌 Get user by wallet address
router.get("/user/:address", getUser);

// 📌 Get all pending users
router.get("/pending-users", getPendingUsers);

// 📌 Verify user
router.post("/verify", verifyUser);

// 📌 Revoke user
router.post("/revoke", revokeUser);

export default router;