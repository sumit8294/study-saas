"use client";

import { useState } from "react";
import SetupSettingsSidebar from "@/components/admin/SetupSettingsSidebar";

export default function MailConfigurationPage() {
    const [formData, setFormData] = useState({
        mailMailer: "smtp",
        mailHost: "",
        mailPort: "",
        mailUsername: "",
        mailPassword: "",
        mailEncryption: "tls",
        mailFromAddress: "",
        mailFromName: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Mail Config Data:", formData);
        // TODO: Send data to API
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SetupSettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                    Mail Configuration
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* MAIL MAILER */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            MAIL MAILER <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="mailMailer"
                            placeholder="smtp"
                            value={formData.mailMailer}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* MAIL HOST */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            MAIL HOST <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="mailHost"
                            placeholder="apply.tech"
                            value={formData.mailHost}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* MAIL PORT */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            MAIL PORT <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="mailPort"
                            placeholder="465"
                            value={formData.mailPort}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* MAIL USERNAME */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            MAIL USERNAME{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="mailUsername"
                            placeholder="noreply@apply.tech"
                            value={formData.mailUsername}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* MAIL PASSWORD */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            MAIL PASSWORD{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="mailPassword"
                            placeholder="Enter Mail Password"
                            value={formData.mailPassword}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* MAIL ENCRYPTION */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            MAIL ENCRYPTION{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="mailEncryption"
                            placeholder="tls"
                            value={formData.mailEncryption}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* MAIL FROM ADDRESS */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            MAIL FROM ADDRESS{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="mailFromAddress"
                            placeholder="noreply@apply.tech"
                            value={formData.mailFromAddress}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* MAIL FROM NAME */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            MAIL FROM NAME{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="mailFromName"
                            placeholder="${APP_NAME}"
                            value={formData.mailFromName}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                        >
                            Save changes
                        </button>

                        <button
                            type="button"
                            onClick={() => alert("Testing connection...")}
                            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
                        >
                            <span>Test Connection</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
