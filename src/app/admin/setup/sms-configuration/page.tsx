"use client";

import { useState } from "react";
import SetupSettingsSidebar from "@/components/admin/SetupSettingsSidebar";

export default function SMSConfigurationPage() {
    const [formData, setFormData] = useState({
        accountSid: "",
        authToken: "",
        fromNumber: "",
        serviceSid: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("SMS Config Data:", formData);
        // TODO: Connect with API
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SetupSettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                    SMS Configuration
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* TWILIO ACCOUNT SID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            TWILIO ACCOUNT SID{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="accountSid"
                            placeholder="TWILIO ACCOUNT SID"
                            value={formData.accountSid}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* TWILIO AUTH TOKEN */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            TWILIO AUTH TOKEN{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="authToken"
                            placeholder="TWILIO AUTH TOKEN"
                            value={formData.authToken}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* TWILIO FROM NUMBER */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            TWILIO FROM NUMBER{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="fromNumber"
                            placeholder="TWILIO FROM NUMBER"
                            value={formData.fromNumber}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* TWILIO SMS SERVICE SID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            TWILIO SMS SERVICE SID{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="serviceSid"
                            placeholder="TWILIO SMS SERVICE SID"
                            value={formData.serviceSid}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Save Changes Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all"
                        >
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
