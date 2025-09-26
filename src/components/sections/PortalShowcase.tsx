"use client";
import Image from "next/image";

export default function PortalShowcase() {
    return (
        <section className="bg-[#0B0B0F] py-20 px-6 md:px-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Student Portal */}
                <div className="bg-[#1A1A1F] rounded-[30px] p-10 text-center shadow-lg flex flex-col items-center">
                    {/* Icon or Logo */}
                    <div className="mb-6">
                        <div className="bg-indigo-600 p-4 rounded-2xl">
                            <Image
                                src="/site/images/student-icon.png" // Replace this with your actual icon
                                alt="Student Portal"
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Studia
                    </h2>
                    <p className="text-gray-300 text-base max-w-md mx-auto mb-6">
                        Give Your Students a Better Way to Apply — and Help Them
                        Succeed
                    </p>

                    {/* Description */}
                    <p className="text-gray-400 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                        Offer your students a smooth, modern application
                        experience with your branded student portal. They can
                        search programs, upload documents, track progress, and
                        communicate — all in one place.
                        <br />
                        <br />
                        This means fewer follow-ups, faster submissions, and
                        more successful enrollments — without extra admin work
                        for your team.
                    </p>

                    {/* Learn More Button */}
                    <button className="px-6 py-2 rounded-full border border-gray-500 text-white hover:bg-indigo-600 transition-all">
                        Learn More →
                    </button>

                    {/* Bottom Image */}
                    <div className="mt-10">
                        <Image
                            src="/site/images/student-portal-screenshot.png" // Replace with your screenshot
                            alt="Student Portal Screenshot"
                            width={600}
                            height={400}
                            className="rounded-lg"
                        />
                    </div>
                </div>

                {/* Agency Portal */}
                <div className="bg-[#1A1A1F] rounded-[30px] p-10 text-center shadow-lg flex flex-col items-center">
                    {/* Icon or Logo */}
                    <div className="mb-6">
                        <div className="bg-indigo-600 p-4 rounded-2xl">
                            <Image
                                src="/site/images/agency-icon.png" // Replace this with your actual icon
                                alt="Agency Portal"
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Nexent
                    </h2>
                    <p className="text-gray-300 text-base max-w-md mx-auto mb-6">
                        Manage Sub-Agents and Their Applications — All in One
                        Place
                    </p>

                    {/* Description */}
                    <p className="text-gray-400 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                        Simplify the way you work with sub-agents. The Agency
                        Portal gives you full visibility into every student
                        application — whether submitted by you or your
                        sub-agents.
                        <br />
                        <br />
                        Track performance, review documents, and guide
                        applications through the funnel — all from a single,
                        centralized dashboard.
                    </p>

                    {/* Learn More Button */}
                    <button className="px-6 py-2 rounded-full border border-gray-500 text-white hover:bg-indigo-600 transition-all">
                        Learn More →
                    </button>

                    {/* Bottom Image */}
                    <div className="mt-10">
                        <Image
                            src="/site/images/agency-portal-screenshot.png" // Replace with your screenshot
                            alt="Agency Portal Screenshot"
                            width={600}
                            height={400}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
