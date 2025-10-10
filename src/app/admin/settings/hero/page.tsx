"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { Save, Loader2 } from "lucide-react";

interface HeroFormData {
    heroTagline: string;
    heroTitle: string;
    heroDescription: string;
    demoButtonText: string;
    demoButtonLink: string;
    getStartedButtonText: string;
    getStartedButtonLink: string;
    showOnLanding: boolean;
}

interface HeroSection {
    id: number;
    content: HeroFormData;
    show_on_landing: boolean;
    status: string;
}

export default function HeroSettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState<HeroFormData>({
        heroTagline: "",
        heroTitle: "",
        heroDescription: "",
        demoButtonText: "",
        demoButtonLink: "",
        getStartedButtonText: "",
        getStartedButtonLink: "",
        showOnLanding: true,
    });

    // Fetch hero section data
    useEffect(() => {
        const fetchHeroSection = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/website-sections/hero");

                if (!response.ok) {
                    throw new Error("Failed to fetch hero section");
                }

                const data = await response.json();
                console.log(data);

                if (data.section && data.section.content) {
                    setFormData({
                        heroTagline: data.section.content.heroTagline || "",
                        heroTitle: data.section.content.heroTitle || "",
                        heroDescription:
                            data.section.content.heroDescription || "",
                        demoButtonText:
                            data.section.content.demoButtonText || "",
                        demoButtonLink:
                            data.section.content.demoButtonLink || "",
                        getStartedButtonText:
                            data.section.content.getStartedButtonText || "",
                        getStartedButtonLink:
                            data.section.content.getStartedButtonLink || "",
                        showOnLanding: data.section.show_on_landing ?? true,
                    });
                }
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load hero section"
                );
                console.error("Error fetching hero section:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHeroSection();
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
            const response = await fetch("/api/website-sections/hero", {
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
                    errorData.error || "Failed to update hero section"
                );
            }

            setSuccess("Hero section updated successfully!");

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update hero section"
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
                        Loading hero settings...
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
                    Hero Section
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
                    {/* Hero Tagline */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Hero Tagline <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="heroTagline"
                            placeholder="Our Platform, Your Business"
                            value={formData.heroTagline}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Hero Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Hero Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="heroTitle"
                            placeholder="Apply SaaS"
                            value={formData.heroTitle}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Hero Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Hero Description{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="heroDescription"
                            placeholder="Describe your SaaS platform..."
                            value={formData.heroDescription}
                            onChange={handleChange}
                            rows={3}
                            required
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Demo Button */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Demo Button Text{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="demoButtonText"
                                placeholder="Try Demo"
                                value={formData.demoButtonText}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Demo Button Link{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="demoButtonLink"
                                placeholder="/admin/login"
                                value={formData.demoButtonLink}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Get Started Button */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Get Started Button Text{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="getStartedButtonText"
                                placeholder="Get Started"
                                value={formData.getStartedButtonText}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Get Started Button Link{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="getStartedButtonLink"
                                placeholder="/register"
                                value={formData.getStartedButtonLink}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Toggle Show on Landing */}
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
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
