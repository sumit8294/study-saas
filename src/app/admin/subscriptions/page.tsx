"use client";

import { useState } from "react";

interface Subscription {
    id: number;
    tenant: string;
    month: string;
    plan: string;
    approvedBy: string;
    createdAt: string;
    endsAt: string;
}

export default function SubscriptionPage() {
    const [subscriptions] = useState<Subscription[]>([
        {
            id: 1,
            tenant: "John Doe",
            month: "September",
            plan: "Pro Plan",
            approvedBy: "Admin",
            createdAt: "2025-09-01",
            endsAt: "2025-09-30",
        },
        {
            id: 2,
            tenant: "Jane Smith",
            month: "September",
            plan: "Basic Plan",
            approvedBy: "Manager",
            createdAt: "2025-09-05",
            endsAt: "2025-10-04",
        },
        {
            id: 3,
            tenant: "Alex Johnson",
            month: "October",
            plan: "Enterprise Plan",
            approvedBy: "Admin",
            createdAt: "2025-10-01",
            endsAt: "2025-10-31",
        },
    ]);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        Subscriptions
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Manage all subscription records for tenants.
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#111827] shadow-lg">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-[#1F2937]">
                        <tr>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Tenant
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Month
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Plan
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Approved By
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Created At
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Ends At
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {subscriptions.map((subscription) => (
                            <tr
                                key={subscription.id}
                                className="hover:bg-[#1F2937] transition"
                            >
                                {/* ID */}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-400">
                                    #{subscription.id}
                                </td>
                                {/* Tenant */}
                                <td className="px-6 py-4 whitespace-nowrap text-white">
                                    {subscription.tenant}
                                </td>

                                {/* Month */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {subscription.month}
                                </td>

                                {/* Plan */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {subscription.plan}
                                </td>

                                {/* Approved By */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {subscription.approvedBy}
                                </td>

                                {/* Created At */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {subscription.createdAt}
                                </td>

                                {/* Ends At */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {subscription.endsAt}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {subscriptions.length === 0 && (
                    <div className="p-6 text-center text-gray-400">
                        No subscriptions found.
                    </div>
                )}
            </div>
        </div>
    );
}
