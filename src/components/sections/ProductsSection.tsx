"use client";

import { useState, useRef, useEffect } from "react";
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
        threshold: 0.5,
    });
    const { ref: agentRef, inView: agentInView } = useInView({
        threshold: 0.5,
    });
    const { ref: universityRef, inView: universityInView } = useInView({
        threshold: 0.5,
    });

    // Update active tab based on which section is visible
    useEffect(() => {
        if (studentInView) setActiveTab("student");
        else if (agentInView) setActiveTab("agent");
        else if (universityInView) setActiveTab("university");
    }, [studentInView, agentInView, universityInView]);

    return (
        <section className="relative isolate w-full bg-gray-900 text-white py-20">
            {/* ===== Gradient Backgrounds ===== */}
            {/* Main Bottom Right Glow */}
            <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 w-[400px] h-[400px] -z-10 opacity-40 pointer-events-none"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff80b5] via-[#9089fc] to-[#0B1220] rounded-full blur-3xl" />
            </div>

            {/* Second Glow Above */}
            <div
                aria-hidden="true"
                className="absolute bottom-[1000px] right-0 w-[350px] h-[350px] -z-10 opacity-30 pointer-events-none"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#9089fc] via-[#ff80b5] to-transparent rounded-full blur-3xl" />
            </div>

            {/* Third Glow Higher Up */}
            <div
                aria-hidden="true"
                className="absolute bottom-[2000px] right-0 w-[350px] h-[350px] -z-10 opacity-30 pointer-events-none"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-[#9089fc] via-[#ff80b5] to-transparent rounded-full blur-3xl" />
            </div>

            {/* ===== Layout with Sidebar + Content ===== */}
            <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 relative z-10">
                {/* ===== Sticky Sidebar ===== */}
                <div className="col-span-1">
                    <div className="sticky top-28">
                        <h2 className="text-2xl font-bold mb-6">Products</h2>
                        <ul className="space-y-4">
                            {products.map((product) => (
                                <li
                                    key={product.id}
                                    className={`cursor-pointer p-3 rounded-xl transition-all duration-300 ${
                                        activeTab === product.id
                                            ? "bg-indigo-500 text-white"
                                            : "bg-gray-800 text-gray-400"
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
                                    {product.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ===== Scrollable Content ===== */}
                <div className="col-span-3 ">
                    {/* ===== Student Portal ===== */}
                    <div
                        ref={studentRef}
                        id="student"
                        className="min-h-screen flex items-start mt-12 gap-10"
                    >
                        {/* Text Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{
                                opacity: studentInView ? 1 : 0,
                                x: studentInView ? 0 : -50,
                            }}
                            transition={{ duration: 0.6 }}
                            className="w-1/2"
                        >
                            <h3 className="text-4xl font-bold mb-4">Studia</h3>
                            <h4 className="text-xl font-semibold text-indigo-500 mb-6">
                                Give Your Students a Better Way to Apply — and
                                Help Them Succeed
                            </h4>
                            <p className="text-lg text-gray-300 mb-4">
                                Offer your students a smooth, modern application
                                experience with your branded student portal.
                                They can search programs, upload documents,
                                track progress, and communicate — all in one
                                place.
                            </p>
                            <p className="text-lg text-gray-300">
                                This means fewer follow-ups, faster submissions,
                                and more successful enrollments — without extra
                                admin work for your team.
                            </p>
                        </motion.div>

                        {/* Image Animation: Float in/out */}
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{
                                opacity: studentInView ? 1 : 0,
                                x: studentInView ? 0 : 100,
                            }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="w-1/2"
                        >
                            <Image
                                src={products[0].image}
                                alt="Student Portal"
                                width={600}
                                height={400}
                                className="rounded-xl shadow-lg"
                                style={{ height: "280px" }}
                            />
                        </motion.div>
                    </div>

                    {/* ===== Agent Portal ===== */}
                    <div
                        ref={agentRef}
                        id="agent"
                        className="min-h-screen flex items-start mt-12 gap-10"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{
                                opacity: agentInView ? 1 : 0,
                                x: agentInView ? 0 : -50,
                            }}
                            transition={{ duration: 0.6 }}
                            className="w-1/2"
                        >
                            <h3 className="text-4xl font-bold mb-4">Nexent</h3>
                            <h4 className="text-xl font-semibold text-indigo-500 mb-6">
                                Manage Sub-Agents and Their Applications — All
                                in One Place
                            </h4>
                            <p className="text-lg text-gray-300 mb-4">
                                Simplify the way you work with sub-agents. The
                                Agency Portal gives you full visibility into
                                every student application — whether submitted by
                                you or your sub-agents.
                            </p>
                            <p className="text-lg text-gray-300">
                                Track performance, review documents, and guide
                                applications through the funnel — all from a
                                single, centralized dashboard.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{
                                opacity: agentInView ? 1 : 0,
                                x: agentInView ? 0 : 100,
                            }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="w-1/2"
                        >
                            <Image
                                src={products[1].image}
                                alt="Agency Portal"
                                width={600}
                                height={400}
                                className="rounded-xl shadow-lg"
                                style={{ height: "280px" }}
                            />
                        </motion.div>
                    </div>

                    {/* ===== University Portal ===== */}
                    <div
                        ref={universityRef}
                        id="university"
                        className="min-h-screen flex items-start mt-12 gap-10"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{
                                opacity: universityInView ? 1 : 0,
                                x: universityInView ? 0 : -50,
                            }}
                            transition={{ duration: 0.6 }}
                            className="w-1/2"
                        >
                            <h3 className="text-4xl font-bold mb-4">Campora</h3>
                            <h4 className="text-xl font-semibold text-indigo-500 mb-6">
                                Give Universities Direct Control Over Their
                                Student Applications
                            </h4>
                            <p className="text-lg text-gray-300 mb-4">
                                Empower your partner universities with their own
                                secure portal to review, process, and manage
                                student applications — all in real time.
                            </p>
                            <p className="text-lg text-gray-300">
                                Streamline communication, speed up decisions,
                                and keep everything organized under one roof, so
                                universities can focus on enrolling the best
                                students.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{
                                opacity: universityInView ? 1 : 0,
                                x: universityInView ? 0 : 100,
                            }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="w-1/2"
                        >
                            <Image
                                src={products[2].image}
                                alt="University Portal"
                                width={600}
                                height={400}
                                className="rounded-xl shadow-lg"
                                style={{ height: "280px" }}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
