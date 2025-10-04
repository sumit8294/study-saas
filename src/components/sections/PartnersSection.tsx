"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const ClientLogosSection = () => {
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        // Duplicate the content for seamless loop
        const content = Array.from(scroller.children);
        content.forEach((item) => {
            const duplicated = item.cloneNode(true) as HTMLElement;
            duplicated.setAttribute("aria-hidden", "true");
            scroller.appendChild(duplicated);
        });

        // Continuous scroll animation
        let animationId: number;
        const animateScroll = () => {
            if (scroller) {
                scroller.scrollLeft += 1;
                // Reset to start when reaching the duplicated content
                if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
                    scroller.scrollLeft = 0;
                }
            }
            animationId = requestAnimationFrame(animateScroll);
        };

        // Start animation
        animationId = requestAnimationFrame(animateScroll);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, []);

    const clients = [
        // {
        //     src: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
        //     alt: "MongoDB",
        // },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
            alt: "Tailwind CSS",
        },

        {
            src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
            alt: "Netflix",
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png",
            alt: "Google",
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
            alt: "Amazon",
        },
        {
            src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
            alt: "Microsoft",
        },
    ];

    return (
        <section>
            <div className="relative overflow-hidden bg-[#043632] py-16">
                {/* Particles animation background - you can add canvas animation later */}
                <div className="absolute inset-0 opacity-10" aria-hidden="true">
                    {/* Canvas for particles would go here */}
                    <div className="absolute inset-0" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4">
                    <div className="relative">
                        {/* Scrolling client logos */}
                        <div
                            ref={scrollerRef}
                            className="flex space-x-8 overflow-x-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                        >
                            <ul className="flex min-w-full shrink-0 animate-infinite-scroll items-center justify-around gap-8">
                                {clients.map((client, index) => (
                                    <li key={index} className="flex-shrink-0">
                                        <div className="relative h-12 w-32 transition-all duration-300 ">
                                            <Image
                                                src={client.src}
                                                alt={client.alt}
                                                fill
                                                className="object-contain"
                                                sizes="128px"
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientLogosSection;
