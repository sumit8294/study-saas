"use client";

import { useState, useEffect } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { Save, X } from "lucide-react";

interface SectionData {
    customHTML: string;
    showOnLanding: boolean;
    status: "ACTIVE" | "INACTIVE";
}

export default function CustomHTMLSettingsPage() {
    const [sectionData, setSectionData] = useState<SectionData>({
        customHTML: "",
        showOnLanding: true,
        status: "ACTIVE",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Toast states
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");

    // Fetch section data
    useEffect(() => {
        fetchSectionData();
    }, []);

    // Auto-hide toasts after 5 seconds
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess("");
                setError("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    const showToast = (message: string, type: "success" | "error") => {
        if (type === "success") {
            setSuccess(message);
            setError("");
        } else {
            setError(message);
            setSuccess("");
        }
    };

    const fetchSectionData = async () => {
        try {
            const response = await fetch("/api/website-sections/custom_html");
            const data = await response.json();

            if (data.section) {
                const content = data.section.content || {};
                setSectionData({
                    customHTML: content.customHTML || content.html || "",
                    showOnLanding: data.section.show_on_landing,
                    status: data.section.status,
                });
            } else {
                // Set default values if section doesn't exist yet
                setSectionData({
                    customHTML: `<!-- Primary Meta Tags -->
<meta name="title" content="Apply SaaS - Study Abroad Application Management SaaS Application.">
<meta name="description" content="Apply SaaS is an all-in-one management system that helps business owners to manage and operate Applications. Apply SaaS is a multitenancy-based subscription system that allows tenants to register for a subscription plan and get access to lots of features that include purchases, sales, payments, agents panel, students panel, university panel, and many more. Apply SaaS is built with core Next JS, Tailwind, and other modern technologies.">`,
                    showOnLanding: true,
                    status: "ACTIVE",
                });
            }
        } catch (error) {
            console.error("Error fetching section data:", error);
            showToast("Failed to load custom HTML settings", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);

        try {
            const response = await fetch("/api/website-sections/custom_html", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: {
                        customHTML: sectionData.customHTML,
                    },
                    showOnLanding: sectionData.showOnLanding,
                    status: sectionData.status,
                }),
            });

            if (response.ok) {
                showToast("Custom HTML saved successfully!", "success");
            } else {
                const errorData = await response.json();
                showToast(
                    errorData.error || "Failed to save custom HTML",
                    "error"
                );
            }
        } catch (error) {
            console.error("Error saving custom HTML:", error);
            showToast("Failed to save custom HTML", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleHTMLChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSectionData((prev) => ({
            ...prev,
            customHTML: e.target.value,
        }));
    };

    const handleToggleChange = () => {
        setSectionData((prev) => ({
            ...prev,
            showOnLanding: !prev.showOnLanding,
        }));
    };

    const handleClear = () => {
        if (confirm("Are you sure you want to clear all custom HTML?")) {
            setSectionData((prev) => ({
                ...prev,
                customHTML: "",
            }));
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[#0f172a]">
                <SettingsSidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-white">
                        Loading custom HTML settings...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6">
                {/* Toast Notifications */}
                {success && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg flex justify-between items-center">
                        <p className="text-green-400 text-sm">{success}</p>
                        <button
                            onClick={() => setSuccess("")}
                            className="text-green-400 hover:text-green-300"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg flex justify-between items-center">
                        <p className="text-red-400 text-sm">{error}</p>
                        <button
                            onClick={() => setError("")}
                            className="text-red-400 hover:text-red-300"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <div className="bg-[#111827] rounded-lg shadow border border-gray-800 p-6">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-6">
                        Custom HTML Configuration
                    </h3>

                    {/* Custom HTML Textarea */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-white">
                                Custom HTML{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <button
                                onClick={handleClear}
                                className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-500 focus:outline-none"
                            >
                                Clear All
                            </button>
                        </div>
                        <textarea
                            value={sectionData.customHTML}
                            onChange={handleHTMLChange}
                            rows={15}
                            placeholder="Paste your custom HTML here..."
                            className="w-full px-4 py-3 border border-gray-700 rounded-md bg-[#1F2937] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm resize-vertical"
                        />
                        <p className="text-xs text-gray-400">
                            You can add custom HTML, meta tags, scripts, or any
                            other HTML code that will be injected into your
                            website.
                        </p>
                    </div>

                    {/* Show at Landing Page Toggle */}
                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <button
                                    type="button"
                                    onClick={handleToggleChange}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        sectionData.showOnLanding
                                            ? "bg-green-500"
                                            : "bg-gray-600"
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            sectionData.showOnLanding
                                                ? "translate-x-6"
                                                : "translate-x-1"
                                        }`}
                                    />
                                </button>
                                <span className="text-sm text-white">
                                    Show at landing page
                                </span>
                            </div>

                            {/* Character Count */}
                            <div className="text-sm text-gray-400">
                                {sectionData.customHTML.length} characters
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                            {sectionData.customHTML.split("\n").length} lines of
                            code
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => fetchSectionData()}
                                disabled={saving}
                                className="px-4 py-2 text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:border-gray-500 transition disabled:opacity-50"
                            >
                                Reset
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500 focus:outline-none disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
