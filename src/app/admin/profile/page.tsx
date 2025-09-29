"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

export default function UpdateProfile() {
    const [form, setForm] = useState({
        name: "Super Admin",
        email: "superadmin@apply.com",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Profile Updated", form);
    };

    return (
        <div className="flex min-h-screen bg-[#111827]">
            <div className="flex-1">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-white">
                            Update Profile
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Manage your personal information and credentials.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="bg-[#1f2937] rounded-lg p-6 text-center">
                        <div className="w-28 h-28 mx-auto rounded-full bg-gray-700 flex items-center justify-center text-3xl font-semibold text-gray-300 border-4 border-gray-600">
                            SA
                        </div>
                        <h2 className="mt-4 text-xl font-medium text-white">
                            Super Admin
                        </h2>
                        <p className="text-gray-400 text-sm">super-admin</p>
                    </div>

                    {/* Form Section */}
                    <div className="md:col-span-2 bg-[#1f2937] rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded bg-[#111827] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Email{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded bg-[#111827] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Current Password */}
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    placeholder="Enter current password"
                                    value={form.currentPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded bg-[#111827] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="Enter new password"
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded bg-[#111827] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm new password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded bg-[#111827] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
