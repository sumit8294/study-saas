"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import SetupSettingsSidebar from "@/components/admin/SetupSettingsSidebar";

interface Currency {
    id: number;
    name: string;
    code: string;
    rate: number;
    symbol: string;
    position: "left" | "right";
    preview: string;
    status: "Active" | "Inactive";
}

export default function CurrencySettingsPage() {
    const [currencies, setCurrencies] = useState<Currency[]>([
        {
            id: 1,
            name: "United States Dollar",
            code: "USD",
            rate: 1.0,
            symbol: "$",
            position: "left",
            preview: "$0.00",
            status: "Active",
        },
        {
            id: 2,
            name: "Bangladeshi Taka",
            code: "BDT",
            rate: 119.67,
            symbol: "৳",
            position: "left",
            preview: "৳0.00",
            status: "Active",
        },
        {
            id: 3,
            name: "Indian Rupee",
            code: "INR",
            rate: 110.0,
            symbol: "₹",
            position: "left",
            preview: "₹0.00",
            status: "Active",
        },
        {
            id: 4,
            name: "Nigerian Naira",
            code: "NGN",
            rate: 1592.35,
            symbol: "₦",
            position: "left",
            preview: "₦0.00",
            status: "Active",
        },
    ]);

    const handleEdit = (id: number) => {
        console.log("Edit currency ID:", id);
    };

    const handleDelete = (id: number) => {
        setCurrencies(currencies.filter((currency) => currency.id !== id));
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SetupSettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">
                        Currency Settings
                    </h2>
                    <a href="/admin/setup/currency/create">
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all">
                            <Plus className="w-4 h-4" /> Create
                        </button>
                    </a>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-300">
                        <thead className="bg-[#1F2937] text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Code</th>
                                <th className="px-4 py-3">Rate</th>
                                <th className="px-4 py-3">Symbol</th>
                                <th className="px-4 py-3">Position</th>
                                <th className="px-4 py-3">Preview</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currencies.map((currency, index) => (
                                <tr
                                    key={currency.id}
                                    className="border-b border-gray-700 hover:bg-[#1e293b] transition-colors"
                                >
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">
                                        {currency.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        {currency.code}
                                    </td>
                                    <td className="px-4 py-3">
                                        {currency.rate.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3">
                                        {currency.symbol}
                                    </td>
                                    <td className="px-4 py-3 capitalize">
                                        {currency.position}
                                    </td>
                                    <td className="px-4 py-3">
                                        {currency.preview}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${
                                                currency.status === "Active"
                                                    ? "bg-green-700 text-green-200"
                                                    : "bg-red-700 text-red-200"
                                            }`}
                                        >
                                            {currency.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 flex items-center justify-end gap-2">
                                        <button
                                            onClick={() =>
                                                handleEdit(currency.id)
                                            }
                                            className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(currency.id)
                                            }
                                            className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Per Page Section */}
                <div className="mt-4 flex items-center gap-3 text-gray-400">
                    <span>Per Page</span>
                    <select className="bg-[#1F2937] border border-gray-700 rounded-lg text-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
