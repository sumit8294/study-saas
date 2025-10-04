"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, Globe, Search } from "lucide-react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { name: "Products", dropdown: true },
        { name: "Resources", dropdown: true },
        { name: "Solutions", dropdown: true },
        { name: "Company", dropdown: true },
        { name: "Pricing", dropdown: false },
    ];

    return (
        <header className="bg-[#121212] text-white sticky top-0 z-50">
            <nav className="mx-auto max-w-7xl flex items-center justify-between py-4">
                <div className="flex">
                    {/* Logo */}
                    <div className="flex items-center flex-1 mr-8">
                        <a href="#" className="flex items-center space-x-2">
                            <img
                                src="/site/logo.png"
                                alt="MongoDB"
                                className="h-16 w-auto"
                            />
                        </a>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) =>
                            item.dropdown ? (
                                <button
                                    key={item.name}
                                    className="flex items-center space-x-1 text-sm font-medium hover:text-gray-300"
                                >
                                    <span>{item.name}</span>
                                    <ChevronDown
                                        size={16}
                                        className="text-gray-400"
                                    />
                                </button>
                            ) : (
                                <a
                                    key={item.name}
                                    href="#"
                                    className="text-sm font-medium hover:text-gray-300"
                                >
                                    {item.name}
                                </a>
                            )
                        )}
                    </div>
                </div>

                {/* Right side buttons */}
                <div className="hidden lg:flex items-center space-x-6">
                    <button className="hover:text-gray-300">
                        <Search size={18} />
                    </button>
                    <button className="flex items-center space-x-1 hover:text-gray-300">
                        <Globe size={18} />
                        <span className="text-sm">Eng</span>
                    </button>
                    <a
                        href="#"
                        className="text-sm font-medium hover:text-gray-300"
                    >
                        Support
                    </a>
                    <a
                        href="#"
                        className="text-sm font-medium hover:text-gray-300"
                    >
                        Sign In
                    </a>
                    <a
                        href="#"
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 font-semibold text-white px-4 py-2 rounded-md  text-sm "
                    >
                        Get Started
                    </a>
                </div>

                {/* Mobile button */}
                <div className="lg:hidden flex">
                    <button onClick={() => setMobileMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-[#121212] z-50 px-6 py-4">
                    <div className="flex justify-between items-center mb-6">
                        <img
                            src="https://webimages.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png"
                            alt="MongoDB"
                            className="h-6 w-auto"
                        />
                        <button onClick={() => setMobileMenuOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {navItems.map((item) =>
                            item.dropdown ? (
                                <button
                                    key={item.name}
                                    className="flex w-full items-center justify-between text-base font-medium hover:text-gray-300"
                                >
                                    {item.name}
                                    <ChevronDown
                                        size={16}
                                        className="text-gray-400"
                                    />
                                </button>
                            ) : (
                                <a
                                    key={item.name}
                                    href="#"
                                    className="block text-base font-medium hover:text-gray-300"
                                >
                                    {item.name}
                                </a>
                            )
                        )}
                    </div>

                    <div className="mt-6 space-y-4">
                        <a
                            href="#"
                            className="block text-base font-medium hover:text-gray-300"
                        >
                            Support
                        </a>
                        <a
                            href="#"
                            className="block text-base font-medium hover:text-gray-300"
                        >
                            Sign In
                        </a>
                        <a
                            href="#"
                            className="block text-center bg-[#00ED64] text-black px-4 py-2 rounded-md font-semibold text-sm hover:bg-[#00d45a]"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
