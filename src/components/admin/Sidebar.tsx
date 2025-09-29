"use client";
import { useState } from "react";
import {
    HomeIcon,
    UsersIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    UserIcon,
    TicketIcon,
    FunnelIcon,
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
} from "@heroicons/react/24/outline";

export default function Sidebar() {
    const [openPricing, setOpenPricing] = useState(false);
    const [openSubscription, setOpenSubscription] = useState(false);
    const [openDomain, setOpenDomain] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const [openResources, setOpenResources] = useState(false);

    return (
        <div className="h-screen bg-[#111827] text-gray-300 flex flex-col border-r border-white/10">
            {/* Logo Section */}
            <div className="flex items-center  px-2 py-2 mt-2 justify-center h-16">
                <div className="text-blue-500 text-2xl font-bold">
                    <img
                        src="/site/logo.png"
                        alt="Apply Logo"
                        className="w-16"
                    />{" "}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 space-y-2 bg-[#111827]">
                {/* Overview Section */}
                <div className="text-gray-400 text-xs uppercase font-bold px-3 mt-3">
                    Overview
                </div>

                {/* Dashboard */}
                <a
                    href="/admin"
                    className="flex items-center w-full px-3 py-2 rounded-lg text-white font-medium bg-[#1F2937]"
                >
                    <HomeIcon className="h-5 w-5 mr-3" />
                    Dashboard
                </a>

                {/* Landing Page */}
                <a
                    href="/"
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-3" />
                    Go To Landing Page
                </a>

                {/* SAAS Section */}
                <div className="text-gray-400 text-xs uppercase font-bold px-3 mt-3">
                    SAAS
                </div>

                {/* Pricing Dropdown */}
                <div>
                    <button
                        onClick={() => setOpenPricing(!openPricing)}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                    >
                        <div className="flex items-center">
                            <CurrencyDollarIcon className="h-5 w-5 mr-3" />
                            <span>Pricing</span>
                        </div>
                        {openPricing ? (
                            <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                            <ChevronRightIcon className="h-4 w-4" />
                        )}
                    </button>
                    {openPricing && (
                        <div className="ml-10 mt-1 space-y-1 text-sm">
                            <a
                                href="/admin/plans"
                                className="block hover:text-white px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                            >
                                Plans
                            </a>
                            <a
                                href="/admin/features"
                                className="block hover:text-white px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                            >
                                Plan Features
                            </a>
                        </div>
                    )}
                </div>

                {/* Tenants */}
                <a
                    href="/admin/tenants"
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                >
                    <UsersIcon className="h-5 w-5 mr-3" />
                    Tenants
                </a>

                {/* Subscription Dropdown */}
                <div>
                    <button
                        onClick={() => setOpenSubscription(!openSubscription)}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                    >
                        <div className="flex items-center">
                            <CreditCardIcon className="h-5 w-5 mr-3" />
                            <span>Subscription</span>
                        </div>
                        {openSubscription ? (
                            <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                            <ChevronRightIcon className="h-4 w-4" />
                        )}
                    </button>
                    {openSubscription && (
                        <div className="ml-10 mt-1 space-y-1 text-sm">
                            <a
                                href="/admin/subscriptions"
                                className="block hover:text-white px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                            >
                                All Subscriptions
                            </a>
                            <a
                                href="/admin/subscriptions/requests"
                                className="block hover:text-white px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                            >
                                Subscriptions Requests
                            </a>
                        </div>
                    )}
                </div>

                {/* Payments */}
                <a
                    href="/admin/payments"
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                >
                    <CurrencyDollarIcon className="h-5 w-5 mr-3" />
                    Payments
                </a>

                {/* Domain Management Dropdown */}
                <div>
                    <button
                        onClick={() => setOpenDomain(!openDomain)}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                    >
                        <div className="flex items-center">
                            <BuildingLibraryIcon className="h-5 w-5 mr-3" />
                            <span>Domain Management</span>
                        </div>
                        {openDomain ? (
                            <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                            <ChevronRightIcon className="h-4 w-4" />
                        )}
                    </button>
                    {openDomain && (
                        <div className="ml-10 mt-1 space-y-1 text-sm">
                            <a
                                href="/admin/domains"
                                className="block hover:text-white px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                            >
                                All Domains
                            </a>
                            <a
                                href="/admin/domains/requests"
                                className="block hover:text-white px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                            >
                                Domain Requests
                            </a>
                        </div>
                    )}
                </div>

                {/* Promotion */}
                <a
                    href="/admin/promotions"
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                >
                    <GiftIcon className="h-5 w-5 mr-3" />
                    Promotion
                </a>

                {/* CMS Section */}
                <div className="text-gray-400 text-xs uppercase font-bold px-3 mt-3">
                    CMS
                </div>

                <a
                    href="/admin/settings/hero"
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                >
                    <NewspaperIcon className="h-5 w-5 mr-3" />
                    Landing Page
                </a>

                <a
                    href="/admin/pages"
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                >
                    <DocumentDuplicateIcon className="h-5 w-5 mr-3" />
                    Pages
                </a>

                <a
                    href="/admin/newsletters"
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                >
                    <TicketIcon className="h-5 w-5 mr-3" />
                    Subscribers
                </a>

                {/* Others Section */}
                <div className="text-gray-400 text-xs uppercase font-bold px-3 mt-3">
                    Others
                </div>

                <a
                    href="/admin/setup/general"
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                >
                    <Cog6ToothIcon className="h-5 w-5 mr-3" />
                    Setup
                </a>

                <a
                    href="/admin/activity-log"
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                >
                    <BellIcon className="h-5 w-5 mr-3" />
                    Activity Log
                </a>

                <a
                    href="/admin/application-update"
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                >
                    <CloudArrowUpIcon className="h-5 w-5 mr-3" />
                    Update Application
                </a>

                {/* Account Dropdown */}
                <div>
                    <button
                        onClick={() => setOpenAccount(!openAccount)}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                    >
                        <div className="flex items-center">
                            <UserIcon className="h-5 w-5 mr-3" />
                            <span>Account</span>
                        </div>
                        {openAccount ? (
                            <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                            <ChevronRightIcon className="h-4 w-4" />
                        )}
                    </button>
                    {openAccount && (
                        <div className="ml-10 mt-1 space-y-1 text-sm">
                            <a
                                href="/admin/profile"
                                className="block hover:text-white px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                            >
                                Profile
                            </a>
                            <a
                                href="#"
                                className="block hover:text-white px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                            >
                                Logout
                            </a>
                        </div>
                    )}
                </div>

                {/* Resources Dropdown */}
                <div>
                    <button
                        onClick={() => setOpenResources(!openResources)}
                        className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                    >
                        <div className="flex items-center">
                            <BookOpenIcon className="h-5 w-5 mr-3" />
                            <span>Resources</span>
                        </div>
                        {openResources ? (
                            <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                            <ChevronRightIcon className="h-4 w-4" />
                        )}
                    </button>
                    {openResources && (
                        <div className="ml-10 mt-1 space-y-1 text-sm">
                            <a
                                href="/admin/system-info"
                                target="_blank"
                                className="block hover:text-white px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                            >
                                <InformationCircleIcon className="inline h-4 w-4 mr-2" />
                                System Info
                            </a>
                            <a
                                href="#!"
                                className="block hover:text-white px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                            >
                                <TrashIcon className="inline h-4 w-4 mr-2" />
                                Clear Cache
                            </a>
                            <a
                                href="/admin/backup"
                                className="block hover:text-white px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                            >
                                <ArrowDownTrayIcon className="inline h-4 w-4 mr-2" />
                                Database Backup
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                className="block hover:text-white px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                            >
                                Documentation
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                className="block hover:text-white px-3 py-2 rounded-lg hover:bg-[#1F2937]"
                            >
                                Support
                            </a>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}
