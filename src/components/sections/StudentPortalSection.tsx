"use client";
import Image from "next/image";

export default function StudentPortalSection() {
    return (
        <section className="bg-[#074595] py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
                {/* Left Video (App Preview) */}
                <div className="flex-1 w-full flex justify-center">
                    <div className="w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden bg-[#074595]">
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

                {/* Right Text Content */}
                <div className="flex-1">
                    <h3 className="text-[#ffa81b] text-xl font-semibold mb-3">
                        Student Portal at Your Fingertips
                    </h3>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-snug mb-6">
                        Apply, Shortlist, and Track Your Applications
                    </h2>
                    <p className="text-lg text-white leading-relaxed">
                        Easily create applications, shortlist your preferred
                        programs, and track the progress of your submissions.
                        The{" "}
                        <span className="text-[#ffa81b]">Student Portal</span>{" "}
                        provides a smooth, intuitive experience to manage
                        everything related to your study abroad journey—all in
                        one place.
                    </p>
                </div>
            </div>
        </section>
    );
}
