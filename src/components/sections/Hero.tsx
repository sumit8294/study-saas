"use client";

import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative bg-[#0B0F19]">
            <div className="relative isolate px-6 lg:px-8">
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-24 sm:py-32">
                    {/* Left Text Content */}
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                            The All-In-One Platform to Scale Your Student
                            Recruitment Network.
                        </h1>
                        <p className="text-lg text-gray-300 mb-8">
                            Centralize applications, manage sub-agents, and
                            track student success—all on one compliant, fast
                            system.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <a
                                href="#"
                                className="inline-block rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-400"
                            >
                                Start Your Free 14-Day Trial
                            </a>
                            <a
                                href="#"
                                className="inline-block rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                            >
                                Request a Demo
                            </a>
                        </div>
                    </div>

                    {/* Right Image Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="/site/images/hero-11.png"
                            alt="Student team"
                            className="rounded-xl shadow-lg object-cover w-full h-52"
                        />
                        <img
                            src="/site/images/hero-12.png"
                            alt="Agent meeting"
                            className="rounded-xl shadow-lg object-cover w-full h-52"
                        />
                        <img
                            src="/site/images/hero-13.png"
                            alt="Students working"
                            className="rounded-xl shadow-lg object-cover w-full h-52"
                        />
                        <img
                            src="/site/images/hero-14.png"
                            alt="Presentation"
                            className="rounded-xl shadow-lg object-cover w-full h-52"
                        />
                    </div>
                </div>

                {/* Decorative background gradient blur */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
            </div>
        </section>
    );
}
