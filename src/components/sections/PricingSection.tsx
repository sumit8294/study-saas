"use client";
import { useState } from "react";
import { Check } from "lucide-react";

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState("ANNUAL");

    const plans = [
        {
            name: "Student Portal",
            price: 890,
            yearly: 10680,
            description:
                "For education consultants helping students apply abroad. Manage student profiles, track application status, upload documents, and send updates seamlessly.",
            gradient: "from-orange-100 to-orange-200",
            svgBg: "bg-[url('/site/images/petal-orange.png')]",
        },
        {
            name: "Agent Portal",
            price: 1390,
            yearly: 16680,
            description:
                "Perfect for growing agencies managing multiple students and university partnerships. Get CRM tools, analytics, and a portal to manage your counseling business efficiently.",
            gradient: "from-purple-100 to-purple-200",
            svgBg: "bg-[url('/site/images/petal-purple.png')]",
        },
        {
            name: "University Portal",
            price: 1890,
            yearly: 22680,
            description:
                "Designed for universities looking to streamline international student admissions. Manage applications, connect with agents, and track recruitment metrics with up to 6 admin users.",
            gradient: "from-blue-100 to-blue-200",
            svgBg: "bg-[url('/site/images/petal-blue.png')]",
        },
        {
            name: "Admin Panel Suite",
            price: 3590,
            yearly: 43080,
            description:
                "The complete solution for SaaS owners. Includes advanced analytics, unlimited user roles, performance tracking, compliance tools, and centralized management for all portals.",
            gradient: "from-gray-100 to-gray-200",
            svgBg: "bg-[url('/site/images/petal-gray.png')]",
        },
    ];

    return (
        <section className="bg-white py-12 px-4">
            <div className="max-w-7xl mx-auto text-center px-6 lg:px-12 items-center">
                {/* Title */}
                <div className="px-6 sm:px-12 md:px-24 lg:px-48 text-center">
                    <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold leading-snug">
                        Power Your{" "}
                        <span className="text-orange-500">
                            Study Abroad Business
                        </span>{" "}
                        with Our Unified SaaS Solution
                    </h2>
                    <p className="text-gray-800 font-medium mt-4 max-w-3xl mx-auto mb-2">
                        Manage student applications, agent networks, and
                        university admissions — all in one platform. A seamless
                        way to handle global education workflows.
                    </p>
                </div>

                {/* Toggle Buttons */}
                <div className="flex justify-center mb-10">
                    <div className="flex border border-blue-600 rounded-full overflow-hidden">
                        <button
                            onClick={() => setBillingCycle("ANNUAL")}
                            className={`px-6 py-2 text-sm font-semibold transition-all ${
                                billingCycle === "ANNUAL"
                                    ? "bg-blue-600 text-white"
                                    : "text-blue-600"
                            }`}
                        >
                            ANNUAL
                        </button>
                        <button
                            onClick={() => setBillingCycle("QUARTERLY")}
                            className={`px-6 py-2 text-sm font-semibold transition-all ${
                                billingCycle === "QUARTERLY"
                                    ? "bg-blue-600 text-white"
                                    : "text-blue-600"
                            }`}
                        >
                            QUARTERLY
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`rounded-3xl shadow-lg p-8 relative overflow-hidden text-left bg-gradient-to-br ${plan.gradient} ${plan.svgBg}`}
                        >
                            {/* Petal Effect Overlay */}
                            <div className="absolute inset-0 opacity-30 pointer-events-none"></div>

                            {/* Plan Name */}
                            <h3 className="text-2xl font-bold mb-4">
                                {plan.name}
                            </h3>

                            {/* Price */}
                            <p className="text-3xl font-bold text-gray-800">
                                ${plan.price}
                                <span className="text-lg font-medium">
                                    /month
                                </span>
                            </p>
                            <p className="text-gray-600 mb-6">
                                Billed yearly at ${plan.yearly.toLocaleString()}
                            </p>

                            {/* Features */}
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-2 text-gray-800">
                                    <Check className="w-5 h-5 text-green-600" />
                                    <span>Unlimited Workspaces</span>
                                </li>
                                <li className="flex items-center gap-2 text-gray-800">
                                    <Check className="w-5 h-5 text-green-600" />
                                    <span>Collaborate Seamlessly</span>
                                </li>
                                <li className="flex items-center gap-2 text-gray-800">
                                    <Check className="w-5 h-5 text-green-600" />
                                    <span>Unified Analytics</span>
                                </li>
                            </ul>

                            {/* Buttons */}
                            <button className="w-full bg-black text-white rounded-full py-2 font-semibold hover:bg-gray-800 transition">
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
