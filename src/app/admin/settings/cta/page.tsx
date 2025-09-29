"use client";

import { useState } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";

export default function CTASettingsPage() {
    const [formData, setFormData] = useState({
        boxTitle: "",
        boxDescription: "",
        buttonText: "",
        buttonLink: "",
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
        console.log("CTA Data Submitted:", formData);
    };

    return (
        <div className="flex flex-col lg:flex-row  min-h-screen bg-[#0f172a]">
            {/* Sidebar */}

            <SettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                    All Features And Get Started
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Get Started Box Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Get Started Box Title{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="boxTitle"
                            placeholder="Managing Business Has Never Been So Easy."
                            value={formData.boxTitle}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Get Started Box Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Get Started Box Description{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="boxDescription"
                            placeholder="Describe the benefits of your system..."
                            value={formData.boxDescription}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Button Text */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Get Started Box Button Text{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="buttonText"
                            placeholder="Get Started"
                            value={formData.buttonText}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Button Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Get Started Box Button Link{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="buttonLink"
                            placeholder="/register"
                            value={formData.buttonLink}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Toggle Show on Landing Page */}
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    showOnLanding: !formData.showOnLanding,
                                })
                            }
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
