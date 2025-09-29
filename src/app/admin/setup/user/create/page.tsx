"use client";

import { useState } from "react";
import { ArrowLeft, Save, RotateCcw } from "lucide-react";
import SetupSettingsSidebar from "@/components/admin/SetupSettingsSidebar";

export default function CreateUserPage() {
    const [formData, setFormData] = useState({
        name: "",
        role: "Super Admin",
        email: "",
        password: "",
        confirmPassword: "",
        sendWelcome: true,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const resetForm = () => {
        setFormData({
            name: "",
            role: "Super Admin",
            email: "",
            password: "",
            confirmPassword: "",
            sendWelcome: true,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("User Data Submitted:", formData);
        alert("User saved successfully!");
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SetupSettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6">
                <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">
                            Create a new user
                        </h2>
                        <a href="/admin/setup/user">
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm rounded-lg transition">
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>
                        </a>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter a name"
                                    className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Role <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                >
                                    <option value="Super Admin">
                                        Super Admin
                                    </option>
                                    <option value="Admin">Admin</option>
                                    <option value="Editor">Editor</option>
                                    <option value="Viewer">Viewer</option>
                                </select>
                            </div>

                            {/* Email */}
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email address"
                                    className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Password{" "}
                                    <span className="text-gray-400">
                                        (Default password: 12345678)
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="********"
                                    className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="********"
                                    className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Welcome Email Checkbox */}
                        <div className="flex items-center gap-3 mt-6">
                            <input
                                type="checkbox"
                                name="sendWelcome"
                                checked={formData.sendWelcome}
                                onChange={handleChange}
                                className="w-4 h-4 accent-indigo-600"
                            />
                            <label className="text-gray-300 text-sm">
                                Send Welcome Mail
                            </label>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-between mt-8 border-t border-gray-700 pt-4">
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition"
                            >
                                <Save className="w-4 h-4" />
                                Save
                            </button>

                            <button
                                type="button"
                                onClick={resetForm}
                                className="flex items-center gap-2 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
