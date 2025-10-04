import Image from "next/image";

export default function DualPortalAdvantage() {
    return (
        <section className="bg-[#001e2b] text-white py-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Side - Dashboard Mockup */}
                <div className="bg-[#111827] rounded-2xl shadow-lg overflow-hidden border border-gray-800">
                    <Image
                        src="/images/portal-dashboard.png" // Replace with actual dashboard image
                        alt="Portal Dashboard Preview"
                        width={600}
                        height={500}
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Right Side - Content */}
                <div>
                    {/* Small Heading */}
                    <p className="text-indigo-400 font-medium">
                        Dual Portal Advantage
                    </p>

                    {/* Main Heading */}
                    <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
                        Two Portals, One Platform
                    </h2>

                    {/* Description */}
                    <p className="mt-6 text-lg text-gray-300">
                        Address both B2B and B2C needs seamlessly. Empower your
                        staff, sub-agents, and students with dedicated portals
                        designed for efficiency and trust.
                    </p>

                    {/* Features */}
                    <div className="mt-10 space-y-8">
                        {/* Feature 1 */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 text-indigo-400 text-2xl">
                                🏢
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">
                                    The Agency Network Portal
                                </h3>
                                <p className="mt-2 text-gray-400">
                                    <span className="font-medium">
                                        Efficiency & Control:
                                    </span>{" "}
                                    Tools for your staff and sub-agents,
                                    including Commission Tracking, Document
                                    Validation, and Workflow Management to keep
                                    operations smooth and transparent.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 text-indigo-400 text-2xl">
                                🎓
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">
                                    The Branded Student Portal
                                </h3>
                                <p className="mt-2 text-gray-400">
                                    <span className="font-medium">
                                        Experience & Trust:
                                    </span>{" "}
                                    A seamless interface for students to upload
                                    documents, track their application status,
                                    and securely communicate with your team.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-10">
                        <a
                            href="#"
                            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-6 py-3 rounded-lg shadow-md transition"
                        >
                            Explore the Portals
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
