"use client";

import { useState, useEffect } from "react";
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
    ownerName?: string;
    createdAt?: string;
}

export default function TenantsPage() {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch tenants from API
    const fetchTenants = async (search = "") => {
        try {
            setLoading(true);
            const url = search
                ? `/api/tenants?search=${encodeURIComponent(search)}`
                : "/api/tenants";
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch tenants");
            }

            const data = await response.json();
            setTenants(data);
            console.log(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error fetching tenants:", err);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchTenants();
    }, []);

    // Handle search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchTenants(searchTerm);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const handleExport = async (type: "pdf" | "csv") => {
        try {
            // You can implement export functionality here
            console.log(`Exporting ${type} for tenants`);
            // For now, we'll just show an alert
            alert(`Export ${type} functionality would be implemented here`);
        } catch (err) {
            setError(`Failed to export ${type}`);
        }
    };

    if (loading && tenants.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex justify-center items-center py-12">
                    <div className="text-white">Loading tenants...</div>
                </div>
            </div>
        );
    }

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
                        {tenants.length > 0 && ` (${tenants.length} tenants)`}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => handleExport("pdf")}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                    >
                        <FileText className="w-4 h-4" />
                        Export PDF
                    </button>
                    <button
                        onClick={() => handleExport("csv")}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                        <FileDown className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Search Bar */}
                <div className="relative w-full md:w-1/3">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search by domain, name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>

                {/* Date Filter */}
                <div className="relative w-full md:w-1/4">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        type="date"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {tenants.map((tenant) => (
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
                            </tr>
                        ))}
                    </tbody>
                </table>

                {tenants.length === 0 && !loading && (
                    <div className="p-6 text-center text-gray-400">
                        {searchTerm
                            ? "No tenants found matching your search."
                            : "No tenants found."}
                    </div>
                )}
            </div>
        </div>
    );
}
