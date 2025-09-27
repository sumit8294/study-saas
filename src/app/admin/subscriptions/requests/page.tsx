"use client";

import { useState } from "react";
import { FileDown, FileText } from "lucide-react";

interface Subscription {
    id: number;
    tenant: string;
    transactionId: string;
    documentPath: string;
    planName: string;
    planPrice: string;
    month: string;
    status: "Active" | "Pending" | "Cancelled";
    updatedBy: string;
    createdAt: string;
}

export default function SubscriptionTable() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([
        {
            id: 1,
            tenant: "example.com",
            transactionId: "TXN12345",
            documentPath: "/docs/invoice_12345.pdf",
            planName: "Pro Plan",
            planPrice: "$49",
            month: "September",
            status: "Active",
            updatedBy: "Admin",
            createdAt: "2025-09-25",
        },
        {
            id: 2,
            tenant: "startup.io",
            transactionId: "TXN67890",
            documentPath: "/docs/invoice_67890.pdf",
            planName: "Basic Plan",
            planPrice: "$19",
            month: "August",
            status: "Pending",
            updatedBy: "Manager",
            createdAt: "2025-09-20",
        },
    ]);

    const handleDelete = (id: number) => {
        setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        Subscriptions Requests
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Manage all subscriptions Requests and related details.
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

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#111827] shadow-lg">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-[#1F2937]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Tenant
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Transaction ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Document Path
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Plan Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Plan Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Month
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Updated By
                            </th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Created At
                            </th> */}
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {subscriptions.map((sub) => (
                            <tr
                                key={sub.id}
                                className="hover:bg-[#1F2937] transition"
                            >
                                {/* ID */}
                                <td className="px-6 py-4 whitespace-nowrap text-white">
                                    {sub.id}
                                </td>

                                {/* Tenant */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {sub.tenant}
                                </td>

                                {/* Transaction ID */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {sub.transactionId}
                                </td>

                                {/* Document Path */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <a
                                        href={sub.documentPath}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-400 hover:text-indigo-300"
                                    >
                                        View Document
                                    </a>
                                </td>

                                {/* Plan Name */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {sub.planName}
                                </td>

                                {/* Plan Price */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {sub.planPrice}
                                </td>

                                {/* Month */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {sub.month}
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            sub.status === "Active"
                                                ? "bg-green-600/20 text-green-400"
                                                : sub.status === "Pending"
                                                ? "bg-yellow-600/20 text-yellow-400"
                                                : "bg-red-600/20 text-red-400"
                                        }`}
                                    >
                                        {sub.status}
                                    </span>
                                </td>

                                {/* Updated By */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {sub.updatedBy}
                                </td>

                                {/* Created At */}
                                {/* <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {sub.createdAt}
                                </td> */}

                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                                    <a
                                        href={`/admin/subscriptions/edit/${sub.id}`}
                                    >
                                        <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                                            Edit
                                        </button>
                                    </a>
                                    <button
                                        onClick={() => handleDelete(sub.id)}
                                        className="text-red-400 hover:text-red-300 font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* No data message */}
                {subscriptions.length === 0 && (
                    <div className="p-6 text-center text-gray-400">
                        No subscriptions Requests found.
                    </div>
                )}
            </div>
        </div>
    );
}
