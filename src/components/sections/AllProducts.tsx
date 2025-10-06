"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const products = [
    {
        id: "student",
        title: "Student Portal",
        description:
            "Access 20,000+ courses, apply with ease, track your application, and get expert guidance at every step.",
        image: "/site/images/products/university-light.jpg",
    },
    {
        id: "agent",
        title: "Agent Portal",
        description:
            "Manage student profiles, track applications, and collaborate with universities all in one place.",
        image: "/site/images/products/university-light.jpg",
    },
    {
        id: "university",
        title: "University Portal",
        description:
            "Engage with students and agents, manage courses, and streamline the entire admission process.",
        image: "/site/images/products/university-light.jpg",
    },
];

export default function AllProducts() {
    const { ref: studentRef, inView: studentInView } = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });

    return (
        <section className="relative isolate w-full text-white py-20 lg:pb-8 px-4 sm:px-6 lg:px-8 mt-10">
            <div className="max-w-7xl mx-auto z-10">
                <div
                    ref={studentRef}
                    id="student"
                    className="min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 bg-[#061621] rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 py-8 sm:py-12 lg:py-16 mb-12 sm:mb-16 lg:mb-0"
                >
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{
                            opacity: studentInView ? 1 : 0,
                            x: studentInView ? 0 : -30,
                        }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2 text-center lg:text-left flex flex-col justify-center"
                    >
                        <h4 className="text-[#00ed64] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                            The Complete Student Recruitment Package
                        </h4>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                            One platform with 4 connected portals—designed for
                            students, agents, universities, and managed
                            seamlessly by admin.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
                            <a
                                href="#"
                                className="inline-block rounded-md bg-[#00ED64] px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-black shadow-lg hover:opacity-90 transition-opacity duration-200 text-center"
                            >
                                Request a Demo
                            </a>
                            <a
                                href="#"
                                className="inline-block rounded-md border border-[#00ED64] px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-[#00ED64] hover:bg-[#00ED64] hover:text-black transition-all duration-200 text-center"
                            >
                                Learn More
                            </a>
                        </div>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{
                            opacity: studentInView ? 1 : 0,
                            x: studentInView ? 0 : 30,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="w-full lg:w-1/2 flex justify-center items-center"
                    >
                        <div className="w-full max-w-lg">
                            {/* Main Image */}
                            <div className="mb-4 sm:mb-6">
                                <Image
                                    src={products[0].image}
                                    alt="Student Portal"
                                    width={600}
                                    height={400}
                                    className="w-full h-auto rounded-lg sm:rounded-xl shadow-lg"
                                    style={{
                                        maxHeight: "300px",
                                        objectFit: "cover",
                                    }}
                                    priority
                                />
                            </div>

                            {/* Thumbnail Images */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="aspect-video">
                                        <Image
                                            src={products[0].image}
                                            alt={`Student Portal ${item}`}
                                            width={200}
                                            height={150}
                                            className="w-full h-full rounded-lg shadow-lg object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Optional: Product indicators */}
                            <div className="flex justify-center lg:justify-start gap-2 mt-4 sm:mt-6">
                                {products.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center gap-2 text-xs sm:text-sm text-gray-400"
                                    >
                                        <div
                                            className={`w-2 h-2 rounded-full ${
                                                index === 0
                                                    ? "bg-[#00ED64]"
                                                    : "bg-gray-600"
                                            }`}
                                        />
                                        <span>{product.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Additional Products Section for smaller screens */}
                {/* <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-[#061621] rounded-xl p-4 sm:p-6 text-center"
                        >
                            <h5 className="text-[#00ed64] text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                                {product.title}
                            </h5>
                            <p className="text-gray-300 text-sm sm:text-base">
                                {product.description}
                            </p>
                        </motion.div>
                    ))}
                </div> */}
            </div>

            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-0 -right-40 w-80 h-80 bg-[#00ED64] opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 -left-40 w-80 h-80 bg-[#00ED64] opacity-5 rounded-full blur-3xl"></div>
            </div>
        </section>
    );
}
