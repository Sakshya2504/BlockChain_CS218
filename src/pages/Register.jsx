import { useState } from "react";
import { registerUser } from "../services/api";
import { getCurrentWallet, registerIdentity } from "../services/blockchain";

function Register() {
    // State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        file: null,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle file
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
        });
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get wallet
        const walletAddress = await getCurrentWallet();

        if (!walletAddress) {
            setMessage("❌ Please connect your wallet first");
            return;
        }

        // Validation
        if (!formData.name || !formData.email || !formData.file) {
            setMessage("❌ Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            // Prepare data
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("walletAddress", walletAddress);
            data.append("file", formData.file);

            // Backend call
            const res = await registerUser(data);

            const { hash } = res.data;

            // Blockchain call (important)
            await registerIdentity(hash);

            setMessage("✅ Identity registered on blockchain!");

            // Reset
            setFormData({
                name: "",
                email: "",
                file: null,
            });

        } catch (error) {
            console.error(error);
            setMessage("❌ Error submitting identity");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">

            <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-lg">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Register Identity
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-gray-400 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* File */}
                    <div>
                        <label className="block text-gray-400 mb-1">
                            Upload Document
                        </label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg font-semibold transition"
                    >
                        {loading ? "Submitting..." : "Register Identity"}
                    </button>
                </form>

                {/* Message */}
                {message && (
                    <p className="mt-4 text-center text-sm text-gray-300">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Register;