// File: components/HeroSection.jsx
import { Star, Play } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="relative bg-[#eff2f6]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left Content */}
                <div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        Everything you need to build a{" "}
                        <span className="text-blue-600">great platform</span>
                    </h1>
                    <p className="mt-4 text-gray-600 text-lg">
                        Our SaaS empowers Study Abroad stakeholders — from{" "}
                        <strong>Students</strong> exploring opportunities,{" "}
                        <strong>Agents</strong> managing applications, to{" "}
                        <strong>Universities</strong> streamlining admissions —
                        all in one platform.
                    </p>

                    {/* CTA buttons */}
                    <div className="mt-6 flex gap-4">
                        <button className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                            Get free trial
                        </button>
                        <button className="px-6 py-3 rounded-full border border-gray-300 text-gray-800 font-medium hover:bg-gray-100 transition flex items-center gap-2">
                            <Play size={18} /> Take a tour
                        </button>
                    </div>

                    <div className="mt-6">
                        <Image
                            src="site/images/Frame-1.svg" // your exported single image
                            alt="Ratings on G2 and Capterra"
                            width={400} // set proper size
                            height={80}
                            className="h-auto w-full max-w-md"
                            priority
                        />
                    </div>
                </div>

                {/* Right Side → Hero Image */}
                <div className="flex justify-center lg:justify-end">
                    <img
                        src="site/images/hero-image.png" // <-- replace with your hero image path
                        alt="Hero illustration"
                        className="w-full max-w-md lg:max-w-lg object-contain"
                    />
                </div>
            </div>
        </section>
    );
}
