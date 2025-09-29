"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Info,
    HelpCircle,
    Briefcase,
    Star,
    Rocket,
    Eye,
    DollarSign,
    Newspaper,
    Mail,
    Code,
    Zap,
    Asterisk,
    Hourglass,
} from "lucide-react";

interface SidebarItem {
    name: string;
    href: string;
    icon: React.ElementType;
}

const sidebarItems: SidebarItem[] = [
    { name: "Hero", href: "/admin/settings/hero", icon: LayoutDashboard },
    { name: "About Us", href: "/admin/settings/about-us", icon: Info },
    { name: "Why Us", href: "/admin/settings/why-us", icon: HelpCircle },
    {
        name: "Business Start",
        href: "/admin/settings/business-start",
        icon: Briefcase,
    },
    { name: "Features", href: "/admin/settings/features", icon: Asterisk },
    { name: "Explorers", href: "/admin/settings/explorers", icon: Zap },
    {
        name: "All Features",
        href: "/admin/settings/all-features",
        icon: Hourglass,
    },
    { name: "CTA Area", href: "/admin/settings/cta", icon: Rocket },
    {
        name: "Software Overview",
        href: "/admin/settings/software-overview",
        icon: Eye,
    },
    {
        name: "Pricing Plan",
        href: "/admin/settings/pricing-plan",
        icon: DollarSign,
    },
    { name: "Testimonial", href: "/admin/settings/testimonial", icon: Star },
    { name: "Brands", href: "/admin/settings/brands", icon: Newspaper },
    { name: "Newsletter", href: "/admin/settings/newsletter", icon: Mail },
    { name: "Custom HTML", href: "/admin/settings/custom-html", icon: Code },
];

export default function SettingsSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-full md:w-64 lg:w-72 bg-[#111827] border border-white/10 rounded-xl shadow-lg p-4">
            <div className="mb-4 border-b border-gray-800 pb-3">
                <h2 className="text-lg font-semibold text-white">
                    Landing Page Settings
                </h2>
            </div>

            <nav className="space-y-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                                isActive
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
