"use client";

import { useState } from "react";
import SetupSettingsSidebar from "@/components/admin/SetupSettingsSidebar";
import { Save } from "lucide-react";

export default function GeneralSettingsPage() {
    const [formData, setFormData] = useState({
        companyName: "",
        companyTagline: "",
        email: "",
        phone: "",
        address: "",
        yearlyPlanDiscount: "",
        trialDayCount: "",
        defaultLanguage: "English",
        defaultCurrency: "USD ($)",
        copyrightText: "",
        facebookLink: "",
        instagramLink: "",
        twitterLink: "",
        linkedinLink: "",
        emailOtpVerification: false,
    });

    const [whiteLogo, setWhiteLogo] = useState<File | null>(null);
    const [blackLogo, setBlackLogo] = useState<File | null>(null);
    const [smallLogo, setSmallLogo] = useState<File | null>(null);
    const [favicon, setFavicon] = useState<File | null>(null);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const target = e.target;

        // If it's a checkbox, use `checked`; otherwise, use `value`
        const value =
            target instanceof HTMLInputElement && target.type === "checkbox"
                ? target.checked
                : target.value;

        setFormData({
            ...formData,
            [target.name]: value,
        });
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>
    ) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SetupSettingsSidebar />

            {/* Main Content */}
            <div className="bg-[#111827] flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 space-y-8">
                <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">
                        General Settings
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Company Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-200 mb-4">
                                Add Your Company Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Company Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        placeholder="Your Company Name"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Company Tagline{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="companyTagline"
                                        placeholder="Your Business Slogan"
                                        value={formData.companyTagline}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Email Address{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="email@gmail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Phone Number{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="01700000000"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Address
                                    </label>
                                    <textarea
                                        name="address"
                                        placeholder="Your address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows={2}
                                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pricing Plan */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-200 mb-4">
                                Pricing Plan
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Yearly Plan Discount
                                    </label>
                                    <input
                                        type="text"
                                        name="yearlyPlanDiscount"
                                        placeholder="Enter Yearly Plan Discount"
                                        value={formData.yearlyPlanDiscount}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Trial Day Count{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="trialDayCount"
                                        placeholder="14"
                                        value={formData.trialDayCount}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Default Settings */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-200 mb-4">
                                Default Settings
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Default Language
                                    </label>
                                    <input
                                        type="text"
                                        name="defaultLanguage"
                                        value={formData.defaultLanguage}
                                        disabled
                                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Default Currency{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="defaultCurrency"
                                        value={formData.defaultCurrency}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                        <option>INR (₹)</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Copyright Text{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="copyrightText"
                                        placeholder="Copyright 2025 © By YourCompany. All Rights Reserved."
                                        value={formData.copyrightText}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-200 mb-4">
                                Social Links
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Facebook Link
                                    </label>
                                    <input
                                        type="text"
                                        name="facebookLink"
                                        placeholder="https://www.facebook.com/yourpage"
                                        value={formData.facebookLink}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Instagram Link
                                    </label>
                                    <input
                                        type="text"
                                        name="instagramLink"
                                        placeholder="https://www.instagram.com/yourpage"
                                        value={formData.instagramLink}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Twitter Link
                                    </label>
                                    <input
                                        type="text"
                                        name="twitterLink"
                                        placeholder="https://www.twitter.com/yourpage"
                                        value={formData.twitterLink}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        LinkedIn Link
                                    </label>
                                    <input
                                        type="text"
                                        name="linkedinLink"
                                        placeholder="https://www.linkedin.com/yourpage"
                                        value={formData.linkedinLink}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Logos */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-200 mb-4">
                                Logos
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        White Logo
                                    </label>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            handleFileChange(e, setWhiteLogo)
                                        }
                                        className="mt-1 w-full text-gray-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Black Logo
                                    </label>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            handleFileChange(e, setBlackLogo)
                                        }
                                        className="mt-1 w-full text-gray-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Small Logo
                                    </label>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            handleFileChange(e, setSmallLogo)
                                        }
                                        className="mt-1 w-full text-gray-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Favicon
                                    </label>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            handleFileChange(e, setFavicon)
                                        }
                                        className="mt-1 w-full text-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email OTP Verification */}
                        <div className="flex items-center space-x-3">
                            <label className="text-sm text-gray-300">
                                Email OTP Verification
                            </label>
                            <input
                                type="checkbox"
                                name="emailOtpVerification"
                                checked={formData.emailOtpVerification}
                                onChange={handleChange}
                                className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded"
                            />
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                            >
                                <Save className="w-4 h-4" />
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
