"use client";

import { useState, useEffect } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { Save, Loader2 } from "lucide-react";

interface CTAFormData {
    boxTitle: string;
    boxDescription: string;
    buttonText: string;
    buttonLink: string;
    showOnLanding: boolean;
}

interface CTASection {
    id: number;
    content: CTAFormData;
    show_on_landing: boolean;
    status: string;
}

export default function CTASettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState<CTAFormData>({
        boxTitle: "",
        boxDescription: "",
        buttonText: "",
        buttonLink: "",
        showOnLanding: true,
    });

    // Fetch CTA section data
    useEffect(() => {
        const fetchCTASection = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/website-sections/cta");

                if (!response.ok) {
                    throw new Error("Failed to fetch CTA section");
                }

                const data = await response.json();

                if (data.section && data.section.content) {
                    setFormData({
                        boxTitle: data.section.content.boxTitle || "",
                        boxDescription:
                            data.section.content.boxDescription || "",
                        buttonText: data.section.content.buttonText || "",
                        buttonLink: data.section.content.buttonLink || "",
                        showOnLanding: data.section.show_on_landing ?? true,
                    });
                }
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load CTA section"
                );
                console.error("Error fetching CTA section:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCTASection();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
            const response = await fetch("/api/website-sections/cta", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: formData,
                    showOnLanding: formData.showOnLanding,
                    status: "ACTIVE",
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || "Failed to update CTA section"
                );
            }

            setSuccess("CTA section updated successfully!");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update CTA section"
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
                        Loading CTA settings...
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
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                    Call to Action (CTA)
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
                    {/* Get Started Box Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            CTA Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="boxTitle"
                            placeholder="Managing Business Has Never Been So Easy."
                            value={formData.boxTitle}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Get Started Box Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            CTA Description{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="boxDescription"
                            placeholder="Describe the benefits of your system and encourage users to take action..."
                            value={formData.boxDescription}
                            onChange={handleChange}
                            rows={4}
                            required
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Button Text */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Button Text <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="buttonText"
                            placeholder="Get Started"
                            value={formData.buttonText}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Button Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Button Link <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="buttonLink"
                            placeholder="/register"
                            value={formData.buttonLink}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <p className="text-gray-400 text-xs mt-1">
                            Use relative paths like "/register" or absolute URLs
                            like "https://example.com"
                        </p>
                    </div>

                    {/* Toggle Show on Landing Page */}
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={handleToggleChange}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                                formData.showOnLanding
                                    ? "bg-green-500"
                                    : "bg-gray-600"
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                                    formData.showOnLanding
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                }`}
                            />
                        </button>
                        <label className="ml-2 text-sm font-medium text-gray-300">
                            Show at landing page
                        </label>
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
