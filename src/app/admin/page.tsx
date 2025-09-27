import {
    BriefcaseIcon,
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    LinkIcon,
    MapPinIcon,
    PencilIcon,
} from "@heroicons/react/20/solid";
import {
    UserGroupIcon,
    EnvelopeIcon,
    CursorArrowRaysIcon,
} from "@heroicons/react/24/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import ApplicationStatusCard from "@/components/admin/ApplicationStatusCard";

export default function Dashboard() {
    return (
        <>
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Dashboard
                    </h2>
                    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-400">
                            <BriefcaseIcon
                                aria-hidden="true"
                                className="mr-1.5 size-5 shrink-0 text-gray-500"
                            />
                            Full-time
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-400">
                            <MapPinIcon
                                aria-hidden="true"
                                className="mr-1.5 size-5 shrink-0 text-gray-500"
                            />
                            Remote
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-400">
                            <CurrencyDollarIcon
                                aria-hidden="true"
                                className="mr-1.5 size-5 shrink-0 text-gray-500"
                            />
                            $120k &ndash; $140k
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-400">
                            <CalendarIcon
                                aria-hidden="true"
                                className="mr-1.5 size-5 shrink-0 text-gray-500"
                            />
                            Closing on January 9, 2020
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex lg:mt-0 lg:ml-4">
                    <span className="hidden sm:block">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20"
                        >
                            <PencilIcon
                                aria-hidden="true"
                                className="mr-1.5 -ml-0.5 size-5 text-white"
                            />
                            Edit
                        </button>
                    </span>

                    <span className="ml-3 hidden sm:block">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20"
                        >
                            <LinkIcon
                                aria-hidden="true"
                                className="mr-1.5 -ml-0.5 size-5 text-white"
                            />
                            View
                        </button>
                    </span>

                    <span className="sm:ml-3">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            <CheckIcon
                                aria-hidden="true"
                                className="mr-1.5 -ml-0.5 size-5"
                            />
                            Publish
                        </button>
                    </span>

                    {/* Dropdown */}
                    <Menu as="div" className="relative ml-3 sm:hidden">
                        <MenuButton className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20">
                            More
                            <ChevronDownIcon
                                aria-hidden="true"
                                className="-mr-1 ml-1.5 size-5 text-white"
                            />
                        </MenuButton>

                        <MenuItems
                            transition
                            className="absolute left-0 z-10 mt-2 -mr-1 w-24 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                            <MenuItem>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                                >
                                    Edit
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                                >
                                    View
                                </a>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
            <div className="w-full py-6 ">
                {/* Section Title */}
                <h2 className="text-white font-semibold text-lg mb-4">
                    Last 30 days
                </h2>

                {/* Cards Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-[#1a2534] rounded-xl border border-white/10  shadow-md flex flex-col justify-between">
                        <div className="flex items-center space-x-4 p-6">
                            <div className="bg-purple-600 p-3 rounded-lg">
                                <UserGroupIcon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">
                                    Total Applications
                                </p>
                                <div className="flex items-center space-x-2">
                                    <p className="text-white text-2xl font-semibold">
                                        71,897
                                    </p>
                                    <span className="text-green-400 text-sm font-medium">
                                        ↑ 122
                                    </span>
                                </div>
                            </div>
                        </div>
                        <a
                            href="#"
                            className="mt-6 px-6 py-3 bg-[#202b3b] rounded-b-xl text-blue-400 border-t border-white/10 hover:underline text-sm font-medium"
                        >
                            View all
                        </a>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#1a2534] rounded-xl border border-white/10  shadow-md flex flex-col justify-between">
                        <div className="flex items-center space-x-4 p-6">
                            <div className="bg-purple-600 p-3 rounded-lg">
                                <UserGroupIcon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">
                                    Total Students
                                </p>
                                <div className="flex items-center space-x-2">
                                    <p className="text-white text-2xl font-semibold">
                                        352
                                    </p>
                                    <span className="text-green-400 text-sm font-medium">
                                        ↑ 122
                                    </span>
                                </div>
                            </div>
                        </div>
                        <a
                            href="#"
                            className="mt-6 px-6 py-3 bg-[#202b3b] rounded-b-xl text-blue-400 border-t border-white/10 hover:underline text-sm font-medium"
                        >
                            View all
                        </a>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#1a2534] rounded-xl border border-white/10  shadow-md flex flex-col justify-between">
                        <div className="flex items-center space-x-4 p-6">
                            <div className="bg-purple-600 p-3 rounded-lg">
                                <UserGroupIcon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">
                                    Open Tickets
                                </p>
                                <div className="flex items-center space-x-2">
                                    <p className="text-white text-2xl font-semibold">
                                        40
                                    </p>
                                    <span className="text-green-400 text-sm font-medium">
                                        ↑ 2
                                    </span>
                                </div>
                            </div>
                        </div>
                        <a
                            href="#"
                            className="mt-6 px-6 py-3 bg-[#202b3b] rounded-b-xl text-blue-400 border-t border-white/10 hover:underline text-sm font-medium"
                        >
                            View all
                        </a>
                    </div>
                </div>
            </div>
            <ApplicationStatusCard />
        </>
    );
}
