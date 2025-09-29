"use client";

import { useState } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";

export default function NewsletterSettingsPage() {
    const [title, setTitle] = useState("Try Apply SaaS");
    const [description, setDescription] = useState(
        "Access all Apply SaaS for 14 days, then decide which plan best suits your business."
    );
    const [showOnLanding, setShowOnLanding] = useState(true);

    const handleSave = () => {
        console.log({
            title,
            description,
            showOnLanding,
        });
        alert("Newsletter settings saved!");
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6">
                <div className="bg-[#111827] rounded-lg shadow border border-gray-800 p-6">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Newsletter Section Title
                    </h3>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        {/* Newsletter Title */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Newsletter Section Title{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter newsletter title"
                                className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#1F2937] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Newsletter Description */}
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Newsletter Section Description{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter newsletter description"
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#1F2937] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Show at Landing Page Toggle */}
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
                            <span className="text-sm text-white">
                                Show at landing page
                            </span>
                        </div>

                        {/* Save Button */}
                        <div>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500 focus:outline-none"
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
