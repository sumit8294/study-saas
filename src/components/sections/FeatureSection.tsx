export default function ProblemSolutionSection() {
    return (
        <section className="bg-[#0B1220] text-white py-20 px-6">
            <div className="max-w-6xl mx-auto text-center">
                {/* Small Heading */}
                <p className="text-indigo-400 font-medium">
                    Simplify Your Workflow
                </p>

                {/* Main Heading */}
                <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
                    Stop Juggling Spreadsheets <br /> and Insecure Emails
                </h2>

                {/* Subtext */}
                <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
                    Agencies face chaos when managing study abroad applications.
                    Our platform eliminates inefficiencies so you can focus on
                    students, not manual processes.
                </p>

                {/* Feature Cards */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                    {/* Feature 1 */}
                    <div>
                        <div className="flex items-center space-x-3">
                            <span className="text-indigo-400 text-xl">🚀</span>
                            <h3 className="font-semibold text-lg">
                                Sub-Agent Chaos?
                            </h3>
                        </div>
                        <p className="mt-4 text-gray-400">
                            Onboard, train, and manage sub-agents from a single,
                            secure dashboard. Keep everything organized in one
                            place.
                        </p>
                        <a
                            href="#"
                            className="mt-4 inline-block text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                        >
                            Learn more →
                        </a>
                    </div>

                    {/* Feature 2 */}
                    <div>
                        <div className="flex items-center space-x-3">
                            <span className="text-indigo-400 text-xl">⚡</span>
                            <h3 className="font-semibold text-lg">
                                Slow Applications?
                            </h3>
                        </div>
                        <p className="mt-4 text-gray-400">
                            Cut processing time by up to 50% with automated
                            checks and workflows. No more repetitive manual
                            tasks.
                        </p>
                        <a
                            href="#"
                            className="mt-4 inline-block text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                        >
                            Learn more →
                        </a>
                    </div>

                    {/* Feature 3 */}
                    <div>
                        <div className="flex items-center space-x-3">
                            <span className="text-indigo-400 text-xl">📊</span>
                            <h3 className="font-semibold text-lg">
                                No Visibility?
                            </h3>
                        </div>
                        <p className="mt-4 text-gray-400">
                            Track every step — from student application to
                            university acceptance — with real-time updates and
                            transparency.
                        </p>
                        <a
                            href="#"
                            className="mt-4 inline-block text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                        >
                            Learn more →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
