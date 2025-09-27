"use client";

import { useState } from "react";
import { CalendarIcon, SearchIcon } from "lucide-react";

interface DomainRequest {
    id: number;
    domain: string;
    tenantName: string;
    tenantEmail: string;
    status: "Pending" | "Connected" | "Rejected" | "Removed";
}

export default function DomainsRequestPage() {
    const [requests, setRequests] = useState<DomainRequest[]>([
        {
            id: 1,
            domain: "example.com",
            tenantName: "John Doe",
            tenantEmail: "john@example.com",
            status: "Pending",
        },
        {
            id: 2,
            domain: "startup.io",
            tenantName: "Jane Smith",
            tenantEmail: "jane@startup.io",
            status: "Connected",
        },
        {
            id: 3,
            domain: "business.org",
            tenantName: "Alex Johnson",
            tenantEmail: "alex@business.org",
            status: "Rejected",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    // Handle status change
    const handleStatusChange = (id: number, newStatus: string) => {
        setRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.id === id
                    ? {
                          ...request,
                          status: newStatus as DomainRequest["status"],
                      }
                    : request
            )
        );
    };

    const filteredRequests = requests.filter(
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
                        Domain Requests
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Manage tenant domain connection requests.
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#111827] shadow-lg">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-[#1F2937]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                #
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Requested Domain
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Tenant Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Tenant Email
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredRequests.map((req, index) => (
                            <tr
                                key={req.id}
                                className="hover:bg-[#1F2937] transition"
                            >
                                {/* Index */}
                                <td className="px-6 py-4 whitespace-nowrap text-white">
                                    {index + 1}
                                </td>

                                {/* Requested Domain */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {req.domain}
                                </td>

                                {/* Tenant Name */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {req.tenantName}
                                </td>

                                {/* Tenant Email */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {req.tenantEmail}
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`px-3 py-1 text-xs font-semibold rounded-full
                                            ${
                                                req.status === "Connected"
                                                    ? "bg-green-600/20 text-green-400"
                                                    : req.status === "Rejected"
                                                    ? "bg-red-600/20 text-red-400"
                                                    : req.status === "Removed"
                                                    ? "bg-gray-600/20 text-gray-400"
                                                    : "bg-yellow-600/20 text-yellow-400"
                                            }
                                        `}
                                    >
                                        {req.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <select
                                        value={req.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                req.id,
                                                e.target.value
                                            )
                                        }
                                        className="bg-[#1F2937] border border-gray-700 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Connected">
                                            Connected
                                        </option>
                                        <option value="Rejected">
                                            Rejected
                                        </option>
                                        <option value="Removed">Removed</option>
                                        <option value="Delete">Delete</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredRequests.length === 0 && (
                    <div className="p-6 text-center text-gray-400">
                        No domain requests found.
                    </div>
                )}
            </div>
        </div>
    );
}
