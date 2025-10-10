"use client";

import { useState, useEffect } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { Plus, X, Save, Loader2 } from "lucide-react";

interface BusinessStartFormData {
    tagline: string;
    title: string;
    description: string;
    supportList: string[];
    showOnLanding: boolean;
}

interface BusinessStartSection {
    id: number;
    content: BusinessStartFormData;
    show_on_landing: boolean;
    status: string;
}

export default function BusinessStartSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState<BusinessStartFormData>({
        tagline: "",
        title: "",
        description: "",
        supportList: [],
        showOnLanding: true,
    });

    const [inputValue, setInputValue] = useState("");

    // Fetch business start section data
    useEffect(() => {
        const fetchBusinessStartSection = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "/api/website-sections/business_start"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch business start section");
                }

                const data = await response.json();

                if (data.section && data.section.content) {
                    setFormData({
                        tagline: data.section.content.tagline || "",
                        title: data.section.content.title || "",
                        description: data.section.content.description || "",
                        supportList: data.section.content.supportList || [],
                        showOnLanding: data.section.show_on_landing ?? true,
                    });
                }
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load business start section"
                );
                console.error("Error fetching business start section:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinessStartSection();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Add a tag on Enter key
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            if (!formData.supportList.includes(inputValue.trim())) {
                setFormData((prev) => ({
                    ...prev,
                    supportList: [...prev.supportList, inputValue.trim()],
                }));
            }
            setInputValue("");
        }
    };

    // Add tag on button click
    const handleAddTag = () => {
        if (
            inputValue.trim() !== "" &&
            !formData.supportList.includes(inputValue.trim())
        ) {
            setFormData((prev) => ({
                ...prev,
                supportList: [...prev.supportList, inputValue.trim()],
            }));
            setInputValue("");
        }
    };

    // Remove a tag
    const removeTag = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            supportList: prev.supportList.filter((_, i) => i !== index),
        }));
    };

    const handleToggleChange = () => {
        setFormData((prev) => ({
            ...prev,
            showOnLanding: !prev.showOnLanding,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch(
                "/api/website-sections/business_start",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content: formData,
                        showOnLanding: formData.showOnLanding,
                        status: "ACTIVE",
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || "Failed to update business start section"
                );
            }

            setSuccess("Business Start section updated successfully!");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update business start section"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
                <SettingsSidebar />
                <div className="bg-[#111827] flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 rounded-xl shadow-lg border border-white/10 p-6 flex items-center justify-center">
                    <div className="flex items-center gap-3 text-white">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Loading business start settings...
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
            <div className="bg-[#111827] flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 rounded-xl shadow-lg border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                    Business Start
                </h2>

                {/* Success Message */}
                {success && (
                    <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg mb-6">
                        <p className="text-green-400 text-sm">{success}</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg mb-6">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tagline */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Business Start Tagline{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="tagline"
                            placeholder="Start Your Business Journey"
                            value={formData.tagline}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Business Start Title{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Launch Your Business in Minutes"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Business Start Description{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            placeholder="Describe how users can start their business with your platform..."
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            required
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Support List with Tag Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Supported Business Types{" "}
                            <span className="text-red-500">*</span>
                        </label>

                        {/* Tags Display */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {formData.supportList.map((tag, index) => (
                                <span
                                    key={index}
                                    className="flex items-center bg-green-600/20 text-green-400 px-3 py-1.5 rounded-lg text-sm border border-green-500/30"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="ml-2 text-green-400 hover:text-red-400 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>

                        {/* Tag Input */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Add a business type and press Enter"
                                className="flex-1 px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddTag}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add
                            </button>
                        </div>
                        <p className="text-gray-400 text-xs mt-2">
                            Press Enter or click Add to include business types
                        </p>
                    </div>

                    {/* Toggle Button */}
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={handleToggleChange}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                formData.showOnLanding
                                    ? "bg-green-500"
                                    : "bg-gray-600"
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
                        <span className="ml-3 text-sm text-gray-300">
                            Show at landing page
                        </span>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-6 border-t border-gray-700">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
