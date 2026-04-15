import axios from "axios";

// 🔹 Create axios instance (base config)
const API = axios.create({
    baseURL: "http://localhost:5000", // 🔹 backend URL
});

// ===============================
// 🔹 USER APIs
// ===============================

// 📌 Register user (with file upload)
export const registerUser = (formData) => {
    return API.post("/register", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// 📌 Get user details by wallet address
export const getUser = (address) => {
    return API.get(`/user/${address}`);
};

// ===============================
// 🔹 VERIFIER APIs
// ===============================

// 📌 Get all pending users
export const getPendingUsers = () => {
    return API.get("/pending-users");
};

// 📌 Verify user
export const verifyUser = (address) => {
    return API.post("/verify", { address });
};

// 📌 Revoke user
export const revokeUser = (address) => {
    return API.post("/revoke", { address });
};