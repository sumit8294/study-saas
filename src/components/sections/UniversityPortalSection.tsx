"use client";
import Image from "next/image";

export default function UniversityPortalSection() {
    return (
        <section className="bg-[#e8f0f9] py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
                {/* Left Text Content */}
                <div className="flex-1">
                    <h3 className="text-[#074595] text-xl font-semibold mb-3">
                        University Panel Simplified
                    </h3>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0B0B] leading-snug mb-6">
                        Manage Applications and Students Efficiently
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Our University Panel allows universities to manage
                        student applications, track progress, and communicate
                        directly with applicants and agents. Streamline
                        admission processes and handle applications with clarity
                        and efficiency.
                    </p>
                </div>

                {/* Right Video (App Preview) */}
                <div className="flex-1 w-full flex justify-center">
                    <div className="w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden bg-white">
                        <video
                            src="/site/videos/agent-portal.mp4" // place your video in public folder
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
