import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-gray-950 text-white">

            {/* HERO SECTION */}
            <div className="flex flex-col items-center justify-center text-center px-6 py-20">

                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                    Decentralised Identity <br />
                    <span className="text-blue-500">Verification System</span>
                </h1>

                <p className="mt-6 text-gray-400 max-w-2xl">
                    Secure your identity using blockchain technology. Register once, get verified,
                    and use your identity across multiple decentralized applications.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex gap-4 flex-wrap justify-center">
                    <Link
                        to="/register"
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition duration-200"
                    >
                        Get Started
                    </Link>

                    <Link
                        to="/dashboard"
                        className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition duration-200"
                    >
                        View Dashboard
                    </Link>
                </div>
            </div>

            {/* FEATURES SECTION */}
            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">

                {/* Feature 1 */}
                <div className="bg-gray-900 p-6 rounded-xl shadow-md hover:scale-105 transition duration-300">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">
                        🔐 Secure
                    </h3>
                    <p className="text-gray-400">
                        Your identity is protected using blockchain hashing. No raw data is exposed.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-gray-900 p-6 rounded-xl shadow-md hover:scale-105 transition duration-300">
                    <h3 className="text-xl font-bold text-green-400 mb-2">
                        ⚡ Fast Verification
                    </h3>
                    <p className="text-gray-400">
                        Get verified quickly by authorized verifiers with transparent status updates.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-gray-900 p-6 rounded-xl shadow-md hover:scale-105 transition duration-300">
                    <h3 className="text-xl font-bold text-purple-400 mb-2">
                        🌐 Decentralised
                    </h3>
                    <p className="text-gray-400">
                        No central authority controls your identity — you own your data.
                    </p>
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="bg-gray-900 py-16 px-6 text-center">

                <h2 className="text-3xl font-bold mb-10">
                    How It Works
                </h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

                    <div>
                        <h4 className="text-lg font-semibold text-blue-400">1. Register</h4>
                        <p className="text-gray-400 mt-2">
                            Upload your identity document securely.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-green-400">2. Verify</h4>
                        <p className="text-gray-400 mt-2">
                            Authorized verifiers review and approve your identity.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-purple-400">3. Use</h4>
                        <p className="text-gray-400 mt-2">
                            Access services that require verified identity.
                        </p>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="text-center text-gray-500 py-6 text-sm">
                © 2026 Identity DApp | Built with Blockchain 🚀
            </div>
        </div>
    );
}

export default Home;