"use client";

import { useState } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { ArrowLeft, Save, RotateCcw, Minus } from "lucide-react";

interface PermissionGroup {
    id: number;
    title: string;
    permissions: string[];
}

export default function CreateRolePage() {
    const [roleName, setRoleName] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
        []
    );

    const permissionGroups: PermissionGroup[] = [
        {
            id: 1,
            title: "Dashboard View",
            permissions: ["Account Summery", "Top Clients", "Top Plans"],
        },
        {
            id: 2,
            title: "Domain Management",
            permissions: ["Domain Management"],
        },
        {
            id: 3,
            title: "Pages",
            permissions: ["Pages Management"],
        },
        {
            id: 4,
            title: "Role & Permissions Management",
            permissions: ["Role & Permissions"],
        },
        {
            id: 5,
            title: "Advanced Settings",
            permissions: ["Advanced Settings"],
        },
        {
            id: 6,
            title: "Setup",
            permissions: [
                "General Settings",
                "Payment Settings",
                "User Management",
            ],
        },
        {
            id: 7,
            title: "Plans",
            permissions: ["Plans Management", "Pricing Features"],
        },
        {
            id: 8,
            title: "Subscriber",
            permissions: ["Subscriber Management"],
        },
        {
            id: 9,
            title: "Extra Management",
            permissions: ["Database Backup", "Payments", "Update Profile"],
        },
        {
            id: 10,
            title: "Landing Page",
            permissions: ["Landing Page Management"],
        },
        {
            id: 11,
            title: "Promotion",
            permissions: ["Promotion"],
        },
        {
            id: 12,
            title: "Tenants",
            permissions: ["Tenants Management"],
        },
    ];

    const togglePermission = (permission: string) => {
        setSelectedPermissions((prev) =>
            prev.includes(permission)
                ? prev.filter((p) => p !== permission)
                : [...prev, permission]
        );
    };

    const resetForm = () => {
        setRoleName("");
        setSelectedPermissions([]);
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6">
                <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">
                            Create Role
                        </h2>
                        <a href="/admin/setup/roles">
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm rounded-lg transition">
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>
                        </a>
                    </div>

                    {/* Role Name Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            placeholder="Enter a name"
                            className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    {/* Permissions Section */}
                    <h3 className="text-lg font-medium text-white mb-4">
                        Select Permissions:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {permissionGroups.map((group) => (
                            <div
                                key={group.id}
                                className="bg-[#1F2937] border border-gray-700 rounded-lg p-4"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-white font-semibold">
                                        {group.title}
                                    </h4>
                                    <Minus className="w-4 h-4 text-gray-400" />
                                </div>
                                <ul className="space-y-2">
                                    {group.permissions.map((perm) => (
                                        <li
                                            key={perm}
                                            className="flex items-center justify-between text-gray-300"
                                        >
                                            <span>{perm}</span>
                                            <input
                                                type="checkbox"
                                                checked={selectedPermissions.includes(
                                                    perm
                                                )}
                                                onChange={() =>
                                                    togglePermission(perm)
                                                }
                                                className="w-4 h-4 accent-indigo-600"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between mt-8 border-t border-gray-700 pt-4">
                        <button
                            onClick={() => alert("Role saved!")}
                            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition"
                        >
                            <Save className="w-4 h-4" />
                            Save
                        </button>

                        <button
                            onClick={resetForm}
                            className="flex items-center gap-2 px-6 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
