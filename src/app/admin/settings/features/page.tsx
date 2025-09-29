"use client";

import { useState } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { Pencil, Trash2, Plus, Search } from "lucide-react";

export default function FeatureSettingsPage() {
    const [formData, setFormData] = useState({
        tagline: "",
        title: "",
        description: "",
        showOnLanding: true,
    });

    const [searchTerm, setSearchTerm] = useState("");

    const [elements, setElements] = useState([
        {
            id: 1,
            image: "/icons/multi-tenancy.png",
            title: "Easy POS",
            description: "The multitenancy feature",
            status: "Active",
        },
        {
            id: 2,
            image: "/icons/multilingual.png",
            title: "Database Backup",
            description: "Support for multiple languages",
            status: "Active",
        },
        {
            id: 3,
            image: "/icons/spa.png",
            title: "Role Management",
            description: "Single Page Application experience",
            status: "Active",
        },
        {
            id: 4,
            image: "/icons/domain.png",
            title: "Reports Insight",
            description: "Use your own custom domain",
            status: "Active",
        },
    ]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
    };

    const filteredElements = elements.filter((el) =>
        el.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col lg:flex-row  min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 space-y-8">
                {/* Form Section */}
                <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">
                        Feature
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Tagline */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Feature Tagline{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="tagline"
                                placeholder="Feature Tagline"
                                value={formData.tagline}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Feature Title{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Manage All Your Businesses in one place"
                                value={formData.title}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Feature Description{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                placeholder="Describe features of your platform..."
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Toggle */}
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData({
                                        ...formData,
                                        showOnLanding: !formData.showOnLanding,
                                    })
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    formData.showOnLanding
                                        ? "bg-green-500"
                                        : "bg-gray-600"
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        formData.showOnLanding
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                    }`}
                                />
                            </button>
                            <span className="ml-3 text-sm text-gray-300">
                                Show at landing page
                            </span>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                            >
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>

                {/* Table Section */}
                <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">
                            Feature Elements
                        </h3>
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-500">
                            <Plus className="w-4 h-4" /> Create
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-4 w-full sm:w-1/3">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-[#1F2937]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Image
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filteredElements.map((element, index) => (
                                    <tr
                                        key={element.id}
                                        className="hover:bg-[#1F2937]"
                                    >
                                        <td className="px-6 py-4 text-gray-300">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <img
                                                src={element.image}
                                                alt={element.title}
                                                className="w-10 h-10 object-contain"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {element.title}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">
                                            {element.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-600/20 text-indigo-400">
                                                {element.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-500">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
