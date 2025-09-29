"use client";

import { useState } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";

export default function HeroSettingsPage() {
    const [formData, setFormData] = useState({
        heroTagline: "",
        heroTitle: "",
        heroDescription: "",
        demoButtonText: "",
        demoButtonLink: "",
        getStartedButtonText: "",
        getStartedButtonLink: "",
        showOnLanding: true,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
    };

    return (
        <div className="flex min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <div className="w-72 border-r border-gray-800">
                <SettingsSidebar />
            </div>

            {/* Main Content */}

            <div className="bg-[#111827] flex-1 ml-6 rounded-xl shadow-lg border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Hero</h2>

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
                            placeholder="Acculance SaaS"
                            value={formData.heroTitle}
                            onChange={handleChange}
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
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Demo Button */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Hero Demo Button Text{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="demoButtonText"
                            placeholder="Try Demo"
                            value={formData.demoButtonText}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Hero Demo Button Link{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="demoButtonLink"
                            placeholder="/admin/login"
                            value={formData.demoButtonLink}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Get Started Button */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Hero Get Started Button Text{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="getStartedButtonText"
                            placeholder="Get Started"
                            value={formData.getStartedButtonText}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Hero Get Started Button Link{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="getStartedButtonLink"
                            placeholder="/register"
                            value={formData.getStartedButtonLink}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Toggle Show on Landing */}
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    showOnLanding: !formData.showOnLanding,
                                })
                            }
                            className={` relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                                formData.showOnLanding
                                    ? "bg-indigo-600"
                                    : "bg-gray-600"
                            }`}
                        >
                            <span
                                className={` inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                                    formData.showOnLanding
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                }`}
                            />
                        </button>
                        <label
                            htmlFor="showOnLanding"
                            className="ml-2 text-sm font-medium text-gray-300"
                        >
                            Show at landing page
                        </label>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                        >
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
