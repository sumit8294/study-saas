"use client";

import { useState } from "react";
import { Send, RotateCcw } from "lucide-react";

export default function SendMailForm() {
    const [formData, setFormData] = useState({
        subject: "",
        sentTo: "All",
        greeting: "",
        body: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReset = () => {
        setFormData({
            subject: "",
            sentTo: "All",
            greeting: "",
            body: "",
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Mail Sent Successfully!");
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-white">Send Mail</h1>
                <p className="text-gray-400 text-sm">
                    Compose and send email campaigns to tenants or subscribers.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-[#111827] p-6 rounded-lg border border-gray-700 space-y-5 shadow-lg"
            >
                {/* Subject */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Enter subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Sent To */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Sent To <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="sentTo"
                        value={formData.sentTo}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    >
                        <option value="All">All</option>
                        <option value="Tenants">Tenants</option>
                        <option value="Subscribers">Subscribers</option>
                    </select>
                </div>

                {/* Greeting */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Greeting <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="greeting"
                        placeholder="Enter greeting"
                        value={formData.greeting}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[#1F2937] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Body */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Body <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="body"
                        placeholder="Write your email content here..."
                        rows={8}
                        value={formData.body}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#1F2937] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    ></textarea>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4">
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
                    >
                        <Send className="w-4 h-4" />
                        Send
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center gap-2 px-5 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}
