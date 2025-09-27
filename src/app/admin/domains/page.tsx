"use client";

import { useState } from "react";
import { CalendarIcon, SearchIcon, Trash2 } from "lucide-react";

interface Domain {
    id: number;
    domain: string;
    tenantName: string;
    tenantEmail: string;
}

export default function DomainsPage() {
    const [domains, setDomains] = useState<Domain[]>([
        {
            id: 1,
            domain: "example.com",
            tenantName: "John Doe",
            tenantEmail: "john@example.com",
        },
        {
            id: 2,
            domain: "startup.io",
            tenantName: "Jane Smith",
            tenantEmail: "jane@startup.io",
        },
        {
            id: 3,
            domain: "business.org",
            tenantName: "Alex Johnson",
            tenantEmail: "alex@business.org",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    // Handle delete request
    const handleDelete = (id: number) => {
        setDomains((prevDomains) => prevDomains.filter((req) => req.id !== id));
    };

    // Filter logic for search
    const filteredDomains = domains.filter(
        (req) =>
            req.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.tenantEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        Domains
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Manage tenant domains.
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#111827] shadow-lg">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-[#1F2937]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Domain
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Tenant
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredDomains.map((req) => (
                            <tr
                                key={req.id}
                                className="hover:bg-[#1F2937] transition"
                            >
                                {/* ID */}
                                <td className="px-6 py-4 whitespace-nowrap text-white">
                                    {req.id}
                                </td>

                                {/* Domain */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {req.domain}
                                </td>

                                {/* Tenant Info (Name + Email) */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-gray-300">
                                        <div className="font-medium">
                                            {req.tenantName}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            {req.tenantEmail}
                                        </div>
                                    </div>
                                </td>

                                {/* Action - Delete */}
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <button
                                        onClick={() => handleDelete(req.id)}
                                        className="flex items-center gap-1 text-red-400 hover:text-red-300 font-medium"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredDomains.length === 0 && (
                    <div className="p-6 text-center text-gray-400">
                        No domains found.
                    </div>
                )}
            </div>
        </div>
    );
}
