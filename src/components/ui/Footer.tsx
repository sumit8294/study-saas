import { Facebook, Instagram, Github, Youtube, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#001e2b] text-gray-400">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Footer Links */}
                <div className="grid grid-cols-2 sm:grid-cols-12 gap-8">
                    {/* Brand */}

                    <div className="col-span-3">
                        <div className="flex flex-col gap-4">
                            <div>
                                <img
                                    src="/site/logo.png"
                                    alt="Apply logo"
                                    className="h-16 w-auto"
                                />
                            </div>
                            <p className="mb-0 text-gray-600 dark:text-gray-300">
                                One platform to scale your <br /> student
                                recruitment network.
                            </p>
                            <div className="flex space-x-5 mt-6 md:mt-0">
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    <Facebook size={20} />
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    <Instagram size={20} />
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    <Twitter size={20} />
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    <Github size={20} />
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    <Youtube size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Solutions */}
                    <div className="col-span-2">
                        <h3 className="text-white font-semibold mb-4">
                            Solutions
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Marketing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Analytics
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Automation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Commerce
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Insights
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-span-2">
                        <h3 className="text-white font-semibold mb-4">
                            Support
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Submit ticket
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Guides
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="col-span-2">
                        <h3 className="text-white font-semibold mb-4">
                            Company
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Jobs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Press
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="col-span-2">
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Terms of service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Privacy policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    License
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-8"></div>

                {/* Bottom Section */}
                <div className="text-center text-sm text-gray-500">
                    © 2024 Your Company, Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
