"use client";

import Image from "next/image";

export default function HeroGrid() {
    return (
        <>
            {/* Right Content (Cards & Images) */}
            <div className="relative h-[580px] w-[650px] flex items-center justify-center mx-auto">
                {/* Background floating cards */}

                {/* Top Left Card */}
                <Image
                    src="/site/images/apply-dash.png"
                    alt="avatar"
                    width={288} // ~ w-72 = 288px
                    height={192} // ~ h-48 = 192px
                    className="absolute top-8 left-4 rounded-2xl shadow-xl w-72 h-48"
                />
                {/* <div className="absolute top-8 left-4 bg-white rounded-2xl shadow-xl w-72 h-48 p-4">
                   
                    <div className="absolute -bottom-5 right-4 h-12 w-12 rounded-full border-4 border-white overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=96&h=96"
                            alt="avatar"
                            width={48}
                            height={48}
                        />
                    </div>
                </div> */}

                {/* Chat bubble Right */}
                <Image
                    src="/site/images/hero-right.png"
                    alt="avatar"
                    width={288}
                    height={192}
                    className="absolute top-24 -right-4 shadow-xl rounded-2xl w-64 h-64"
                />
                {/* <div className="absolute top-24 -right-4 bg-white shadow-xl rounded-2xl px-4 py-3 w-64 h-64">
                    <p className="font-semibold text-md">Zabot</p>
                    <p className="text-sm text-gray-600 mt-1">
                        How are you doing my friend?
                    </p>
                    <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                        <span>AI Answered 40 Messages</span>
                        <span className="font-bold">📊</span>
                    </div>
                </div> */}

                {/* Center Large Card */}
                <Image
                    src="/site/images/hero-middle.png"
                    alt="avatar"
                    width={288}
                    height={192}
                    className="absolute bg-white rounded-2xl shadow-2xl w-64 top-36"
                />
                {/* <div className="absolute bg-white rounded-2xl shadow-2xl w-64 p-5 top-36">
                    <div className="flex justify-center">
                        <Image
                            src="/site/images/hero-center.png"
                            alt="avatar"
                            width={288}
                            height={192}
                            className="absolute top-24 -right-4 shadow-xl rounded-2xl w-64 h-64"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <h3 className="font-semibold text-lg">Ben Timona</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            Hey there! I have a question…
                        </p>
                        <button className="mt-4 bg-indigo-500 text-white px-5 py-2 rounded-xl shadow-md text-sm">
                            Answer
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-3 text-center">
                        08 Jan 2024
                    </p>
                </div> */}

                {/* Bottom Left Bubble */}
                <div className="absolute bottom-68 -left-8 bg-white shadow-lg rounded-xl p-3 w-56 flex gap-3 items-center">
                    <Image
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=48&h=48"
                        alt="avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <p className="text-sm text-gray-700">
                        Process 40% More Student Applications
                    </p>
                </div>

                {/* Bottom Left Avatar */}
                <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96"
                    alt="avatar"
                    width={80}
                    height={80}
                    className="absolute bottom-36 left-16 bg-white shadow-lg w-20 h-20 rounded-full"
                />

                {/* Bottom Center Small Notification */}
                <div className="absolute bottom-0 left-4 bg-white shadow-lg px-5 py-3 rounded-xl text-black w-80 text-sm">
                    Cut Application Processing Time by 40%
                </div>

                {/* Bottom Right Message Card */}
                <div className="absolute bottom-26 -right-6 bg-white shadow-lg rounded-xl p-4 w-48">
                    <p className="text-gray-700 text-sm">
                        Seamless Integration with 300+ Global Institutions
                    </p>
                </div>
            </div>
        </>
    );
}
