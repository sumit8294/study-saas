import Image from "next/image";

export default function HowItWorks() {
    return (
        <section className="bg-[#001e2b] text-white py-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Section: Text Content */}
                <div>
                    {/* Small heading */}
                    <p className="text-indigo-400 font-medium">How It Works</p>

                    {/* Main heading */}
                    <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
                        From Chaos to Success <br /> in 3 Simple Steps
                    </h2>

                    {/* Description */}
                    <p className="mt-6 text-lg text-gray-300">
                        Simplify your workflow with a streamlined process that
                        empowers sub-agents, students, and your team to work
                        together efficiently.
                    </p>

                    {/* Steps */}
                    <div className="mt-10 space-y-8">
                        {/* Step 1 */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 text-indigo-400 text-2xl">
                                🚀
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">
                                    Onboard & Launch
                                </h3>
                                <p className="mt-2 text-gray-400">
                                    Connect your sub-agents and fully brand your
                                    student portal in under
                                    <span className="font-medium">
                                        {" "}
                                        15 minutes
                                    </span>
                                    .
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 text-indigo-400 text-2xl">
                                📂
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">
                                    Process & Track
                                </h3>
                                <p className="mt-2 text-gray-400">
                                    Sub-agents submit applications, students
                                    upload documents, and your team seamlessly
                                    validates and manages progress.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 text-indigo-400 text-2xl">
                                📈
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">
                                    Scale & Grow
                                </h3>
                                <p className="mt-2 text-gray-400">
                                    Close more applications faster and grow your
                                    network with transparent commission payouts
                                    and real-time insights.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Dashboard Mockup */}
                <div className="relative">
                    <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-indigo-600 rounded-2xl -z-10" />
                    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-800">
                        <Image
                            src="/images/how-it-works-dashboard.png" // Replace with actual mockup image
                            alt="Workflow Dashboard Preview"
                            width={600}
                            height={500}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
