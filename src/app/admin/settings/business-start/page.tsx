"use client";

import { useState } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { Plus, X } from "lucide-react";

export default function BusinessStartSettingsPage() {
    const [formData, setFormData] = useState({
        tagline: "",
        title: "",
        description: "",
        showOnLanding: true,
    });

    const [supportList, setSupportList] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Add a tag on Enter key
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            if (!supportList.includes(inputValue.trim())) {
                setSupportList([...supportList, inputValue.trim()]);
            }
            setInputValue("");
        }
    };

    // Remove a tag
    const removeTag = (index: number) => {
        setSupportList(supportList.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", { ...formData, supportList });
    };

    return (
        <div className="flex min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <div className="w-72 border-r border-gray-800">
                <SettingsSidebar />
            </div>

            {/* Main Content */}

            <div className="bg-[#111827] flex-1 ml-6 rounded-xl shadow-lg border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                    Business Start
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hero Tagline */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Business Start Tagline{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="heroTagline"
                            placeholder="Our Platform, Your Business"
                            value={formData.tagline}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Hero Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Business Start Title{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="heroTitle"
                            placeholder="Acculance SaaS"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Hero Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Business Start Description{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="heroDescription"
                            placeholder="Describe your SaaS platform..."
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Support List with Tag Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Business Start Support List{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 flex flex-wrap gap-2 items-center rounded-lg p-2 bg-[#1F2937] border border-gray-700 text-white placeholder-gray-500 focus-within:border-indigo-500">
                            {supportList.map((tag, index) => (
                                <span
                                    key={index}
                                    className="flex items-center bg-green-200 text-green-800 px-2 py-1 rounded-md text-sm"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="ml-1 text-green-900 hover:text-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </span>
                            ))}
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type and press Enter"
                                className="flex-1 border-none outline-none p-1 text-sm"
                            />
                        </div>
                    </div>

                    {/* Toggle Button */}
                    <div className="flex items-center space-x-3">
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
                                    : "bg-gray-300"
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
                        <span className="text-gray-700 text-sm">
                            Show at landing page
                        </span>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                        >
                            <Plus className="w-4 h-4" />
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
