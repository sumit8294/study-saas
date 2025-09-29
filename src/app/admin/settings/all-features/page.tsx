"use client";

import { useState } from "react";
import { Edit2, Trash2, Plus, Save } from "lucide-react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";

interface FeatureItem {
    id: number;
    image: string;
    title: string;
    status: "Active" | "Inactive";
}

export default function AllFeatures() {
    const [features, setFeatures] = useState<FeatureItem[]>([
        {
            id: 1,
            image: "/icons/customer.svg",
            title: "Customer Management",
            status: "Active",
        },
        {
            id: 2,
            image: "/icons/supplier.svg",
            title: "Supplier Management",
            status: "Active",
        },
        {
            id: 3,
            image: "/icons/employee.svg",
            title: "Employee Management",
            status: "Active",
        },
        {
            id: 4,
            image: "/icons/expense.svg",
            title: "Expense Management",
            status: "Active",
        },
        {
            id: 5,
            image: "/icons/purchase.svg",
            title: "Purchase Management",
            status: "Active",
        },
    ]);

    const [tagline, setTagline] = useState("Core Modules");
    const [title, setTitle] = useState("Core Modules For Your Business");
    const [showOnLanding, setShowOnLanding] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFeatures = features.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col lg:flex-row  min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 space-y-8">
                {/* Top Section */}
                <div className="bg-[#111827] p-6 rounded-xl shadow-md border text-white border-gray-800">
                    <h2 className="text-xl font-semibold mb-4">All Features</h2>

                    {/* Tagline */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            All Features Section Tagline
                        </label>
                        <input
                            type="text"
                            value={tagline}
                            onChange={(e) => setTagline(e.target.value)}
                            className="mt-1 w-full px-3 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                            All Features Section Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Toggle + Save */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowOnLanding(!showOnLanding)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    showOnLanding
                                        ? "bg-green-500"
                                        : "bg-gray-600"
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        showOnLanding
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                    }`}
                                />
                            </button>
                            <span className="text-sm">
                                Show at landing page
                            </span>
                        </div>

                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition">
                            <Save className="w-4 h-4" /> Save Changes
                        </button>
                    </div>
                </div>

                {/* Features Table */}
                <div className="bg-[#111827] p-6 rounded-xl shadow-md border text-white border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">
                            All Feature Elements
                        </h3>
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500 transition">
                            <Plus className="w-4 h-4" /> Create
                        </button>
                    </div>

                    {/* Search */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg bg-gray-900 border-gray-700 p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-gray-900">
                                    <th className="px-4 py-3 text-left font-medium text-gray-400">
                                        #
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-400">
                                        Image
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-400">
                                        Title
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-400">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFeatures.map((feature, index) => (
                                    <tr
                                        key={feature.id}
                                        className="border-t border-gray-700 hover:bg-gray-700/40 transition"
                                    >
                                        <td className="px-4 py-3">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3">
                                            <img
                                                src={feature.image}
                                                alt={feature.title}
                                                className="w-10 h-10 rounded-lg object-contain"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            {feature.title}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    feature.status === "Active"
                                                        ? "bg-indigo-700 text-white"
                                                        : "bg-gray-600 text-gray-200"
                                                }`}
                                            >
                                                {feature.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 flex gap-2">
                                            <button className="p-2 bg-teal-600 rounded-lg hover:bg-teal-500">
                                                <Edit2 className="w-4 h-4 text-white" />
                                            </button>
                                            <button className="p-2 bg-red-600 rounded-lg hover:bg-red-500">
                                                <Trash2 className="w-4 h-4 text-white" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                            <label className="text-sm">Per Page</label>
                            <select className="rounded-lg bg-gray-900 border-gray-700 p-1 text-sm">
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
                                1
                            </button>
                            <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
                                2
                            </button>
                            <button className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
                                3
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
