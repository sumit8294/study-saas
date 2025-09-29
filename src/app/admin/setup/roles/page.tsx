"use client";

import { useState } from "react";

import { Plus, Printer } from "lucide-react";
import SetupSettingsSidebar from "@/components/admin/SetupSettingsSidebar";

interface Role {
    id: number;
    name: string;
}

export default function RolesAndPermissionsPage() {
    const [roles] = useState<Role[]>([{ id: 1, name: "Super Admin" }]);
    const [perPage, setPerPage] = useState<number>(10);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SetupSettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6">
                <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">
                            Roles & Permissions
                        </h2>

                        <div className="flex items-center gap-3">
                            {/* Print Button */}
                            <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm rounded-lg transition">
                                <Printer className="w-4 h-4" />
                            </button>
                            <a href="/admin/setup/roles/create">
                                {/* Create Button */}
                                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition">
                                    <Plus className="w-4 h-4" />
                                    Create
                                </button>
                            </a>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-[#1F2937]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Role Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {roles.map((role, index) => (
                                    <tr
                                        key={role.id}
                                        className="hover:bg-[#1F2937]"
                                    >
                                        <td className="px-6 py-4 text-gray-300">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {role.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">
                                            {/* Future Edit/Delete actions */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Section */}
                    <div className="mt-6 flex items-center justify-between  rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-300">
                                Per Page
                            </span>
                            <select
                                value={perPage}
                                onChange={(e) =>
                                    setPerPage(Number(e.target.value))
                                }
                                className="text-sm rounded-md bg-[#111827] border border-gray-700 text-white px-2 py-1 focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
