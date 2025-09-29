"use client";

import { useState } from "react";
import { Plus, Printer } from "lucide-react";
import SetupSettingsSidebar from "@/components/admin/SetupSettingsSidebar";

export default function UserManagementPage() {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Super Admin",
            email: "superadmin@apply.com",
            role: "super-admin",
        },
    ]);

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
                            Users
                        </h2>
                        <div className="flex items-center gap-3">
                            {/* Print Button */}
                            <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm rounded-lg transition">
                                <Printer className="w-4 h-4" />
                                Print
                            </button>
                            {/* Create Button */}
                            <a href="/admin/setup/user/create">
                                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition">
                                    <Plus className="w-4 h-4" />
                                    Create
                                </button>
                            </a>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border border-gray-700 rounded-lg overflow-hidden">
                            <thead className="bg-gray-800 text-gray-300">
                                <tr>
                                    <th className="px-4 py-3 text-left border-b border-gray-700">
                                        #
                                    </th>
                                    <th className="px-4 py-3 text-left border-b border-gray-700">
                                        Name
                                    </th>
                                    <th className="px-4 py-3 text-left border-b border-gray-700">
                                        Email
                                    </th>
                                    <th className="px-4 py-3 text-left border-b border-gray-700">
                                        Role
                                    </th>
                                    <th className="px-4 py-3 text-left border-b border-gray-700">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-800 transition-colors"
                                    >
                                        <td className="px-4 py-3 text-gray-300 border-b border-gray-700">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3 text-gray-300 border-b border-gray-700 flex items-center gap-2">
                                            {/* Avatar with initials */}
                                            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-medium text-white">
                                                {user.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .toUpperCase()}
                                            </div>
                                            {user.name}
                                        </td>
                                        <td className="px-4 py-3 border-b border-gray-700">
                                            <a
                                                href={`mailto:${user.email}`}
                                                className="text-indigo-400 hover:text-indigo-300 transition"
                                            >
                                                {user.email}
                                            </a>
                                        </td>
                                        <td className="px-4 py-3 text-gray-300 border-b border-gray-700">
                                            {user.role}
                                        </td>
                                        <td className="px-4 py-3 text-gray-300 border-b border-gray-700">
                                            {/* Future action buttons like edit or delete */}
                                            <span className="text-gray-500 italic">
                                                -
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                            <label className="text-gray-400 text-sm">
                                Per Page
                            </label>
                            <select className="bg-[#0f172a] border border-gray-700 rounded-lg text-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Showing {users.length} of {users.length} users
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
