"use client";
import Image from "next/image";

export default function Hero2() {
    return (
        <section className="relative bg-white text-white z-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-28 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left z-20">
                    <h1 className="text-[#074595] text-4xl md:text-5xl font-extrabold leading-snug">
                        Simplify your{" "}
                        <span className="text-[#ffa81b]">study abroad</span>{" "}
                        applications with{" "}
                        <span className="text-[#ffa81b]">ApplyTech</span>.
                    </h1>
                    <p className="mt-6 text-lg text-gray-400">
                        Manage student, agent, and university applications
                        seamlessly in one platform.
                    </p>
                    <div className="mt-8">
                        <a
                            href="#"
                            className="inline-block bg-[#074595] hover:bg-[#1E4DB7] transition px-6 py-3 rounded-full font-semibold text-white shadow-lg"
                        >
                            Get a free demo →
                        </a>
                    </div>
                </div>

                {/* Right Content (Dashboard Image) */}
                <div className="flex-1 w-full flex justify-center">
                    <div className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
                        {/* <Image
                            src="/site/images/apply-dashboard.png" // replace with your uploaded image
                            alt="Dashboard preview"
                            width={1000}
                            height={800}
                            className="w-full h-auto object-cover"
                        /> */}
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

            {/* Bottom Left Decorative Illustration */}
            <div className="absolute bottom-0 left-0 hidden md:block">
                <Image
                    src="/site/images/university.png" // add your vector city illustration if available
                    alt="University"
                    width={400}
                    height={100}
                    className="opacity-70"
                />
            </div>
        </section>
    );
}
