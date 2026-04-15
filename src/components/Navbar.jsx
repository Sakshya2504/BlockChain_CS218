import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connectWallet, getCurrentWallet } from "../services/blockchain";

function Navbar() {
    // 🔹 State
    const [isOpen, setIsOpen] = useState(false);
    const [wallet, setWallet] = useState(null);

    // 🔹 Auto-detect wallet on load
    useEffect(() => {
        const checkWallet = async () => {
            const address = await getCurrentWallet();
            if (address) setWallet(address);
        };

        checkWallet();
    }, []);

    // 🔹 Connect wallet
    const handleConnectWallet = async () => {
        const address = await connectWallet();
        if (address) setWallet(address);
    };

    // 🔹 Format wallet (short view)
    const formatAddress = (addr) => {
        return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";
    };

    return (
        <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">

            {/* 🔹 Container */}
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* 🔹 Logo */}
                <h1 className="text-xl md:text-2xl font-bold tracking-wide text-blue-400">
                    Identity DApp
                </h1>

                {/* 🔹 Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">

                    <Link to="/" className="hover:text-blue-400 transition">
                        Home
                    </Link>
                    <Link to="/register" className="hover:text-blue-400 transition">
                        Register
                    </Link>
                    <Link to="/dashboard" className="hover:text-blue-400 transition">
                        Dashboard
                    </Link>
                    <Link to="/verifier" className="hover:text-blue-400 transition">
                        Verifier
                    </Link>

                    {/* 🔹 Wallet Section */}
                    {wallet ? (
                        <span className="bg-green-600 px-4 py-1 rounded-full text-sm font-semibold">
                            {formatAddress(wallet)}
                        </span>
                    ) : (
                        <button
                            onClick={handleConnectWallet}
                            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-200"
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>

                {/* 🔹 Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
            </div>

            {/* 🔹 Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3 bg-gray-800">

                    <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">
                        Home
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">
                        Register
                    </Link>
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">
                        Dashboard
                    </Link>
                    <Link to="/verifier" onClick={() => setIsOpen(false)} className="block hover:text-blue-400">
                        Verifier
                    </Link>

                    {/* 🔹 Wallet (Mobile) */}
                    {wallet ? (
                        <span className="block bg-green-600 px-4 py-2 rounded-lg text-center font-semibold">
                            {formatAddress(wallet)}
                        </span>
                    ) : (
                        <button
                            onClick={handleConnectWallet}
                            className="w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;