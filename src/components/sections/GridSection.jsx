import Image from "next/image";

export default function TestimonialsSection() {
    return (
        <section className="relative bg-[#0B1220] py-20 px-6">
            <div className="max-w-7xl mx-auto text-center">
                {/* Header */}
                <p className="text-indigo-400 font-medium tracking-wide">
                    Testimonials
                </p>
                <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
                    We have worked with <br /> thousands of amazing agencies
                </h2>

                {/* Testimonials Grid */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Reusable Card Component */}
                    {[
                        {
                            text: "Our sub-agents love the system! Training now takes minutes, not days.",
                            name: "Leslie Alexander",
                            handle: "@lesliealexander",
                            img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
                        },
                        {
                            text: "We increased our application volume by 30% in just three months. The automation tools saved countless hours for our team and sub-agents.",
                            name: "Brenna Goyette",
                            handle: "@brennagoyette",
                            img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=100&q=80",
                            large: true,
                            company: "EduGlobal Agency",
                        },
                        {
                            text: "Before, tracking commissions was chaos. Now it's completely transparent.",
                            name: "Leonard Krasner",
                            handle: "@leonardkrasner",
                            img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=100&q=80",
                        },
                        {
                            text: "Scaling our agency is easier than ever — we close applications 50% faster now.",
                            name: "Michael Foster",
                            handle: "@michaelfoster",
                            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
                        },
                        {
                            text: "Our students love the portal — it's user-friendly and professional.",
                            name: "Lindsay Walton",
                            handle: "@lindsaywalton",
                            img: "https://images.unsplash.com/photo-1546456073-6712f79251bb?auto=format&fit=crop&w=100&q=80",
                        },
                        {
                            text: "The easiest and most effective software we've ever used.",
                            name: "Tom Cook",
                            handle: "@tomcook",
                            img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
                        },
                        {
                            text: "Onboarding new agents is a breeze now, and our workflow efficiency is at an all-time high.",
                            name: "Floyd Miles",
                            handle: "@floydmiles",
                            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
                        },
                    ].map((t, i) => (
                        <div
                            key={i}
                            className={`bg-[#121a2c] rounded-2xl shadow-lg flex flex-col justify-between p-6 ${
                                t.large ? "md:col-span-2 lg:col-span-2 p-8" : ""
                            }`}
                        >
                            <p
                                className={`text-gray-100 italic ${
                                    t.large
                                        ? "text-xl md:text-2xl font-medium leading-relaxed"
                                        : "text-lg"
                                }`}
                            >
                                "{t.text}"
                            </p>
                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={t.img}
                                        alt={t.name}
                                        width={t.large ? 48 : 40}
                                        height={t.large ? 48 : 40}
                                        className="rounded-full object-cover h-20 w-20"
                                    />
                                    <div className="text-left">
                                        <p className="text-white font-semibold text-sm">
                                            {t.name}
                                        </p>
                                        <p className="text-gray-400 text-xs">
                                            {t.handle}
                                        </p>
                                    </div>
                                </div>
                                {t.company && (
                                    <div className="text-gray-400 text-sm font-semibold">
                                        {t.company}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
