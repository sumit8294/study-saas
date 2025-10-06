import { Facebook, Instagram, Github, Youtube, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#001e2b] text-gray-400">
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Footer Links */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-10">
                    {/* Brand - Takes more space on the left */}
                    <div className="sm:col-span-4 lg:col-span-4">
                        <div className="flex flex-col gap-6">
                            <div>
                                <img
                                    src="/site/logo.png"
                                    alt="Apply logo"
                                    className="h-16 w-auto"
                                />
                            </div>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                One platform to scale your <br /> student
                                recruitment network.
                            </p>
                            <div className="flex space-x-6 mt-2">
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    <Facebook size={24} />
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    <Instagram size={24} />
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    <Twitter size={24} />
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    <Github size={24} />
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    <Youtube size={24} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Solutions */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <h3 className="text-white font-semibold text-lg mb-6">
                            Solutions
                        </h3>
                        <ul className="space-y-4 text-base">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Marketing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Analytics
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Automation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Commerce
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Insights
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <h3 className="text-white font-semibold text-lg mb-6">
                            Support
                        </h3>
                        <ul className="space-y-4 text-base">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Submit ticket
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Guides
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Help Center
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <h3 className="text-white font-semibold text-lg mb-6">
                            Company
                        </h3>
                        <ul className="space-y-4 text-base">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Jobs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Press
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal - Takes more space on the right to balance */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <h3 className="text-white font-semibold text-lg mb-6">
                            Legal
                        </h3>
                        <ul className="space-y-4 text-base">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Terms of service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Privacy policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    License
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Cookie policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-white transition duration-300"
                                >
                                    Compliance
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-12"></div>

                {/* Bottom Section */}
                <div className="text-center text-base text-gray-500">
                    © 2024 Your Company, Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
