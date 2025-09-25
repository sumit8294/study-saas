"use client";
import Image from "next/image";

export default function WhyChooseUsSection() {
    const features = [
        {
            icon: "search-courses.png",
            title: "Search 20,000+ Courses",
            description:
                "Find courses from top universities worldwide in just a few clicks.",
        },
        {
            icon: "shortlist.png",
            title: "Shortlist & Apply with Guidance",
            description:
                "Get expert advice to shortlist universities and apply with confidence.",
        },
        {
            icon: "docs-upload.png",
            title: "Track Applications Seamlessly",
            description:
                "Upload documents, track statuses, and stay informed in real-time.",
        },
        {
            icon: "support-team.png",
            title: "Dedicated Support Team",
            description:
                "Our counselors are here to assist you at every stage of your journey.",
        },
        {
            icon: "growth.png",
            title: "95% Acceptance Rate",
            description:
                "Our students consistently secure admissions to top global universities.",
        },
        {
            icon: "university-tieup.png",
            title: "200+ University Tie-Ups",
            description:
                "Direct partnerships with leading universities worldwide.",
        },
        {
            icon: "verified-courses.png",
            title: "Verified Course Data",
            description:
                "Access accurate course details, brochures, and entry requirements.",
        },
        {
            icon: "courses-avalaible.png",
            title: "4,207+ Courses Available",
            description:
                "Choose from thousands of courses across multiple disciplines.",
        },
        {
            icon: "agents.png",
            title: "Expert Agents Network",
            description:
                "Work with certified agents to simplify your study abroad journey.",
        },
    ];

    return (
        <section className="bg-white py-12 px-4">
            <div className="max-w-7xl mx-auto text-center px-6 lg:px-12 items-center">
                {/* Title */}
                <div className="px-6 sm:px-12 md:px-24 lg:px-48 text-center mb-12">
                    <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold leading-snug">
                        Why Choose Our{" "}
                        <span className="text-orange-500">
                            Study Abroad Platform?
                        </span>
                    </h2>
                    <p className="text-[#074595] font-medium mt-4 max-w-3xl mx-auto mb-2">
                        Discover, apply, and track study abroad opportunities
                        effortlessly. Our platform connects students, agents,
                        and universities worldwide with verified data and
                        dedicated support.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 text-left">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-4">
                            {/* Icon Circle */}
                            <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center">
                                <Image
                                    src={`/site/images/vectors/${feature.icon}`}
                                    alt={feature.title}
                                    width={100}
                                    height={100}
                                    className="object-contain"
                                />
                            </div>

                            {/* Text */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
