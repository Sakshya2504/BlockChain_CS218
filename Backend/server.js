import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Import DB connection
import connectDB from "./config/db.js";

// Import routes
import userRoutes from "./routes/userRoutes.js";

// INITIAL SETUP

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// MIDDLEWARE

// Enable CORS (allow frontend to connect)
app.use(cors());

// Parse JSON data
app.use(express.json());

// ROUTES

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// User routes
app.use("/", userRoutes);

// ERROR HANDLER (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong" });
});

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});