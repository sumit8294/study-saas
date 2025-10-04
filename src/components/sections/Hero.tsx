"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import PartnersSection from "@/components/sections/PartnersSection";

export default function Hero() {
    return (
        <section
            className="relative bg-[#043632] text-white px-8 overflow-x-hidden overflow-y-clip"
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
            <div className="mx-auto px-6 lg:px-8 py-20 pt-4 z-20">
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
                    <div className="relative h-screen w-full flex items-center justify-center">
                        {/* Background floating cards */}

                        {/* Top Left Card */}
                        <div className="absolute top-10 left-0 bg-white rounded-2xl shadow-xl w-80 h-60 p-4">
                            <div className="h-6 w-full bg-gray-200 rounded mb-3"></div>
                            <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                            <div className="absolute -bottom-6 right-4 h-12 w-12 rounded-full border-4 border-white overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100"
                                    alt="avatar"
                                    width={48}
                                    height={48}
                                />
                            </div>
                        </div>

                        {/* Chat bubble Right */}
                        <div className="absolute top-32 -right-0 bg-white shadow-xl rounded-xl px-4 py-3 w-72  h-72">
                            <p className="font-semibold">Zabot</p>
                            <p className="text-sm text-gray-600">
                                How are you doing my friend?
                            </p>
                            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                                <span>AI Answered 40 Messages</span>
                                <span className="font-bold">📊</span>
                            </div>
                        </div>

                        {/* Center Large Card */}
                        <div className="absolute bg-white rounded-2xl shadow-2xl w-72 p-6 top-[210px]">
                            <div className="flex justify-center">
                                <Image
                                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200"
                                    alt="avatar"
                                    width={100}
                                    height={100}
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="font-semibold text-lg">
                                    Ben Timona
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Hey there! I have a question…
                                </p>
                                <button className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-xl shadow-md">
                                    Answer
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-3 text-center">
                                08 Jan 2024
                            </p>
                        </div>

                        {/* Bottom Left Bubble */}
                        <div className="absolute bottom-80 -left-14 bg-white shadow-md rounded-2xl p-3 w-60 flex gap-2 items-center">
                            <Image
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50"
                                alt="avatar"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <p className="text-sm text-gray-700">
                                The work super fast, thank you so much 🙌
                            </p>
                        </div>

                        {/* Bottom Left Bubble */}
                        {/* <div className=""> */}
                        <Image
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50"
                            alt="avatar"
                            width={50}
                            height={50}
                            className="absolute bottom-46 left-10 bg-white shadow-md w-28 h-28 rounded-full "
                        />
                        {/* </div> */}

                        {/* Bottom Center Small Notification */}
                        <div className="absolute bottom-24 left-0 bg-white shadow-lg px-5 py-3 rounded-xl text-black w-96 text-sm">
                            Answered to 12 private messages!
                        </div>

                        {/* Bottom Right Message Card */}
                        <div className="absolute bottom-40 -right-10 bg-white shadow-lg rounded-2xl p-4 w-40">
                            <p className="text-gray-700 text-sm">
                                I have a doubt on campaign?
                            </p>
                            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                <span>2:30pm</span>
                                <span>Seen</span>
                            </div>
                        </div>
                    </div>

                    {/* <div className="grid grid-cols-2 gap-6">
                        
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
                                    Smarter Recruitment
                                </span>
                                <span className="block bg-black text-white px-3 py-1 rounded-full">
                                    Verified Applications
                                </span>
                                <span className="block bg-black text-white px-3 py-1 rounded-full">
                                    Proven Success
                                </span>
                            </div>
                        </div>

                      
                        <div className="bg-[#5B3FFF] rounded-2xl flex items-center justify-center p-6">
                            <Image
                                src="/site/images/student-2.png"
                                alt="Scholar reading"
                                width={200}
                                height={200}
                                className="object-contain"
                            />
                        </div>

                     
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
                    </div> */}
                </div>
            </div>
            <PartnersSection />
        </section>
    );
}
