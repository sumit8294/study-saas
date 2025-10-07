"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import PartnersSection from "@/components/sections/PartnersSection";
import HeroGrid from "@/components/ui/HeroGrid";

export default function Hero() {
    return (
        <section
            className="relative bg-[#043632] text-white sm:px-8 overflow-x-hidden overflow-y-clip"
            style={{
                borderBottomLeftRadius: "12%",
                borderBottomRightRadius: "12%",
            }}
        >
            <div className="absolute inset-0 pointer-events-none z-10">
                {/* Radial Gradient SVG Background */}
                <div
                    className="absolute xl:left-[calc(calc(100vw_-_1416px)_/_2)] top-[-610px] h-[1800.89px] w-[1840.29px] opacity-[0.15]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 1840.3 1800.9' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(35.627 99.743 -101.93 34.864 920.15 900.44)'><stop stop-color='rgba(83,233,246,1)' offset='0'/><stop stop-color='rgba(83,233,246,0)' offset='0.78125'/></radialGradient></defs></svg>")`,
                    }}
                />
            </div>
            <div className="mx-auto px-6 lg:px-8 pt-4 z-20">
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
                                "Built for Agencies",
                                "Trusted by Institutions",
                                "Driven by AI",
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
                                Request demo
                            </a>
                            <a
                                href="#"
                                className="inline-block rounded-md border border-gray-700 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                            >
                                Contact us
                            </a>
                        </div>
                    </div>

                    <HeroGrid />
                </div>
            </div>
            <PartnersSection />
        </section>
    );
}
