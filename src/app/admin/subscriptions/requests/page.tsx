"use client";

import { useState, useEffect } from "react";
import {
    SearchIcon,
    FileDown,
    FileText,
    Eye,
    CheckCircle,
    XCircle,
} from "lucide-react";

// Define the status types based on your Prisma schema
type SubscriptionRequestStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "UNDER_REVIEW";

interface SubscriptionRequest {
    id: number;
    uuid: string;
    tenantDomain: string;
    tenantName: string;
    transactionId: string | null;
    documentPath: string | null;
    planName: string;
    planPrice: number;
    month: string;
    status: SubscriptionRequestStatus;
    requestedAt: string;
    reviewedBy: string;
    adminNotes: string | null;
}

export default function SubscriptionRequestsPage() {
    const [requests, setRequests] = useState<SubscriptionRequest[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<
        SubscriptionRequestStatus | ""
    >("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState<number | null>(null);

    const fetchRequests = async (search = "", status = "") => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            if (status) params.append("status", status);

            const url = `/api/subscription-requests?${params.toString()}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch subscription requests");
            }

            const data = await response.json();
            setRequests(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error fetching subscription requests:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchRequests(searchTerm, statusFilter);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, statusFilter]);

    const handleStatusUpdate = async (
        id: number,
        status: SubscriptionRequestStatus
    ) => {
        try {
            setActionLoading(id);
            const response = await fetch(`/api/subscription-requests/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status,
                    reviewedBy: 1, // This should come from your auth context
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update request");
            }

            // Refresh the list
            fetchRequests(searchTerm, statusFilter);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to update request"
            );
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (id: number) => {
        if (
            !confirm(
                "Are you sure you want to delete this subscription request?"
            )
        ) {
            return;
        }

        try {
            setActionLoading(id);
            const response = await fetch(`/api/subscription-requests/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete request");
            }

            // Refresh the list
            fetchRequests(searchTerm, statusFilter);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to delete request"
            );
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusBadge = (status: SubscriptionRequestStatus) => {
        const statusConfig = {
            PENDING: {
                color: "bg-yellow-600/20 text-yellow-400",
                label: "Pending",
            },
            APPROVED: {
                color: "bg-green-600/20 text-green-400",
                label: "Approved",
            },
            REJECTED: {
                color: "bg-red-600/20 text-red-400",
                label: "Rejected",
            },
            UNDER_REVIEW: {
                color: "bg-blue-600/20 text-blue-400",
                label: "Under Review",
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

    const handleExport = (type: "pdf" | "csv") => {
        // Implement export functionality here
        console.log(`Exporting ${type}`);
        alert(`Export ${type} functionality would be implemented here`);
    };

    if (loading && requests.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex justify-center items-center py-12">
                    <div className="text-white">
                        Loading subscription requests...
                    </div>
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
                        Subscription Requests
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Manage all subscription requests and related details.
                        {requests.length > 0 &&
                            ` (${requests.length} requests)`}
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
                        placeholder="Search by transaction ID, domain, or plan"
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
                                e.target.value as SubscriptionRequestStatus | ""
                            )
                        }
                        className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    >
                        <option value="">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="UNDER_REVIEW">Under Review</option>
                    </select>
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
                                Document
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
                                Reviewed By
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {requests.map((request) => (
                            <tr
                                key={request.id}
                                className="hover:bg-[#1F2937] transition"
                            >
                                {/* ID */}
                                <td className="px-6 py-4 whitespace-nowrap text-white">
                                    {request.id}
                                </td>

                                {/* Tenant */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-white font-medium">
                                            {request.tenantName}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            {request.tenantDomain}
                                        </div>
                                    </div>
                                </td>

                                {/* Transaction ID */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {request.transactionId || "N/A"}
                                </td>

                                {/* Document */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {request.documentPath ? (
                                        <a
                                            href={request.documentPath}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Document
                                        </a>
                                    ) : (
                                        <span className="text-gray-500">
                                            No document
                                        </span>
                                    )}
                                </td>

                                {/* Plan Name */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {request.planName}
                                </td>

                                {/* Plan Price */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    ${request.planPrice}
                                </td>

                                {/* Month */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {request.month}
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getStatusBadge(request.status)}
                                </td>

                                {/* Reviewed By */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {request.reviewedBy}
                                </td>

                                {/* Actions */}
                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <select
                                        value=""
                                        onChange={(e) => {
                                            const action = e.target.value;
                                            if (action === "approve") {
                                                handleStatusUpdate(
                                                    request.id,
                                                    "APPROVED"
                                                );
                                            } else if (action === "reject") {
                                                handleStatusUpdate(
                                                    request.id,
                                                    "REJECTED"
                                                );
                                            } else if (action === "delete") {
                                                handleDelete(request.id);
                                            } else if (action === "review") {
                                                handleStatusUpdate(
                                                    request.id,
                                                    "UNDER_REVIEW"
                                                );
                                            }
                                            e.target.value = "";
                                        }}
                                        disabled={actionLoading === request.id}
                                        className="bg-gray-800 border border-gray-600 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
                                    >
                                        <option
                                            value=""
                                            className="text-gray-400"
                                        >
                                            {actionLoading === request.id
                                                ? "Processing..."
                                                : "Choose Action"}
                                        </option>
                                        {request.status === "PENDING" && (
                                            <>
                                                <option value="approve">
                                                    Approve Request
                                                </option>
                                                <option value="reject">
                                                    Reject Request
                                                </option>
                                                <option value="review">
                                                    Mark Under Review
                                                </option>
                                            </>
                                        )}
                                        {request.status === "UNDER_REVIEW" && (
                                            <>
                                                <option value="approve">
                                                    Approve Request
                                                </option>
                                                <option value="reject">
                                                    Reject Request
                                                </option>
                                            </>
                                        )}
                                        {(request.status === "APPROVED" ||
                                            request.status === "REJECTED") && (
                                            <option value="review">
                                                Mark Under Review
                                            </option>
                                        )}
                                        <option value="delete">
                                            Delete Request
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* No data message */}
                {requests.length === 0 && !loading && (
                    <div className="p-6 text-center text-gray-400">
                        {searchTerm || statusFilter
                            ? "No subscription requests found matching your criteria."
                            : "No subscription requests found."}
                    </div>
                )}

                {loading && requests.length > 0 && (
                    <div className="p-6 text-center text-gray-400">
                        Loading...
                    </div>
                )}
            </div>
        </div>
    );
}
