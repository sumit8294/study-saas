"use client";

import { useState } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";

export default function CustomHTMLSettingsPage() {
    const [customHTML, setCustomHTML] = useState(`<!-- Primary Meta Tags -->
<meta name="title" content="Apply SaaS - Study Abroad Application Management SaaS Application.">
<meta name="description" content="Apply SaaS is an all-in-one management system that helps business owners to manage and operate Applications. Apply SaaS is a multitenancy-based subscription system that allows tenants to register for a subscription plan and get access to lots of features that include purchases, sales, payments, agents panel, students panel, university panel, and many more. Apply SaaS is built with core Next JS, Tailwind, and other modern technologies.">
`);

    const handleSave = () => {
        console.log("Custom HTML Saved:", customHTML);
        alert("Custom HTML saved successfully!");
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
                        Custom HTML
                    </h3>

                    {/* Custom HTML Textarea */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-white">
                            Custom HTML <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={customHTML}
                            onChange={(e) => setCustomHTML(e.target.value)}
                            rows={10}
                            placeholder="Paste your custom HTML here..."
                            className="w-full px-4 py-3 border border-gray-700 rounded-md bg-[#1F2937] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                        />
                    </div>

                    {/* Save Button */}
                    <div className="mt-6">
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
    );
}
