"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const products = [
    {
        id: "student",
        title: "Student Portal",
        description:
            "Access 20,000+ courses, apply with ease, track your application, and get expert guidance at every step.",
        image: "/site/images/products/university-light.jpg",
    },
    {
        id: "agent",
        title: "Agent Portal",
        description:
            "Manage student profiles, track applications, and collaborate with universities all in one place.",
        image: "/site/images/products/university-light.jpg",
    },
    {
        id: "university",
        title: "University Portal",
        description:
            "Engage with students and agents, manage courses, and streamline the entire admission process.",
        image: "/site/images/products/university-light.jpg",
    },
];

export default function AllProducts() {
    const [activeTab, setActiveTab] = useState(products[0].id);

    const { ref: studentRef, inView: studentInView } = useInView({
        threshold: 0.4,
    });
    const { ref: agentRef, inView: agentInView } = useInView({
        threshold: 0.4,
    });
    const { ref: universityRef, inView: universityInView } = useInView({
        threshold: 0.4,
    });

    // Update active tab on scroll
    useEffect(() => {
        if (studentInView) setActiveTab("student");
        else if (agentInView) setActiveTab("agent");
        else if (universityInView) setActiveTab("university");
    }, [studentInView, agentInView, universityInView]);

    return (
        <>
            <div className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    {/* Header Section */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            The Complete Student Recruitment Package
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            One platform with 4 connected portals—designed for
                            students, agents, universities, and managed
                            seamlessly by admin.
                        </p>
                    </div>

                    {/* Portals Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Student Portal */}
                        <div className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 14l9-5-9-5-9 5 9 5z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9 5m9-5v6"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                    Student Portal
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Easy application process, document
                                    submission, and real-time status tracking
                                    for students.
                                </p>
                            </div>
                        </div>

                        {/* Agent Portal */}
                        <div className="group bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-8 border border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                    Agent Portal
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Manage student applications, track
                                    commissions, and collaborate with
                                    universities efficiently.
                                </p>
                            </div>
                        </div>

                        {/* University Portal */}
                        <div className="group bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all duration-300">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                    University Portal
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Process applications, manage enrollments,
                                    and communicate with students and agents.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Admin Portal Badge - Centered */}
                    <div className="text-center mt-12">
                        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-full shadow-lg">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>
                            <span className="text-lg font-semibold">
                                Admin Portal included to manage everything
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
