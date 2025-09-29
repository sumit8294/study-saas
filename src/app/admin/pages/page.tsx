"use client";

import { useState } from "react";
import { FileDown, FileText, Plus, SearchIcon } from "lucide-react";

interface Page {
    id: number;
    name: string;
    slug: string;
    type: string;
    status: "Active" | "Inactive";
}

export default function PagesTable() {
    const [pages, setPages] = useState<Page[]>([
        {
            id: 1,
            name: "About Us",
            slug: "about-us",
            type: "Information",
            status: "Active",
        },
        {
            id: 2,
            name: "News",
            slug: "news",
            type: "Information",
            status: "Active",
        },
        {
            id: 3,
            name: "Investor Relations",
            slug: "investor-relations",
            type: "Information",
            status: "Active",
        },
        {
            id: 4,
            name: "Careers",
            slug: "careers",
            type: "Information",
            status: "Active",
        },
        {
            id: 5,
            name: "Contact Us",
            slug: "contact-us",
            type: "Need Help",
            status: "Active",
        },
        {
            id: 6,
            name: "FAQ",
            slug: "faq",
            type: "Need Help",
            status: "Active",
        },
        {
            id: 7,
            name: "Refund Policy",
            slug: "refund-policy",
            type: "Need Help",
            status: "Active",
        },
        {
            id: 8,
            name: "Help Docs",
            slug: "help-docs",
            type: "Need Help",
            status: "Active",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (id: number) => {
        setPages(pages.filter((page) => page.id !== id));
    };

    const filteredPages = pages.filter(
        (page) =>
            page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            page.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
            page.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white">Pages</h1>
                    <p className="text-gray-400 text-sm">
                        Manage all static pages for your application.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        <Plus className="w-4 h-4" />
                        Create
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Search Bar */}
                <div className="relative w-full md:w-1/3">
                    <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search by page name, slug or type"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#111827] shadow-lg">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-[#1F2937]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                #
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Pages
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Slug
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredPages.map((page) => (
                            <tr
                                key={page.id}
                                className="hover:bg-[#1F2937] transition"
                            >
                                {/* Index */}
                                <td className="px-6 py-4 text-white">
                                    {page.id}
                                </td>

                                {/* Page Name */}
                                <td className="px-6 py-4 whitespace-nowrap text-white">
                                    {page.name}
                                </td>

                                {/* Slug */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {page.slug}
                                </td>

                                {/* Type */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {page.type}
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            page.status === "Active"
                                                ? "bg-purple-600/20 text-purple-400"
                                                : "bg-gray-700 text-gray-400"
                                        }`}
                                    >
                                        {page.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                                    <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(page.id)}
                                        className="text-red-400 hover:text-red-300 font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredPages.length === 0 && (
                    <div className="p-6 text-center text-gray-400">
                        No pages found.
                    </div>
                )}
            </div>

            {/* Per Page Control */}
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-300">Per Page</span>
                    <select className="border border-gray-600 rounded px-2 py-1 text-sm bg-[#1F2937] text-gray-200">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
