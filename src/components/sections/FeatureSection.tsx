import { Users, Workflow, BarChart3 } from "lucide-react";

export default function ProblemSolutionSection() {
    return (
        <section className="bg-[#0B1220] text-white py-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Grid with spacing between cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-800 divide-y md:divide-y-0 md:divide-x divide-gray-800 rounded-lg">
                    {/* Step 1 */}
                    <div className="p-8">
                        <div className="mb-6 flex justify-">
                            <Users className="w-12 h-12 text-indigo-400" />
                        </div>

                        <h3 className="mt-2 text-lg font-bold">
                            Sub-Agent Chaos?
                        </h3>
                        <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                            Onboard, train, and manage sub-agents from a single,
                            secure dashboard. Keep everything organized in one
                            place.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="p-8">
                        <div className="mb-6 flex justify-">
                            <Workflow className="w-12 h-12 text-indigo-400" />
                        </div>

                        <h3 className="mt-2 text-lg font-bold">
                            Slow Applications?
                        </h3>
                        <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                            Cut processing time by up to 50% with automated
                            checks and workflows. No more repetitive manual
                            tasks.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="p-8">
                        <div className="mb-6 flex justify-">
                            <BarChart3 className="w-12 h-12 text-indigo-400" />
                        </div>

                        <h3 className="mt-2 text-lg font-bold">
                            No Visibility?
                        </h3>
                        <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                            Track every step — from student application to
                            university acceptance — with real-time updates and
                            transparency.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
