"use client";

import { useState, useEffect } from "react";
import { SearchIcon, FileDown, FileText, CalendarIcon } from "lucide-react";

// Define the status types based on your Prisma schema
type SubscriptionStatus = "ACTIVE" | "EXPIRED" | "CANCELLED" | "SUSPENDED";

interface Subscription {
    id: number;
    uuid: string;
    tenantDomain: string;
    tenantName: string;
    tenantEmail: string;
    planName: string;
    planPrice: number;
    month: string;
    status: SubscriptionStatus;
    approvedBy: string;
    startsAt: string;
    endsAt: string;
    createdAt: string;
    autoRenew: boolean;
}

export default function SubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<SubscriptionStatus | "">(
        ""
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState<number | null>(null);

    const fetchSubscriptions = async (search = "", status = "") => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            if (status) params.append("status", status);

            const url = `/api/subscriptions?${params.toString()}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch subscriptions");
            }

            const data = await response.json();
            setSubscriptions(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error fetching subscriptions:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchSubscriptions(searchTerm, statusFilter);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, statusFilter]);

    const handleStatusUpdate = async (
        id: number,
        status: SubscriptionStatus
    ) => {
        try {
            setActionLoading(id);
            const response = await fetch(`/api/subscriptions/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error("Failed to update subscription");
            }

            // Refresh the list
            fetchSubscriptions(searchTerm, statusFilter);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update subscription"
            );
        } finally {
            setActionLoading(null);
        }
    };

    const handleAutoRenewToggle = async (id: number, autoRenew: boolean) => {
        try {
            setActionLoading(id);
            const response = await fetch(`/api/subscriptions/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ autoRenew }),
            });

            if (!response.ok) {
                throw new Error("Failed to update auto-renew");
            }

            // Refresh the list
            fetchSubscriptions(searchTerm, statusFilter);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update auto-renew"
            );
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (id: number) => {
        if (
            !confirm(
                "Are you sure you want to delete this subscription? This action cannot be undone."
            )
        ) {
            return;
        }

        try {
            setActionLoading(id);
            const response = await fetch(`/api/subscriptions/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete subscription");
            }

            // Refresh the list
            fetchSubscriptions(searchTerm, statusFilter);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to delete subscription"
            );
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusBadge = (status: SubscriptionStatus) => {
        const statusConfig = {
            ACTIVE: {
                color: "bg-green-600/20 text-green-400",
                label: "Active",
            },
            EXPIRED: { color: "bg-red-600/20 text-red-400", label: "Expired" },
            CANCELLED: {
                color: "bg-gray-600/20 text-gray-400",
                label: "Cancelled",
            },
            SUSPENDED: {
                color: "bg-yellow-600/20 text-yellow-400",
                label: "Suspended",
            },
        };

        const config = statusConfig[status];

        return (
            <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}
            >
                {config.label}
            </span>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleExport = (type: "pdf" | "csv") => {
        // Implement export functionality here
        console.log(`Exporting ${type}`);
        alert(`Export ${type} functionality would be implemented here`);
    };

    if (loading && subscriptions.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex justify-center items-center py-12">
                    <div className="text-white">Loading subscriptions...</div>
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
                        Subscriptions
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Manage all active subscription records for tenants.
                        {subscriptions.length > 0 &&
                            ` (${subscriptions.length} subscriptions)`}
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
                        placeholder="Search by tenant, plan, or month"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>

                {/* Status Filter */}
                <div className="w-full md:w-1/4">
                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value as SubscriptionStatus | ""
                            )
                        }
                        className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    >
                        <option value="">All Status</option>
                        <option value="ACTIVE">Active</option>
                        <option value="EXPIRED">Expired</option>
                        <option value="CANCELLED">Cancelled</option>
                        <option value="SUSPENDED">Suspended</option>
                    </select>
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
                                Tenant
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Plan
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Month
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Auto Renew
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Approved By
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Start Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                End Date
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {subscriptions.map((subscription) => (
                            <tr
                                key={subscription.id}
                                className="hover:bg-[#1F2937] transition"
                            >
                                {/* Tenant */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-white font-medium">
                                            {subscription.tenantName}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            {subscription.tenantDomain}
                                        </div>
                                        <div className="text-gray-500 text-xs">
                                            {subscription.tenantEmail}
                                        </div>
                                    </div>
                                </td>

                                {/* Plan */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-white font-medium">
                                            {subscription.planName}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            ${subscription.planPrice}
                                        </div>
                                    </div>
                                </td>

                                {/* Month */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {subscription.month}
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getStatusBadge(subscription.status)}
                                </td>

                                {/* Auto Renew */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() =>
                                            handleAutoRenewToggle(
                                                subscription.id,
                                                !subscription.autoRenew
                                            )
                                        }
                                        disabled={
                                            actionLoading === subscription.id
                                        }
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            subscription.autoRenew
                                                ? "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                                                : "bg-gray-600/20 text-gray-400 hover:bg-gray-600/30"
                                        } disabled:opacity-50`}
                                    >
                                        {subscription.autoRenew ? "Yes" : "No"}
                                    </button>
                                </td>

                                {/* Approved By */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {subscription.approvedBy}
                                </td>

                                {/* Start Date */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {formatDate(subscription.startsAt)}
                                </td>

                                {/* End Date */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {formatDate(subscription.endsAt)}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <select
                                        value=""
                                        onChange={(e) => {
                                            const action = e.target.value;
                                            if (action === "suspend") {
                                                handleStatusUpdate(
                                                    subscription.id,
                                                    "SUSPENDED"
                                                );
                                            } else if (action === "activate") {
                                                handleStatusUpdate(
                                                    subscription.id,
                                                    "ACTIVE"
                                                );
                                            } else if (action === "cancel") {
                                                handleStatusUpdate(
                                                    subscription.id,
                                                    "CANCELLED"
                                                );
                                            } else if (action === "delete") {
                                                handleDelete(subscription.id);
                                            }
                                            e.target.value = "";
                                        }}
                                        disabled={
                                            actionLoading === subscription.id
                                        }
                                        className="bg-gray-800 border border-gray-600 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                                    >
                                        <option
                                            value=""
                                            className="text-gray-400"
                                        >
                                            {actionLoading === subscription.id
                                                ? "Processing..."
                                                : "Actions"}
                                        </option>
                                        {subscription.status === "ACTIVE" && (
                                            <option value="suspend">
                                                Suspend
                                            </option>
                                        )}
                                        {(subscription.status === "SUSPENDED" ||
                                            subscription.status ===
                                                "CANCELLED") && (
                                            <option value="activate">
                                                Activate
                                            </option>
                                        )}
                                        {subscription.status !==
                                            "CANCELLED" && (
                                            <option value="cancel">
                                                Cancel
                                            </option>
                                        )}
                                        <option value="delete">Delete</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* No data message */}
                {subscriptions.length === 0 && !loading && (
                    <div className="p-6 text-center text-gray-400">
                        {searchTerm || statusFilter
                            ? "No subscriptions found matching your criteria."
                            : "No subscriptions found."}
                    </div>
                )}

                {loading && subscriptions.length > 0 && (
                    <div className="p-6 text-center text-gray-400">
                        Loading...
                    </div>
                )}
            </div>
        </div>
    );
}
