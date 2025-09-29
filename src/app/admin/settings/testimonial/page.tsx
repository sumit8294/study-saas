"use client";

import { useState } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { Pencil, Trash2, Plus, Search, Save } from "lucide-react";

export default function TestimonialSettingsPage() {
    const [formData, setFormData] = useState({
        tagline: "",
        title: "",
        showOnLanding: true,
    });

    const [searchTerm, setSearchTerm] = useState("");

    const [elements, setElements] = useState([
        {
            id: 1,
            image: "/images/user-1.png",
            title: "CEO, ABC Company",
            name: "John Doe",
            status: "Active",
        },
        {
            id: 2,
            image: "/images/user-2.png",
            title: "CEO, ABC Company",
            name: "Mark Angelina",
            status: "Active",
        },
        {
            id: 3,
            image: "/images/user-3.png",
            title: "CEO, ABC Company",
            name: "John Doe",
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

    const filteredElements = elements.filter(
        (el) =>
            el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            el.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 space-y-8">
                {/* Form Section */}
                <div className="bg-[#111827] rounded-lg shadow border border-gray-800 p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">
                        Testimonial Section Tagline
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Tagline */}
                        <div>
                            <label className="block text-sm mb-2 font-medium text-white">
                                Testimonial Section Tagline{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="tagline"
                                placeholder="Testimonials"
                                value={formData.tagline}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm mb-2 font-medium text-white">
                                Testimonial Section Title{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="What Our Clients Say"
                                value={formData.title}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Toggle Show on Landing */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            showOnLanding:
                                                !formData.showOnLanding,
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
                                <span className="text-sm text-white">
                                    Show at landing page
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition"
                            >
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </div>
                    </form>
                </div>

                {/* Table Section */}
                <div className="bg-[#111827] rounded-lg shadow border border-gray-800 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-md font-semibold text-white">
                            Testimonial Elements
                        </h3>
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-500">
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
                                        Title
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
                                {filteredElements.map((element, index) => (
                                    <tr
                                        key={element.id}
                                        className="hover:bg-[#1F2937]/50"
                                    >
                                        <td className="px-6 py-4 text-sm text-white">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <img
                                                src={element.image}
                                                alt={element.name}
                                                className="w-12 h-12 object-cover border rounded-full"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white">
                                            {element.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white">
                                            {element.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs font-semibold rounded bg-indigo-100 text-indigo-700">
                                                {element.status}
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
                </div>
            </div>
        </div>
    );
}
