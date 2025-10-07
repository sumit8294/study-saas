"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import GraphSection from "./GraphSection";
import AllProducts from "./AllProducts";

const products = [
    {
        id: "ai-search",
        title: "AI-enabled Intelligent Search",
        description:
            "Find relevant courses, students, or agents instantly using AI-powered search algorithms for precise and faster results.",
        image: "/site/images/vectors/ai-search.png",
    },
    {
        id: "document-verification",
        title: "Document Verification & Authentication",
        description:
            "Verify and authenticate important documents securely and efficiently with advanced AI validation tools.",
        image: "/site/images/vectors/documents-bro.png",
    },
    {
        id: "real-time-analytics",
        title: "Real-time Reports & Analytics",
        description:
            "Get actionable insights and comprehensive reports instantly with real-time analytics across your portal.",
        image: "/site/images/vectors/analytics.png",
    },
    {
        id: "secure-wallet",
        title: "Secure Wallet & Transactions",
        description:
            "Manage transactions and store funds safely with a secure and AI-monitored wallet system.",
        image: "/site/images/vectors/wallet.png",
    },
    {
        id: "seamless-communication",
        title: "Seamless Communication",
        description:
            "Connect with students, agents, and universities effortlessly through an integrated AI-enhanced communication platform.",
        image: "/site/images/vectors/communication.png",
    },
];

export default function ProductsSection() {
    const [activeTab, setActiveTab] = useState(products[0].id);

    const { ref: searchRef, inView: searchInView } = useInView({
        threshold: 0.4,
    });
    const { ref: documentRef, inView: documentInView } = useInView({
        threshold: 0.4,
    });
    const { ref: analyticsRef, inView: analyticsInView } = useInView({
        threshold: 0.4,
    });
    const { ref: walletRef, inView: walletInView } = useInView({
        threshold: 0.4,
    });
    const { ref: communicationRef, inView: communicationInView } = useInView({
        threshold: 0.4,
    });

    // Update active tab on scroll
    useEffect(() => {
        if (searchInView) setActiveTab("ai-search");
        else if (documentInView) setActiveTab("document-verification");
        else if (analyticsInView) setActiveTab("real-time-analytics");
        else if (walletInView) setActiveTab("secure-wallet");
        else if (communicationInView) setActiveTab("seamless-communication");
    }, [
        searchInView,
        documentInView,
        analyticsInView,
        walletInView,
        communicationInView,
    ]);

    return (
        <>
            <section className="relative isolate  w-full text-white py-20 lg:pb-20 px-4 sm:px-6 lg:px-8">
                {/* ===== Background Gradients ===== */}

                <div
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 w-[300px] h-[300px] -z-10 opacity-40 pointer-events-none"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff80b5] via-[#9089fc] to-[#001e2b] rounded-full blur-3xl" />
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
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff80b5] via-[#9089fc] to-[#001e2b] rounded-full blur-3xl" />
                </div>

                {/* ===== Layout Grid ===== */}
                <div className="px-8 mx-auto grid grid-cols-1 md:grid-cols-7 gap-8 relative z-10">
                    {/* ===== Sidebar ===== */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-40">
                            {products.map((product, index) => (
                                <div key={product.id}>
                                    <div
                                        className={`cursor-pointer py-5 transition-all duration-300 ${
                                            activeTab === product.id
                                                ? "opacity-100"
                                                : "opacity-60 hover:opacity-80"
                                        }`}
                                        onClick={() => {
                                            const section =
                                                document.getElementById(
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
                                                {/* {product.description} */}
                                            </p>
                                        )}
                                        {activeTab === product.id && (
                                            <button className="mt-3 text-sm text-white font-medium flex items-center gap-1 group">
                                                {/* Learn more
                                                <span className="group-hover:translate-x-1 transition-transform">
                                                    ›
                                                </span> */}
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
                    <div className="md:col-span-5 mt-4">
                        {/* ===== AI Search ===== */}
                        <div
                            ref={searchRef}
                            id="ai-search"
                            className="min-h-[70vh] flex flex-col md:flex-row gap-8 bg-[#061621] rounded-2xl p-10 py-24 mb-20"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{
                                    opacity: searchInView ? 1 : 0,
                                    x: searchInView ? 0 : -50,
                                }}
                                transition={{ duration: 0.6 }}
                                className="w-full md:w-1/2 text-center md:text-left"
                            >
                                <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                                    AI-enabled Intelligent Search
                                </h3>
                                {/* <h4 className="text-lg sm:text-xl font-semibold text-[#00ed64] mb-4">
                                    Find the Right Information — Instantly and
                                    Accurately
                                </h4> */}
                                <p className="text-gray-300 mb-3">
                                    Empower students, agents, and universities
                                    with AI-powered search that delivers precise
                                    results in seconds. No more endless
                                    scrolling or guessing.
                                </p>
                                <p className="text-gray-300">
                                    Smart filters, predictive suggestions, and
                                    context-aware recommendations ensure users
                                    always find exactly what they need — saving
                                    time and boosting efficiency.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <a
                                        href="#"
                                        className="inline-block rounded-md bg-[#00ED64] px-6 py-3 text-sm font-semibold text-black shadow-lg hover:opacity-90"
                                    >
                                        Learn More
                                    </a>
                                    <a
                                        href="#"
                                        className="inline-block rounded-md border border-gray-700 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                                    >
                                        Documentation
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{
                                    opacity: searchInView ? 1 : 0,
                                    x: searchInView ? 0 : 50,
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeInOut",
                                }}
                                className="w-full md:w-1/2 flex justify-center"
                            >
                                <Image
                                    src={products[0].image}
                                    alt="AI Search"
                                    width={500}
                                    height={500}
                                    className="w-full max-w-[420px] rounded-xl shadow-lg"
                                    style={{ height: "400px" }}
                                />
                            </motion.div>
                        </div>

                        {/* ===== Document Verification ===== */}
                        <div
                            ref={documentRef}
                            id="document-verification"
                            className="min-h-[70vh] flex flex-col md:flex-row gap-8 bg-[#061621] rounded-2xl p-10 py-24 mb-20"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{
                                    opacity: documentInView ? 1 : 0,
                                    x: documentInView ? 0 : -50,
                                }}
                                transition={{ duration: 0.6 }}
                                className="w-full md:w-1/2 text-center md:text-left"
                            >
                                <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                                    Document Verification & Authentication
                                </h3>
                                {/* <h4 className="text-lg sm:text-xl font-semibold text-[#00ed64] mb-4">
                                    Build Trust with Secure and Verified
                                    Submissions
                                </h4> */}
                                <p className="text-gray-300 mb-3">
                                    Ensure every uploaded document is genuine,
                                    validated, and compliant with university or
                                    government standards. No room for errors or
                                    fraud.
                                </p>
                                <p className="text-gray-300">
                                    Automated verification, digital signatures,
                                    and real-time authentication make the
                                    process smooth and reliable for students and
                                    institutions alike.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <a
                                        href="#"
                                        className="inline-block rounded-md bg-[#00ED64] px-6 py-3 text-sm font-semibold text-black shadow-lg hover:opacity-90"
                                    >
                                        Learn More
                                    </a>
                                    <a
                                        href="#"
                                        className="inline-block rounded-md border border-gray-700 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                                    >
                                        Documentation
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{
                                    opacity: documentInView ? 1 : 0,
                                    x: documentInView ? 0 : 50,
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeInOut",
                                }}
                                className="w-full md:w-1/2 flex justify-center"
                            >
                                <Image
                                    src={products[1].image}
                                    alt="Document Verification"
                                    width={500}
                                    height={500}
                                    className="w-full max-w-[370px] rounded-xl"
                                    style={{ height: "340px" }}
                                />
                            </motion.div>
                        </div>

                        {/* ===== Real-time Analytics ===== */}
                        <div
                            ref={analyticsRef}
                            id="real-time-analytics"
                            className="min-h-[70vh] flex flex-col md:flex-row gap-8 bg-[#061621] rounded-2xl p-10 py-24 mb-20"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{
                                    opacity: analyticsInView ? 1 : 0,
                                    x: analyticsInView ? 0 : -50,
                                }}
                                transition={{ duration: 0.6 }}
                                className="w-full md:w-1/2 text-center md:text-left"
                            >
                                <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                                    Real-time Reports & Analytics
                                </h3>
                                {/* <h4 className="text-lg sm:text-xl font-semibold text-[#00ed64] mb-4">
                                    Make Smarter Decisions with Data at Your
                                    Fingertips
                                </h4> */}
                                <p className="text-gray-300 mb-3">
                                    Track applications, monitor performance, and
                                    get instant insights into every stage of the
                                    admission journey with live dashboards and
                                    analytics.
                                </p>
                                <p className="text-gray-300">
                                    Identify trends, measure outcomes, and
                                    optimize processes — all in real time,
                                    without waiting for manual updates.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <a
                                        href="#"
                                        className="inline-block rounded-md bg-[#00ED64] px-6 py-3 text-sm font-semibold text-black shadow-lg hover:opacity-90"
                                    >
                                        Learn More
                                    </a>
                                    <a
                                        href="#"
                                        className="inline-block rounded-md border border-gray-700 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                                    >
                                        Documentation
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{
                                    opacity: analyticsInView ? 1 : 0,
                                    x: analyticsInView ? 0 : 50,
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeInOut",
                                }}
                                className="w-full md:w-1/2 flex justify-center"
                            >
                                <Image
                                    src={products[2].image}
                                    alt="Real-time Analytics"
                                    width={500}
                                    height={500}
                                    className="w-full max-w-[400px] rounded-xl shadow-lg"
                                    style={{ height: "400px" }}
                                />
                            </motion.div>
                        </div>

                        {/* ===== Secure Wallet ===== */}
                        <div
                            ref={walletRef}
                            id="secure-wallet"
                            className="min-h-[70vh] flex flex-col md:flex-row gap-8 bg-[#061621] rounded-2xl p-10 py-24 mb-20"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{
                                    opacity: walletInView ? 1 : 0,
                                    x: walletInView ? 0 : -50,
                                }}
                                transition={{ duration: 0.6 }}
                                className="w-full md:w-1/2 text-center md:text-left"
                            >
                                <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                                    Secure Wallet & Transactions
                                </h3>
                                {/* <h4 className="text-lg sm:text-xl font-semibold text-[#00ed64] mb-4">
                                    Simplify Payments with Confidence and
                                    Transparency
                                </h4> */}
                                <p className="text-gray-300 mb-3">
                                    Enable safe deposits, fee payments, and
                                    refunds through an integrated secure wallet.
                                    Every transaction is encrypted and
                                    traceable.
                                </p>
                                <p className="text-gray-300">
                                    Students, agents, and universities enjoy
                                    hassle-free payments with complete trust —
                                    reducing delays and ensuring financial
                                    transparency.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <a
                                        href="#"
                                        className="inline-block rounded-md bg-[#00ED64] px-6 py-3 text-sm font-semibold text-black shadow-lg hover:opacity-90"
                                    >
                                        Learn More
                                    </a>
                                    <a
                                        href="#"
                                        className="inline-block rounded-md border border-gray-700 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                                    >
                                        Documentation
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{
                                    opacity: walletInView ? 1 : 0,
                                    x: walletInView ? 0 : 50,
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeInOut",
                                }}
                                className="w-full md:w-1/2 flex justify-center"
                            >
                                <Image
                                    src={products[3].image}
                                    alt="Secure Wallet"
                                    width={500}
                                    height={500}
                                    className="w-full max-w-[380px] rounded-xl shadow-lg"
                                    style={{ height: "380px" }}
                                />
                            </motion.div>
                        </div>

                        {/* ===== Seamless Communication ===== */}
                        <div
                            ref={communicationRef}
                            id="seamless-communication"
                            className="min-h-[70vh] flex flex-col md:flex-row gap-8 bg-[#061621] rounded-2xl p-10 py-24 mb-20"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{
                                    opacity: communicationInView ? 1 : 0,
                                    x: communicationInView ? 0 : -50,
                                }}
                                transition={{ duration: 0.6 }}
                                className="w-full md:w-1/2 text-center md:text-left"
                            >
                                <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                                    Seamless Communication
                                </h3>
                                {/* <h4 className="text-lg sm:text-xl font-semibold text-[#00ed64] mb-4">
                                    Stay Connected Across Students, Agents, and
                                    Universities
                                </h4> */}
                                <p className="text-gray-300 mb-3">
                                    Built-in chat, notifications, and updates
                                    keep everyone on the same page without
                                    switching platforms. Say goodbye to missed
                                    messages.
                                </p>
                                <p className="text-gray-300">
                                    Faster responses and transparent
                                    communication mean fewer delays, smoother
                                    collaboration, and a better experience for
                                    all stakeholders.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <a
                                        href="#"
                                        className="inline-block rounded-md bg-[#00ED64] px-6 py-3 text-sm font-semibold text-black shadow-lg hover:opacity-90"
                                    >
                                        Learn More
                                    </a>
                                    <a
                                        href="#"
                                        className="inline-block rounded-md border border-gray-700 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                                    >
                                        Documentation
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{
                                    opacity: communicationInView ? 1 : 0,
                                    x: communicationInView ? 0 : 50,
                                }}
                                transition={{
                                    duration: 0.8,
                                    ease: "easeInOut",
                                }}
                                className="w-full md:w-1/2 flex justify-center"
                            >
                                <Image
                                    src={products[4].image}
                                    alt="Seamless Communication"
                                    width={500}
                                    height={500}
                                    className="w-full max-w-[400px] rounded-xl shadow-lg"
                                    style={{ height: "380px" }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
