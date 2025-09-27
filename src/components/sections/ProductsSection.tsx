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
        image: "/site/images/products/student-light.png",
    },
    {
        id: "agent",
        title: "Agent Portal",
        description:
            "Manage student profiles, track applications, and collaborate with universities all in one place.",
        image: "/site/images/products/agent-light.png",
    },
    {
        id: "university",
        title: "University Portal",
        description:
            "Engage with students and agents, manage courses, and streamline the entire admission process.",
        image: "/site/images/products/university-light.png",
    },
];

export default function ProductsSection() {
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
        <section className="relative isolate  w-full bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
            {/* ===== Background Gradients ===== */}

            <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 w-[300px] h-[300px] -z-10 opacity-40 pointer-events-none"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff80b5] via-[#9089fc] to-[#0B1220] rounded-full blur-3xl" />
            </div>

            <div
                aria-hidden="true"
                className="absolute bottom-[600px] right-0 w-[250px] h-[250px] -z-10 opacity-30 pointer-events-none"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#9089fc] via-[#ff80b5] to-transparent rounded-full blur-3xl" />
            </div>

            <div
                aria-hidden="true"
                className="absolute bottom-[1150px] right-0 w-[250px] h-[250px] -z-10 opacity-30 pointer-events-none"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff80b5] via-[#9089fc] to-[#0B1220] rounded-full blur-3xl" />
            </div>

            {/* ===== Layout Grid ===== */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {/* ===== Sidebar ===== */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        {/* <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                            One platform to scale your student recruitment
                            network.
                        </h1> */}
                        {products.map((product, index) => (
                            <div key={product.id}>
                                <div
                                    className={`cursor-pointer py-5 transition-all duration-300 ${
                                        activeTab === product.id
                                            ? "opacity-100"
                                            : "opacity-60 hover:opacity-80"
                                    }`}
                                    onClick={() => {
                                        const section = document.getElementById(
                                            product.id
                                        );
                                        section?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start",
                                        });
                                    }}
                                >
                                    <h3 className="text-lg font-semibold">
                                        {product.title}
                                    </h3>
                                    {activeTab === product.id && (
                                        <p className="mt-2 text-sm text-gray-400">
                                            {product.description}
                                        </p>
                                    )}
                                    {activeTab === product.id && (
                                        <button className="mt-3 text-sm text-white font-medium flex items-center gap-1 group">
                                            Learn more
                                            <span className="group-hover:translate-x-1 transition-transform">
                                                ›
                                            </span>
                                        </button>
                                    )}
                                </div>
                                {/* Divider line */}
                                {index !== products.length - 1 && (
                                    <div className="h-px bg-gray-800" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===== Scrollable Content ===== */}
                <div className="md:col-span-3 mt-4">
                    {/* ===== Student Portal ===== */}
                    <div
                        ref={studentRef}
                        id="student"
                        className="min-h-[70vh] flex flex-col md:flex-row gap-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{
                                opacity: studentInView ? 1 : 0,
                                x: studentInView ? 0 : -50,
                            }}
                            transition={{ duration: 0.6 }}
                            className="w-full md:w-1/2 text-center md:text-left"
                        >
                            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                                Studia
                            </h3>
                            <h4 className="text-lg sm:text-xl font-semibold text-indigo-500 mb-4">
                                Give Your Students a Better Way to Apply — and
                                Help Them Succeed
                            </h4>
                            <p className="text-gray-300 mb-3">
                                Offer your students a smooth, modern application
                                experience with your branded student portal.
                                They can search programs, upload documents,
                                track progress, and communicate — all in one
                                place.
                            </p>
                            <p className="text-gray-300">
                                This means fewer follow-ups, faster submissions,
                                and more successful enrollments — without extra
                                admin work for your team.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{
                                opacity: studentInView ? 1 : 0,
                                x: studentInView ? 0 : 50,
                            }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="w-full md:w-1/2 flex justify-center"
                        >
                            <Image
                                src={products[0].image}
                                alt="Student Portal"
                                width={500}
                                height={350}
                                className="w-full max-w-[400px] rounded-xl shadow-lg"
                                style={{ height: "280px" }}
                            />
                        </motion.div>
                    </div>

                    {/* ===== Agent Portal ===== */}
                    <div
                        ref={agentRef}
                        id="agent"
                        className="min-h-[70vh] flex flex-col md:flex-row   gap-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{
                                opacity: agentInView ? 1 : 0,
                                x: agentInView ? 0 : -50,
                            }}
                            transition={{ duration: 0.6 }}
                            className="w-full md:w-1/2 text-center md:text-left"
                        >
                            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                                Nexent
                            </h3>
                            <h4 className="text-lg sm:text-xl font-semibold text-indigo-500 mb-4">
                                Manage Sub-Agents and Their Applications — All
                                in One Place
                            </h4>
                            <p className="text-gray-300 mb-3">
                                Simplify the way you work with sub-agents. The
                                Agency Portal gives you full visibility into
                                every student application — whether submitted by
                                you or your sub-agents.
                            </p>
                            <p className="text-gray-300">
                                Track performance, review documents, and guide
                                applications through the funnel — all from a
                                single, centralized dashboard.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{
                                opacity: agentInView ? 1 : 0,
                                x: agentInView ? 0 : 50,
                            }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="w-full md:w-1/2 flex justify-center"
                        >
                            <Image
                                src={products[1].image}
                                alt="Agent Portal"
                                width={500}
                                height={350}
                                className="w-full max-w-[400px] rounded-xl shadow-lg"
                                style={{ height: "280px" }}
                            />
                        </motion.div>
                    </div>

                    {/* ===== University Portal ===== */}
                    <div
                        ref={universityRef}
                        id="university"
                        className="min-h-[70vh] flex flex-col md:flex-row   gap-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{
                                opacity: universityInView ? 1 : 0,
                                x: universityInView ? 0 : -50,
                            }}
                            transition={{ duration: 0.6 }}
                            className="w-full md:w-1/2 text-center md:text-left"
                        >
                            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                                Campora
                            </h3>
                            <h4 className="text-lg sm:text-xl font-semibold text-indigo-500 mb-4">
                                Give Universities Direct Control Over Their
                                Student Applications
                            </h4>
                            <p className="text-gray-300 mb-3">
                                Empower your partner universities with their own
                                secure portal to review, process, and manage
                                student applications — all in real time.
                            </p>
                            <p className="text-gray-300">
                                Streamline communication, speed up decisions,
                                and keep everything organized under one roof, so
                                universities can focus on enrolling the best
                                students.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{
                                opacity: universityInView ? 1 : 0,
                                x: universityInView ? 0 : 50,
                            }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="w-full md:w-1/2 flex justify-center"
                        >
                            <Image
                                src={products[2].image}
                                alt="University Portal"
                                width={500}
                                height={350}
                                className="w-full max-w-[400px] rounded-xl shadow-lg"
                                style={{ height: "280px" }}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
