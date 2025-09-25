"use client";
import Image from "next/image";

export default function AgentPortalSection() {
    return (
        <section className="bg-[#d9e6f7] py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
                {/* Left Text Content */}
                <div className="flex-1">
                    <h3 className="text-[#074595] text-xl font-semibold mb-3">
                        Agent Portal in seconds
                    </h3>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0B0B] leading-snug mb-6">
                        Manage Students and Applications with Ease
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        From managing students to providing them access to their
                        platform, and creating applications directly with
                        universities—our Agent Portal makes the entire process
                        seamless and efficient. Handle applications, track
                        progress, and support students all in one place.
                    </p>
                </div>

                {/* Right Image (App Preview) */}
                <div className="flex-1 w-full flex justify-center">
                    <div className="w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden bg-white">
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
            </div>
        </section>
    );
}
