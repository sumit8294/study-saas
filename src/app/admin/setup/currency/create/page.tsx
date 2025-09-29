"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import SetupSettingsSidebar from "@/components/admin/SetupSettingsSidebar";
import { useRouter } from "next/navigation";

export default function CreateCurrencyPage() {
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        rate: "",
        symbol: "",
        position: "left",
        status: "active",
        note: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    const handleReset = () => {
        setFormData({
            name: "",
            code: "",
            rate: "",
            symbol: "",
            position: "left",
            status: "active",
            note: "",
        });
    };

    const router = useRouter();

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SetupSettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">
                        Create Currency
                    </h2>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter a name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    {/* Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Code <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="code"
                            placeholder="Enter a code"
                            value={formData.code}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    {/* Rate */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Rate <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="rate"
                            step="0.01"
                            placeholder="Exchange rate for your currency (USD comparison)"
                            value={formData.rate}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    {/* Symbol */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Symbol <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="symbol"
                            placeholder="Enter a symbol"
                            value={formData.symbol}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    {/* Currency Position */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Currency Position
                        </label>
                        <select
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="left">Left align</option>
                            <option value="right">Right align</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Note */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Note
                        </label>
                        <textarea
                            name="note"
                            placeholder="Write your note here!"
                            value={formData.note}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                            rows={3}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center pt-4">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-all"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
