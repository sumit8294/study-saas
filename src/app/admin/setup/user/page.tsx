"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Printer, Edit, Trash2 } from "lucide-react";
import SetupSettingsSidebar from "@/components/admin/SetupSettingsSidebar";

interface User {
    id: number;
    uuid: string;
    name: string;
    email: string;
    role: string;
    mobile: string | null;
    employee_code: string | null;
    created_at: string;
}

export default function UserManagementPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/users");
            const result = await response.json();

            if (result.success) {
                setUsers(result.data);
            } else {
                alert("Failed to fetch users");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    // const handleDelete = async (userId: number) => {
    //     if (!confirm("Are you sure you want to delete this user?")) {
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`/api/users/${userId}`, {
    //             method: "DELETE",
    //         });

    //         const result = await response.json();

    //         if (result.success) {
    //             alert("User deleted successfully");
    //             fetchUsers(); // Refresh the list
    //         } else {
    //             alert(result.error || "Failed to delete user");
    //         }
    //     } catch (error) {
    //         console.error("Error deleting user:", error);
    //         alert("Failed to delete user");
    //     }
    // };

    const handleEdit = (userId: number) => {
        router.push(`/admin/setup/user/edit/${userId}`);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[#0f172a]">
                <SetupSettingsSidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-white">Loading...</div>
                </div>
            </div>
        );
    }

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
                            Users ({users.length})
                        </h2>
                        <div className="flex items-center gap-3">
                            {/* Print Button */}
                            <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm rounded-lg transition">
                                <Printer className="w-4 h-4" />
                                Print
                            </button>
                            {/* Create Button */}
                            <button
                                onClick={() =>
                                    router.push("/admin/setup/user/create")
                                }
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition"
                            >
                                <Plus className="w-4 h-4" />
                                Create
                            </button>
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
                                        Employee Code
                                    </th>
                                    <th className="px-4 py-3 text-left border-b border-gray-700">
                                        Created At
                                    </th>
                                    <th className="px-4 py-3 text-left border-b border-gray-700">
                                        Actions
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
                                            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-300 border-b border-gray-700">
                                            {user.employee_code || "-"}
                                        </td>
                                        <td className="px-4 py-3 text-gray-300 border-b border-gray-700">
                                            {new Date(
                                                user.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 text-gray-300 border-b border-gray-700">
                                            <div className="flex items-center gap-2">
                                                {user.role == "SUPER_ADMIN" ? (
                                                    <></>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(user.id)
                                                        }
                                                        className="p-1 text-blue-400 hover:text-blue-300 transition"
                                                        title="Edit user"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                )}

                                                {/* <button
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                    className="p-1 text-red-400 hover:text-red-300 transition"
                                                    title="Delete user"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-4 py-8 text-center text-gray-500"
                                        >
                                            No users found. Create your first
                                            user!
                                        </td>
                                    </tr>
                                )}
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
