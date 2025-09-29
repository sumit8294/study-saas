"use client";

import { useState } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { Pencil, Trash2, Plus, Search, RefreshCw } from "lucide-react";

export default function BrandsSettingsPage() {
    const [showOnLanding, setShowOnLanding] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const [brands, setBrands] = useState([
        {
            id: 1,
            image: "/images/logo-placeholder.png",
            name: "Abc Company",
            status: "Active",
        },
        {
            id: 2,
            image: "/images/logo-placeholder.png",
            name: "Abc Company",
            status: "Active",
        },
        {
            id: 3,
            image: "/images/logo-placeholder.png",
            name: "Abc Company",
            status: "Active",
        },
        {
            id: 4,
            image: "/images/logo-placeholder.png",
            name: "Abc Company",
            status: "Active",
        },
        {
            id: 5,
            image: "/images/logo-placeholder.png",
            name: "Abc Company",
            status: "Active",
        },
    ]);

    const filteredBrands = brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 space-y-8">
                {/* Table Section */}
                <div className="bg-[#111827] rounded-lg shadow border border-gray-800 p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-md font-semibold text-white">
                            Brands
                        </h3>
                        <div className="flex gap-2">
                            {/* Refresh Button */}
                            <button className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-500">
                                <RefreshCw className="w-4 h-4" />
                            </button>

                            {/* Create Button */}
                            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-500">
                                <Plus className="w-4 h-4" /> Create
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-4 w-full sm:w-1/3">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-[#1F2937]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Image
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filteredBrands.map((brand, index) => (
                                    <tr
                                        key={brand.id}
                                        className="hover:bg-[#1F2937]/50"
                                    >
                                        <td className="px-6 py-4 text-sm text-white">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <img
                                                src={brand.image}
                                                alt={brand.name}
                                                className="w-16 h-10 object-contain border rounded-md bg-white p-1"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white">
                                            {brand.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-semibold rounded bg-indigo-100 text-indigo-700">
                                                {brand.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <button className="p-2 bg-teal-500 text-white rounded hover:bg-teal-600">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <span>Per Page</span>
                            <select className="bg-[#1F2937] border border-gray-700 text-white rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Show at Landing Page Toggle */}
                <div className="bg-[#111827] rounded-lg shadow border border-gray-800 p-6">
                    <div className="flex items-center space-x-3">
                        <button
                            type="button"
                            onClick={() => setShowOnLanding(!showOnLanding)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                showOnLanding ? "bg-green-500" : "bg-gray-600"
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
                        <span className="text-sm text-white">
                            Show at landing page
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
