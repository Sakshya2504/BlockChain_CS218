import { useEffect, useState } from "react";
import { getPendingUsers, verifyUser, revokeUser } from "../services/api";
import { verifyIdentity, revokeIdentity } from "../services/blockchain";

function Verifier() {
    // 🔹 State
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(null); // track button loading

    // 🔹 Fetch users
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await getPendingUsers();
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // 🔹 Verify user
    const handleVerify = async (address) => {
        try {
            setActionLoading(address);

            // 🔥 Blockchain call
            await verifyIdentity(address);

            // 🔹 Backend update
            await verifyUser(address);

            fetchUsers();
        } catch (error) {
            console.error("Verify error:", error);
        } finally {
            setActionLoading(null);
        }
    };

    // 🔹 Revoke user
    const handleRevoke = async (address) => {
        try {
            setActionLoading(address);

            // 🔥 Blockchain call
            await revokeIdentity(address);

            // 🔹 Backend update
            await revokeUser(address);

            fetchUsers();
        } catch (error) {
            console.error("Revoke error:", error);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">

            <h1 className="text-3xl font-bold text-center mb-8">
                Verifier Panel
            </h1>

            <div className="max-w-6xl mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg">

                <h2 className="text-xl mb-4 text-gray-300">
                    Pending Verification Requests
                </h2>

                {/* Loading */}
                {loading && (
                    <p className="text-gray-400 text-center">Loading users...</p>
                )}

                {/* No Users */}
                {!loading && users.length === 0 && (
                    <p className="text-gray-500 text-center">
                        No pending users
                    </p>
                )}

                {/* Table */}
                {!loading && users.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border border-gray-700 rounded-lg overflow-hidden">

                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Wallet</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user, index) => (
                                    <tr
                                        key={index}
                                        className="border-t border-gray-700 hover:bg-gray-800 transition"
                                    >
                                        <td className="p-3">{user.name}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3 text-blue-400 break-all">
                                            {user.walletAddress}
                                        </td>

                                        <td className="p-3 flex gap-2 flex-wrap">

                                            {/* Verify */}
                                            <button
                                                onClick={() => handleVerify(user.walletAddress)}
                                                disabled={actionLoading === user.walletAddress}
                                                className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded-lg text-sm disabled:opacity-50"
                                            >
                                                {actionLoading === user.walletAddress ? "Processing..." : "Verify"}
                                            </button>

                                            {/* Revoke */}
                                            <button
                                                onClick={() => handleRevoke(user.walletAddress)}
                                                disabled={actionLoading === user.walletAddress}
                                                className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg text-sm disabled:opacity-50"
                                            >
                                                {actionLoading === user.walletAddress ? "Processing..." : "Revoke"}
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                )}
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">
                Only authorized verifiers can approve or revoke identities.
            </p>
        </div>
    );
}

export default Verifier;