"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, RotateCcw } from "lucide-react";
import SetupSettingsSidebar from "@/components/admin/SetupSettingsSidebar";

interface Role {
    id: string;
    name: string;
    description: string;
    isSystem: boolean;
}

interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
    roleId: string;
    employee_code: string;
    mobile: string;
    country_code: string;
}

export default function EditUserPage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;

    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        email: "",
        password: "",
        confirmPassword: "",
        employee_code: "",
        mobile: "",
        country_code: "+1",
    });

    useEffect(() => {
        fetchRoles();
        fetchUser();
    }, [userId]);

    const fetchRoles = async () => {
        try {
            const response = await fetch("/api/setup/roles");
            const result = await response.json();

            if (result) {
                setRoles(result);
            }
        } catch (error) {
            console.error("Error fetching roles:", error);
            alert("Failed to load roles");
        }
    };

    const fetchUser = async () => {
        try {
            const response = await fetch(`/api/users/${userId}`);
            const result = await response.json();

            if (result.success) {
                const userData: UserData = result.data;
                setFormData({
                    name: userData.name || "",
                    role: userData.role || "",
                    email: userData.email || "",
                    password: "",
                    confirmPassword: "",
                    employee_code: userData.employee_code || "",
                    mobile: userData.mobile || "",
                    country_code: userData.country_code || "+1",
                });
            } else {
                alert(result.error || "Failed to load user");
                router.push("/admin/setup/user");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            alert("Failed to load user");
            router.push("/admin/setup/user");
        } finally {
            setUserLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const resetForm = () => {
        fetchUser(); // Reset to original values
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (
            formData.password &&
            formData.password !== formData.confirmPassword
        ) {
            alert("Passwords don't match!");
            return;
        }

        if (formData.password && formData.password.length < 8) {
            alert("Password must be at least 8 characters long!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password || undefined, // Only send if provided
                    role: formData.role,
                    employee_code: formData.employee_code,
                    mobile: formData.mobile,
                    country_code: formData.country_code,
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert("User updated successfully!");
                router.push("/admin/setup/user");
            } else {
                alert(result.error || "Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user");
        } finally {
            setLoading(false);
        }
    };

    if (userLoading) {
        return (
            <div className="flex min-h-screen bg-[#0f172a]">
                <SetupSettingsSidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-white">Loading user data...</div>
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
                            Edit User
                        </h2>
                        <button
                            onClick={() => router.push("/admin/setup/user")}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm rounded-lg transition"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>
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
                                    placeholder="Enter full name"
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
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                            </div>

                            {/* Employee Code */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Employee Code
                                </label>
                                <input
                                    type="text"
                                    name="employee_code"
                                    value={formData.employee_code}
                                    onChange={handleChange}
                                    placeholder="Enter employee code"
                                    className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>

                            {/* Mobile */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Mobile
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        name="country_code"
                                        value={formData.country_code}
                                        onChange={handleChange}
                                        className="w-1/3 px-3 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    >
                                        <option value="+1">+1 (US)</option>
                                        <option value="+44">+44 (UK)</option>
                                        <option value="+91">+91 (IN)</option>
                                        <option value="+61">+61 (AU)</option>
                                    </select>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="Enter mobile number"
                                        className="flex-1 px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    New Password
                                    <span className="text-gray-400 text-xs ml-2">
                                        (Leave blank to keep current)
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter new password"
                                    className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    minLength={8}
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm new password"
                                    className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-between mt-8 border-t border-gray-700 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white text-sm rounded-lg transition"
                            >
                                <Save className="w-4 h-4" />
                                {loading ? "Updating..." : "Update"}
                            </button>

                            <button
                                type="button"
                                onClick={resetForm}
                                disabled={loading}
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
