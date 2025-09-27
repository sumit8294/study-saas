"use client";

import Image from "next/image";
import { useState } from "react";
import { CalendarIcon, SearchIcon, FileDown, FileText } from "lucide-react";

interface Tenant {
    id: number;
    domain: string;
    name: string;
    email: string;
    plan: string;
    onTrial: boolean;
    isVerified: boolean;
    isSubscribed: boolean;
    banned: boolean;
}

export default function TenantsPage() {
    const [tenants, setTenants] = useState<Tenant[]>([
        {
            id: 1,
            domain: "example.com",
            name: "John Doe",
            email: "john@example.com",
            plan: "Pro Plan",
            onTrial: true,
            isVerified: true,
            isSubscribed: true,
            banned: false,
        },
        {
            id: 2,
            domain: "startup.io",
            name: "Jane Smith",
            email: "jane@startup.io",
            plan: "Basic Plan",
            onTrial: false,
            isVerified: true,
            isSubscribed: false,
            banned: false,
        },
        {
            id: 3,
            domain: "enterprise.org",
            name: "Alex Johnson",
            email: "alex@enterprise.org",
            plan: "Enterprise Plan",
            onTrial: false,
            isVerified: false,
            isSubscribed: true,
            banned: true,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (id: number) => {
        setTenants(tenants.filter((tenant) => tenant.id !== id));
    };

    const filteredTenants = tenants.filter(
        (tenant) =>
            tenant.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        Tenants
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Manage all tenants, their plans, and subscription
                        status.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                        <FileText className="w-4 h-4" />
                        Export PDF
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
                        <FileDown className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Search Bar */}
                <div className="relative w-full md:w-1/3">
                    <SearchIcon
                        style={{
                            position: "absolute",
                            top: "12px",
                            left: "4px",
                        }}
                        className="absolute left-3 top-[10px] -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="Search by domain, name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-6 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>

                {/* Date Filter */}
                <div className="relative w-full md:w-1/4">
                    <CalendarIcon
                        style={{
                            position: "absolute",
                            top: "12px",
                            left: "4px",
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                    />
                    <input
                        type="date"
                        className="w-full px-6 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#111827] shadow-lg">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-[#1F2937]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Domain
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Name & Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Plan
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                On Trial
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Verified
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Subscribed
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Banned
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredTenants.map((tenant) => (
                            <tr
                                key={tenant.id}
                                className="hover:bg-[#1F2937] transition"
                            >
                                {/* Domain */}
                                <td className="px-6 py-4 whitespace-nowrap text-white">
                                    {tenant.domain}
                                </td>

                                {/* Name & Email */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-white font-medium">
                                            {tenant.name}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            {tenant.email}
                                        </div>
                                    </div>
                                </td>

                                {/* Plan */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {tenant.plan}
                                </td>

                                {/* On Trial */}
                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            tenant.onTrial
                                                ? "bg-green-600/20 text-green-400"
                                                : "bg-gray-700 text-gray-400"
                                        }`}
                                    >
                                        {tenant.onTrial ? "Yes" : "No"}
                                    </span>
                                </td>

                                {/* Verified */}
                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            tenant.isVerified
                                                ? "bg-green-600/20 text-green-400"
                                                : "bg-red-600/20 text-red-400"
                                        }`}
                                    >
                                        {tenant.isVerified ? "Yes" : "No"}
                                    </span>
                                </td>

                                {/* Subscribed */}
                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            tenant.isSubscribed
                                                ? "bg-green-600/20 text-green-400"
                                                : "bg-gray-700 text-gray-400"
                                        }`}
                                    >
                                        {tenant.isSubscribed ? "Yes" : "No"}
                                    </span>
                                </td>

                                {/* Banned */}
                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            tenant.banned
                                                ? "bg-red-600/20 text-red-400"
                                                : "bg-gray-700 text-gray-400"
                                        }`}
                                    >
                                        {tenant.banned ? "Yes" : "No"}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                                    <a
                                        href={`/admin/tenants/edit/${tenant.id}`}
                                    >
                                        <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                                            Edit
                                        </button>
                                    </a>
                                    <button
                                        onClick={() => handleDelete(tenant.id)}
                                        className="text-red-400 hover:text-red-300 font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredTenants.length === 0 && (
                    <div className="p-6 text-center text-gray-400">
                        No tenants found.
                    </div>
                )}
            </div>
        </div>
    );
}
