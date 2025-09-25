export default function Footer() {
    return (
        <footer className="bg-[#074595] text-white py-6 relative">
            <section className="bg-[#074595] text-center py-20 text-white">
                <h2 className="text-gray-300 text-lg mb-4">
                    The backbone of your study abroad journey
                </h2>
                <h1 className="text-3xl md:text-5xl font-bold text-[#fff] mb-6">
                    Manage Applications, Deadlines, and Offers in One Place
                </h1>
                <button className="bg-[#ffa81b] hover:bg-[#ffa81b] text-white px-6 py-3 rounded-full text-lg font-semibold transition">
                    Start Free Trial
                </button>
            </section>

            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                {/* Copyright */}
                <p className="text-sm text-gray-300 text-center md:text-left">
                    ApplyTech © {new Date().getFullYear()}. All rights reserved.
                </p>

                {/* Links */}
                <div className="flex space-x-6 my-4 md:my-0">
                    <a
                        href="/terms"
                        className="text-gray-300 hover:text-white text-sm transition"
                    >
                        Terms and Conditions
                    </a>
                    <a
                        href="/privacy"
                        className="text-gray-300 hover:text-white text-sm transition"
                    >
                        Privacy Policy
                    </a>
                </div>

                {/* Made with love */}
                <div className="flex items-center space-x-2">
                    <span className="text-pink-500 text-xl">❤️</span>
                    <p className="text-sm text-gray-300">
                        Built with love for global students
                    </p>
                </div>
            </div>

            {/* Floating Chat Icon */}
            <div className="absolute bottom-6 right-6">
                <button className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg transition">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.83L3 20l1.32-3.29A8.97 8.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                </button>
            </div>
        </footer>
    );
}
