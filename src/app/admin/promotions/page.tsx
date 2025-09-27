"use client";

import { useState } from "react";

export default function PromotionsPage() {
    const [formData, setFormData] = useState({
        subject: "",
        sentTo: "all",
        greeting: "",
        body: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    const handleReset = () => {
        setFormData({
            subject: "",
            sentTo: "all",
            greeting: "",
            body: "",
        });
    };

    return (
        <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-white">Send Mail</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Subject */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Enter subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Send To */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Send To <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="sentTo"
                        value={formData.sentTo}
                        onChange={handleChange}
                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="all">All</option>
                        <option value="students">Students</option>
                        <option value="subscribers">Subscribers</option>
                        <option value="custom">Custom List</option>
                    </select>
                </div>

                {/* Greeting */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Greeting <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="greeting"
                        placeholder="Enter greeting"
                        value={formData.greeting}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Body */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Body <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="body"
                        placeholder="Type your message here..."
                        value={formData.body}
                        onChange={handleChange}
                        rows={8}
                        required
                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
                    >
                        Send
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}
