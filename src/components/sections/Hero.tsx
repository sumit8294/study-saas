"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function Hero() {
    return (
        <section className="isolate bg-[#043632] text-white px-8">
            {/* <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                    className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
                />
            </div> */}

            <div className="absolute inset-0 pointer-events-none z-10">
                {/* Radial Gradient SVG Background */}
                <div
                    className="absolute xl:left-[calc(calc(100vw_-_1416px)_/_2)] top-[-610px] h-[1800.89px] w-[1840.29px] opacity-[0.15]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 1840.3 1800.9' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(35.627 99.743 -101.93 34.864 920.15 900.44)'><stop stop-color='rgba(83,233,246,1)' offset='0'/><stop stop-color='rgba(83,233,246,0)' offset='0.78125'/></radialGradient></defs></svg>")`,
                    }}
                />
            </div>
            <div className="mx-auto px-6 lg:px-8 py-20 z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div>
                        <p className="text-sm font-medium text-[#00ED64] mb-3">
                            Embark Upon a Journey of Wisdom
                        </p>
                        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
                            One platform to scale your student recruitment
                            network.
                        </h1>
                        <p className="text-lg text-gray-400 mb-8">
                            Centralize applications, manage sub-agents, and
                            track student success—all on one compliant, fast
                            system.
                        </p>

                        {/* Features List */}
                        <ul className="space-y-3 mb-8">
                            {[
                                "Masters of Knowledge",
                                "Lessons at Your Leisure",
                                "Fellowship of Scholars",
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center space-x-2"
                                >
                                    <CheckCircle
                                        className="text-green-500"
                                        size={20}
                                    />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="#"
                                className="inline-block rounded-md bg-[#00ED64] px-6 py-3 text-sm font-semibold text-black shadow-lg hover:opacity-90"
                            >
                                Start Your Free 14-Day Trial
                            </a>
                            <a
                                href="#"
                                className="inline-block rounded-md border border-gray-700 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                            >
                                Request a Demo
                            </a>
                        </div>
                    </div>

                    {/* Right Content (Cards & Images) */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Top Right Scholar */}
                        <div className="col-span-2 md:col-span-1 bg-[#F7931A] rounded-2xl flex items-center justify-center relative p-6">
                            <Image
                                src="/site/images/student-1.png"
                                alt="Scholar with manuscripts"
                                width={250}
                                height={250}
                                className="object-contain"
                            />
                            <div className="absolute top-4 right-4 space-y-2 text-sm">
                                <span className="block bg-black text-white px-3 py-1 rounded-full">
                                    50+ Manuscripts
                                </span>
                                <span className="block bg-black text-white px-3 py-1 rounded-full">
                                    Certified Scrolls
                                </span>
                                <span className="block bg-black text-white px-3 py-1 rounded-full">
                                    Noble Studies
                                </span>
                            </div>
                        </div>

                        {/* Bottom Left Scholar */}
                        <div className="bg-[#5B3FFF] rounded-2xl flex items-center justify-center p-6">
                            <Image
                                src="/site/images/student-2.png"
                                alt="Scholar reading"
                                width={200}
                                height={200}
                                className="object-contain"
                            />
                        </div>

                        {/* Bottom Right Stats */}
                        <div className="bg-[#FF7A59] rounded-2xl flex flex-col justify-center items-start p-6">
                            <div className="flex -space-x-2 mb-2">
                                <Image
                                    src="/site/images/user1.png"
                                    alt="disciple1"
                                    width={32}
                                    height={32}
                                    className="rounded-full border-2 border-[#121212]"
                                />
                                <Image
                                    src="/site/images/user2.png"
                                    alt="disciple2"
                                    width={32}
                                    height={32}
                                    className="rounded-full border-2 border-[#121212]"
                                />
                                <Image
                                    src="/site/images/user3.png"
                                    alt="disciple3"
                                    width={32}
                                    height={32}
                                    className="rounded-full border-2 border-[#121212]"
                                />
                            </div>
                            <p className="text-2xl font-bold">70,324+</p>
                            <p className="text-sm text-gray-200">
                                Scholars Guided by Our Academy
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
