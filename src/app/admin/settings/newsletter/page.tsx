"use client";

import { useState, useEffect } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { Save, X } from "lucide-react";

interface SectionData {
    title: string;
    description: string;
    showOnLanding: boolean;
    status: "ACTIVE" | "INACTIVE";
}

export default function NewsletterSettingsPage() {
    const [sectionData, setSectionData] = useState<SectionData>({
        title: "",
        description: "",
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
            const response = await fetch("/api/website-sections/newsletter");
            const data = await response.json();

            if (data.section) {
                const content = data.section.content || {};
                setSectionData({
                    title: content.title || "",
                    description: content.description || "",
                    showOnLanding: data.section.show_on_landing,
                    status: data.section.status,
                });
            } else {
                // Set default values if section doesn't exist yet
                setSectionData({
                    title: "Try Apply SaaS",
                    description:
                        "Access all Apply SaaS for 14 days, then decide which plan best suits your business.",
                    showOnLanding: true,
                    status: "ACTIVE",
                });
            }
        } catch (error) {
            console.error("Error fetching section data:", error);
            showToast("Failed to load newsletter settings", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);

        try {
            const response = await fetch("/api/website-sections/newsletter", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: {
                        title: sectionData.title,
                        description: sectionData.description,
                    },
                    showOnLanding: sectionData.showOnLanding,
                    status: sectionData.status,
                }),
            });

            if (response.ok) {
                showToast("Newsletter settings saved successfully!", "success");
            } else {
                const errorData = await response.json();
                showToast(
                    errorData.error || "Failed to save newsletter settings",
                    "error"
                );
            }
        } catch (error) {
            console.error("Error saving newsletter settings:", error);
            showToast("Failed to save newsletter settings", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setSectionData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[#0f172a]">
                <SettingsSidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-white">
                        Loading newsletter settings...
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
                        Newsletter Section Configuration
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
                                name="title"
                                value={sectionData.title}
                                onChange={handleChange}
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
                                name="description"
                                value={sectionData.description}
                                onChange={handleChange}
                                placeholder="Enter newsletter description"
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#1F2937] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Show at Landing Page Toggle */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSectionData({
                                            ...sectionData,
                                            showOnLanding:
                                                !sectionData.showOnLanding,
                                        })
                                    }
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

                            {/* Save Button */}
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
