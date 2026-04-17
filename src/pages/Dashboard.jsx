import { useState, useEffect } from "react";
import { getUser } from "../services/api";
import { getCurrentWallet } from "../services/blockchain";

function Dashboard() {
    // State
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wallet, setWallet] = useState(null);

    // Fetch user data
    const fetchUser = async () => {
        try {
            setLoading(true);

            // Get wallet from MetaMask
            const walletAddress = await getCurrentWallet();

            if (!walletAddress) {
                setUser(null);
                setWallet(null);
                return;
            }

            setWallet(walletAddress);

            // Fetch from backend
            const res = await getUser(walletAddress);

            setUser(res.data);
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Run on load
    useEffect(() => {
        fetchUser();
    }, []);

    // Refresh
    const refreshStatus = () => {
        fetchUser();
    };

    // Status color
    const getStatusColor = (status) => {
        switch (status) {
            case "Verified":
                return "bg-green-500";
            case "Pending":
                return "bg-yellow-500";
            case "Revoked":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    // Format wallet
    const formatAddress = (addr) => {
        return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">

            {/* Title */}
            <h1 className="text-3xl font-bold mb-6 text-center">
                User Dashboard
            </h1>

            {/* Loading */}
            {loading ? (
                <p className="text-center text-gray-400">Loading...</p>
            ) : !wallet ? (
                <p className="text-center text-red-400">
                    ❌ Please connect your wallet
                </p>
            ) : user ? (

                <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6">

                    {/* Wallet */}
                    <div>
                        <h2 className="text-lg text-gray-400">Wallet Address</h2>
                        <p className="text-blue-400 break-all">
                            {formatAddress(wallet)}
                        </p>
                    </div>

                    {/* Status */}
                    <div>
                        <h2 className="text-lg text-gray-400 mb-2">
                            Verification Status
                        </h2>

                        <span
                            className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                user.status
                            )}`}
                        >
                            {user.status}
                        </span>
                    </div>

                    {/* Hash */}
                    <div>
                        <h2 className="text-lg text-gray-400">Identity Hash</h2>
                        <p className="text-purple-400 break-all">
                            {user.hash}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 mt-4">

                        <button
                            onClick={refreshStatus}
                            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition"
                        >
                            Refresh Status
                        </button>

                        <button
                            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition"
                        >
                            Update Identity
                        </button>
                    </div>
                </div>

            ) : (
                <p className="text-center text-yellow-400">
                    ⚠️ No identity found. Please register first.
                </p>
            )}

            {/* Info */}
            <div className="max-w-4xl mx-auto mt-8 text-gray-400 text-sm text-center">
                <p>
                    Your identity is securely stored using blockchain technology. Only the
                    hash of your document is stored on-chain to ensure privacy.
                </p>
            </div>
        </div>
    );
}

export default Dashboard;