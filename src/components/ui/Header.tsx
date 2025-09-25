"use client";
import { useEffect, useState } from "react";
import {
    Briefcase,
    Users,
    Clock,
    FileText,
    GraduationCap,
    ShieldCheck,
    ShoppingBag,
    Target,
    ChevronDown,
} from "lucide-react";
import TopBar from "./TopBar";

export default function Header() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const [showTopBar, setShowTopBar] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShowTopBar(false);
            } else {
                setShowTopBar(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = [
        { label: "Products", href: "#", hasDropdown: true },
        { label: "Customers", href: "#" },
        { label: "Plans & Pricing", href: "#" },
        { label: "About", href: "#" },
        { label: "Partners", href: "#" },
        { label: "Resources", href: "#" },
        { label: "Careers", href: "#" },
    ];

    const dropdownItems = [
        {
            icon: (
                <Briefcase className="text-sky-500 bg-sky-100 h-10 w-10 p-2 rounded-full" />
            ),
            title: "Student Panel",
            desc: "Track applications, documents and progress",
        },
        {
            icon: (
                <Users className=" text-pink-500 bg-pink-100 h-10 w-10 p-2 rounded-full" />
            ),
            title: "Agent Panel",
            desc: "Manage student admissions and submissions",
        },
        {
            icon: (
                <Clock className=" text-yellow-500 bg-yellow-100 h-10 w-10 p-2 rounded-full" />
            ),
            title: "University Panel",
            desc: "Streamline admissions and review process",
        },
        {
            icon: (
                <FileText className=" text-orange-500 bg-orange-100 h-10 w-10 p-2 rounded-full" />
            ),
            title: "Applications & Docs",
            desc: "Handle files and approvals efficiently",
        },
        {
            icon: (
                <GraduationCap className="text-sky-400 bg-sky-100 h-10 w-10 p-2 rounded-full" />
            ),
            title: "Learning & Support",
            desc: "Train and guide applicants effortlessly",
        },
        {
            icon: (
                <Target className=" text-red-500 bg-red-100 h-10 w-10 p-2 rounded-full" />
            ),
            title: "Performance & Goals",
            desc: "Track progress, goals and feedback",
        },
    ];

    return (
        <header className="bg-white shadow-md fixed w-full z-50">
            <TopBar show={showTopBar} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <h3 className="text-xl font-bold text-[#074595]">
                            Apply Tech
                        </h3>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-6 items-center relative">
                        {menuItems.map((item) =>
                            item.hasDropdown ? (
                                <div
                                    key={item.label}
                                    className="relative group"
                                    onMouseEnter={() => setDropdownOpen(true)}
                                    onMouseLeave={() => setDropdownOpen(false)}
                                >
                                    <button className="text-[#074595] hover:text-blue-600 font-bold transition inline-flex items-center gap-1">
                                        {item.label}{" "}
                                        <ChevronDown className="w-4 h-4" />
                                    </button>

                                    {/* Dropdown */}
                                    {isDropdownOpen && (
                                        <div className="absolute left-0 w-[700px] bg-white shadow-xl rounded-lg p-6 grid grid-cols-2 gap-6 z-50">
                                            {dropdownItems.map((drop, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded-md transition"
                                                >
                                                    {drop.icon}
                                                    <div className="cursor-pointer">
                                                        <h4 className="font-semibold text-gray-800">
                                                            {drop.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            {drop.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* bottom row */}
                                            <div className="col-span-2 border-t pt-4 flex justify-between">
                                                <div className="flex items-center gap-2">
                                                    <ShoppingBag className="w-5 h-5 text-sky-500" />
                                                    <span className="text-gray-700 font-medium">
                                                        Marketplace
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                                                    <span className="text-gray-700 font-medium">
                                                        Data Protection
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-[#074595] hover:text-blue-600 font-bold transition"
                                >
                                    {item.label}
                                </a>
                            )
                        )}
                        <a
                            href="#demo"
                            className="ml-4 px-4 py-2 bg-[#FFA81B] text-white rounded-full font-bold hover:bg-[#FFA81B] transition"
                        >
                            Request Demo
                        </a>
                        <a
                            href="#login"
                            className="ml-2 px-4 py-2 border border-[#074595] text-[#074595] font-bold rounded-full hover:bg-blue-50 transition"
                        >
                            Log In
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <nav className="px-4 py-4 space-y-2 flex flex-col">
                        {menuItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href="#demo"
                            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                        >
                            Request demo
                        </a>
                        <a
                            href="#login"
                            className="mt-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                        >
                            Log In
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
