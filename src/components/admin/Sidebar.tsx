"use client";
import { useState, useRef } from "react";
import {
    HomeIcon,
    UsersIcon,
    CurrencyDollarIcon,
    UserIcon,
    TicketIcon,
    BuildingLibraryIcon,
    Cog6ToothIcon,
    ArrowLeftIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CreditCardIcon,
    DocumentDuplicateIcon,
    NewspaperIcon,
    GiftIcon,
    CloudArrowUpIcon,
    BellIcon,
    BookOpenIcon,
    TrashIcon,
    InformationCircleIcon,
    ArrowDownTrayIcon,
    Bars2Icon,
} from "@heroicons/react/24/outline";
import { Menu } from "lucide-react";

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
    const [openPricing, setOpenPricing] = useState(false);
    const [openSubscription, setOpenSubscription] = useState(false);
    const [openDomain, setOpenDomain] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const [openResources, setOpenResources] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const navigationItems = {
        overview: [
            {
                name: "Dashboard",
                href: "/admin",
                icon: HomeIcon,
                current: true,
            },
            {
                name: "Go To Landing Page",
                href: "/",
                icon: ArrowLeftIcon,
            },
        ],
        saas: [
            {
                name: "Pricing",
                icon: CurrencyDollarIcon,
                children: [
                    { name: "Plans", href: "/admin/plans" },
                    { name: "Plan Features", href: "/admin/features" },
                ],
            },
            {
                name: "Tenants",
                href: "/admin/tenants",
                icon: UsersIcon,
            },
            {
                name: "Subscription",
                icon: CreditCardIcon,
                children: [
                    { name: "All Subscriptions", href: "/admin/subscriptions" },
                    {
                        name: "Subscriptions Requests",
                        href: "/admin/subscriptions/requests",
                    },
                ],
            },
            {
                name: "Payments",
                href: "/admin/payments",
                icon: CurrencyDollarIcon,
            },
            {
                name: "Domain Management",
                icon: BuildingLibraryIcon,
                children: [
                    { name: "All Domains", href: "/admin/domains" },
                    {
                        name: "Domain Requests",
                        href: "/admin/domains/requests",
                    },
                ],
            },
            {
                name: "Promotion",
                href: "/admin/newsletters/create",
                icon: GiftIcon,
            },
        ],
        cms: [
            {
                name: "Landing Page",
                href: "/admin/settings/hero",
                icon: NewspaperIcon,
            },
            {
                name: "Pages",
                href: "/admin/pages",
                icon: DocumentDuplicateIcon,
            },
            {
                name: "Subscribers",
                href: "/admin/newsletters",
                icon: TicketIcon,
            },
        ],
        others: [
            {
                name: "Setup",
                href: "/admin/setup/general",
                icon: Cog6ToothIcon,
            },
            {
                name: "Activity Log",
                href: "/admin/activity-log",
                icon: BellIcon,
            },
            {
                name: "Update Application",
                href: "/admin/application-update",
                icon: CloudArrowUpIcon,
            },
            {
                name: "Account",
                icon: UserIcon,
                children: [
                    { name: "Profile", href: "/admin/profile" },
                    { name: "Logout", href: "#" },
                ],
            },
            {
                name: "Resources",
                icon: BookOpenIcon,
                children: [
                    {
                        name: "System Info",
                        href: "/admin/system-info",
                        icon: InformationCircleIcon,
                    },
                    {
                        name: "Clear Cache",
                        href: "#!",
                        icon: TrashIcon,
                    },
                    {
                        name: "Database Backup",
                        href: "/admin/backup",
                        icon: ArrowDownTrayIcon,
                    },
                    { name: "Documentation", href: "#", target: "_blank" },
                    { name: "Support", href: "#", target: "_blank" },
                ],
            },
        ],
    };

    const handleMouseEnter = (itemName: string) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setHoveredItem(itemName);
    };

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredItem(null);
        }, 150); // Small delay to allow moving to tooltip
    };

    const handleTooltipMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
    };

    const handleTooltipMouseLeave = () => {
        setHoveredItem(null);
    };

    const toggleDropdown = (dropdown: string) => {
        switch (dropdown) {
            case "pricing":
                setOpenPricing(!openPricing);
                break;
            case "subscription":
                setOpenSubscription(!openSubscription);
                break;
            case "domain management":
                setOpenDomain(!openDomain);
                break;
            case "account":
                setOpenAccount(!openAccount);
                break;
            case "resources":
                setOpenResources(!openResources);
                break;
        }
    };

    const renderMenuSection = (
        title: string,
        items: any[],
        sectionKey: string
    ) => (
        <>
            {!isCollapsed && (
                <div className="text-gray-400 text-xs uppercase font-bold px-3 mt-3">
                    {title}
                </div>
            )}

            {items.map((item, index) => (
                <div
                    key={`${sectionKey}-${index}`}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                >
                    {item.children ? (
                        // Dropdown item
                        <div>
                            <button
                                onClick={() =>
                                    toggleDropdown(item.name.toLowerCase())
                                }
                                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-[#1F2937] transition-colors duration-200 ${
                                    isCollapsed ? "justify-center" : ""
                                }`}
                            >
                                <div
                                    className={`flex items-center ${
                                        isCollapsed ? "justify-center" : ""
                                    }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {!isCollapsed && (
                                        <span className="ml-3">
                                            {item.name}
                                        </span>
                                    )}
                                </div>
                                {!isCollapsed &&
                                    (item.name.toLowerCase() === "pricing" ? (
                                        openPricing ? (
                                            <ChevronDownIcon className="h-4 w-4" />
                                        ) : (
                                            <ChevronRightIcon className="h-4 w-4" />
                                        )
                                    ) : item.name.toLowerCase() ===
                                      "subscription" ? (
                                        openSubscription ? (
                                            <ChevronDownIcon className="h-4 w-4" />
                                        ) : (
                                            <ChevronRightIcon className="h-4 w-4" />
                                        )
                                    ) : item.name.toLowerCase() ===
                                      "domain management" ? (
                                        openDomain ? (
                                            <ChevronDownIcon className="h-4 w-4" />
                                        ) : (
                                            <ChevronRightIcon className="h-4 w-4" />
                                        )
                                    ) : item.name.toLowerCase() ===
                                      "account" ? (
                                        openAccount ? (
                                            <ChevronDownIcon className="h-4 w-4" />
                                        ) : (
                                            <ChevronRightIcon className="h-4 w-4" />
                                        )
                                    ) : item.name.toLowerCase() ===
                                      "resources" ? (
                                        openResources ? (
                                            <ChevronDownIcon className="h-4 w-4" />
                                        ) : (
                                            <ChevronRightIcon className="h-4 w-4" />
                                        )
                                    ) : null)}
                            </button>

                            {/* Hover tooltip for collapsed state */}
                            {isCollapsed && hoveredItem === item.name && (
                                <div
                                    className="absolute left-full top-0 ml-1 z-50"
                                    onMouseEnter={handleTooltipMouseEnter}
                                    onMouseLeave={handleTooltipMouseLeave}
                                >
                                    <div className="bg-[#1F2937] text-white rounded-lg shadow-lg py-1 min-w-48 border border-gray-600">
                                        <div className="px-3 py-2 font-medium border-b border-gray-600">
                                            {item.name}
                                        </div>
                                        {item.children.map(
                                            (
                                                child: any,
                                                childIndex: number
                                            ) => (
                                                <a
                                                    key={childIndex}
                                                    href={child.href}
                                                    target={child.target}
                                                    className="flex items-center px-3 py-2 text-sm hover:bg-[#374151] transition-colors duration-200"
                                                    onClick={() =>
                                                        setHoveredItem(null)
                                                    }
                                                >
                                                    {child.icon && (
                                                        <child.icon className="h-4 w-4 mr-2" />
                                                    )}
                                                    {child.name}
                                                </a>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Regular dropdown for expanded state */}
                            {!isCollapsed &&
                                ((item.name.toLowerCase() === "pricing" &&
                                    openPricing) ||
                                    (item.name.toLowerCase() ===
                                        "subscription" &&
                                        openSubscription) ||
                                    (item.name.toLowerCase() ===
                                        "domain management" &&
                                        openDomain) ||
                                    (item.name.toLowerCase() === "account" &&
                                        openAccount) ||
                                    (item.name.toLowerCase() === "resources" &&
                                        openResources)) && (
                                    <div className="ml-10 mt-1 space-y-1 text-sm">
                                        {item.children.map(
                                            (
                                                child: any,
                                                childIndex: number
                                            ) => (
                                                <a
                                                    key={childIndex}
                                                    href={child.href}
                                                    target={child.target}
                                                    className="flex items-center hover:text-white px-3 py-2 rounded-lg hover:bg-[#1F2937] transition-colors duration-200"
                                                >
                                                    {child.icon && (
                                                        <child.icon className="h-4 w-4 mr-2" />
                                                    )}
                                                    {child.name}
                                                </a>
                                            )
                                        )}
                                    </div>
                                )}
                        </div>
                    ) : (
                        // Regular link item
                        <a
                            href={item.href}
                            className={`flex items-center px-3 py-2 rounded-lg hover:bg-[#1F2937] transition-colors duration-200 ${
                                item.current
                                    ? "text-white font-medium bg-[#1F2937]"
                                    : ""
                            } ${isCollapsed ? "justify-center" : ""}`}
                        >
                            <item.icon className="h-5 w-5" />
                            {!isCollapsed && (
                                <span className="ml-3">{item.name}</span>
                            )}

                            {/* Hover tooltip for collapsed state */}
                            {isCollapsed && hoveredItem === item.name && (
                                <div
                                    className="absolute left-full top-1/2 transform -translate-y-1/2 ml-1 z-50"
                                    onMouseEnter={handleTooltipMouseEnter}
                                    onMouseLeave={handleTooltipMouseLeave}
                                >
                                    <div className="bg-[#1F2937] text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap border border-gray-600">
                                        {item.name}
                                    </div>
                                </div>
                            )}
                        </a>
                    )}
                </div>
            ))}
        </>
    );

    return (
        <div
            className={`h-screen bg-[#111827] text-gray-300 flex flex-col border-r border-white/10 transition-all duration-300 ${
                isCollapsed ? "w-16" : "w-64"
            }`}
        >
            {/* Logo Section */}
            <div className="flex items-center px-2 py-2 mt-2 justify-center h-16">
                {isCollapsed ? (
                    <img
                        src="/site/logo.png"
                        alt="Apply Logo"
                        className="w-10"
                    />
                ) : (
                    <img
                        src="/site/logo.png"
                        alt="Apply Logo"
                        className="w-16"
                    />
                )}
            </div>

            {/* Toggle Button */}
            {/* Navigation Header with integrated toggle when collapsed */}
            <div className="relative">
                {isCollapsed ? (
                    // When sidebar is collapsed: Toggle button inside nav area
                    <div className="flex items-center justify-center py-3">
                        <button
                            onClick={onToggle}
                            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#1F2937] transition-colors duration-200 group"
                            onMouseEnter={() => handleMouseEnter("toggle")}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Menu className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />

                            {/* Tooltip for toggle button */}
                            {hoveredItem === "toggle" && (
                                <div
                                    className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 z-50"
                                    onMouseEnter={handleTooltipMouseEnter}
                                    onMouseLeave={handleTooltipMouseLeave}
                                >
                                    <div className="bg-[#1F2937] text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap border border-gray-600">
                                        Expand Sidebar
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                ) : (
                    // When sidebar is expanded: Regular header with edge toggle button
                    <div className="px-3 py-2 relative">
                        {/* Toggle button at right edge */}
                        <button
                            onClick={onToggle}
                            style={{ top: "-41px", right: "-61px" }}
                            className="absolute -translate-y-1/2 flex items-center justify-center w-12 h-12 bg-[#111827] border border-white/20 rounded-lg hover:bg-[#1F2937] transition-all duration-300 z-50 group"
                            onMouseEnter={() => handleMouseEnter("toggle")}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Menu className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 rotate-180" />
                        </button>
                    </div>
                )}
            </div>
            {/* Navigation */}
            <nav className="flex-1 px-2 space-y-2 bg-[#111827]">
                {renderMenuSection(
                    "Overview",
                    navigationItems.overview,
                    "overview"
                )}
                {renderMenuSection("SAAS", navigationItems.saas, "saas")}
                {renderMenuSection("CMS", navigationItems.cms, "cms")}
                {renderMenuSection("Others", navigationItems.others, "others")}
                <div className="space h-56"></div>
            </nav>
        </div>
    );
}
