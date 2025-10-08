"use client";

import { useState, useEffect } from "react";
import { CalendarIcon, SearchIcon, FileDown, FileText } from "lucide-react";

// Define the status types based on your Prisma schema
type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "CANCELLED";

interface Payment {
    id: number;
    uuid: string;
    tenantDomain: string;
    tenantName: string;
    planName: string;
    planAmount: number;
    month: string;
    transactionType: string;
    trxId: string;
    amount: number;
    paymentStatus: PaymentStatus;
    createdAt: string;
    updatedAt: string;
}

export default function PaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<PaymentStatus | "">("");
    const [dateFilter, setDateFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState<number | null>(null);

    const fetchPayments = async (search = "", status = "", date = "") => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            if (status) params.append("status", status);
            if (date) params.append("date", date);

            const url = `/api/payments?${params.toString()}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch payments");
            }

            const data = await response.json();
            setPayments(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error fetching payments:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchPayments(searchTerm, statusFilter, dateFilter);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, statusFilter, dateFilter]);

    const handleStatusUpdate = async (
        id: number,
        paymentStatus: PaymentStatus
    ) => {
        try {
            setActionLoading(id);
            const response = await fetch(`/api/payments/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ paymentStatus }),
            });

            if (!response.ok) {
                throw new Error("Failed to update payment status");
            }

            // Refresh the list
            fetchPayments(searchTerm, statusFilter, dateFilter);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update payment status"
            );
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (id: number) => {
        if (
            !confirm(
                "Are you sure you want to delete this payment record? This action cannot be undone."
            )
        ) {
            return;
        }

        try {
            setActionLoading(id);
            const response = await fetch(`/api/payments/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete payment");
            }

            // Refresh the list
            fetchPayments(searchTerm, statusFilter, dateFilter);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to delete payment"
            );
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusBadge = (status: PaymentStatus) => {
        const statusConfig = {
            PAID: {
                color: "bg-green-600/20 text-green-400",
                label: "Paid",
            },
            PENDING: {
                color: "bg-yellow-600/20 text-yellow-400",
                label: "Pending",
            },
            FAILED: { color: "bg-red-600/20 text-red-400", label: "Failed" },
            REFUNDED: {
                color: "bg-blue-600/20 text-blue-400",
                label: "Refunded",
            },
            CANCELLED: {
                color: "bg-gray-600/20 text-gray-400",
                label: "Cancelled",
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

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const handleExport = (type: "pdf" | "csv") => {
        // Implement export functionality here
        console.log(`Exporting ${type}`);
        alert(`Export ${type} functionality would be implemented here`);
    };

    if (loading && payments.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex justify-center items-center py-12">
                    <div className="text-white">Loading payments...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        Payments
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Manage all payment transactions and statuses.
                        {payments.length > 0 &&
                            ` (${payments.length} payments)`}
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
                        placeholder="Search by plan, transaction type, or ID"
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
                                e.target.value as PaymentStatus | ""
                            )
                        }
                        className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    >
                        <option value="">All Status</option>
                        <option value="PAID">Paid</option>
                        <option value="PENDING">Pending</option>
                        <option value="FAILED">Failed</option>
                        <option value="REFUNDED">Refunded</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>

                {/* Date Filter */}
                <div className="relative w-full md:w-1/4">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
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
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Tenant & Plan
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Month
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Transaction
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Payment Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Created At
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {payments.map((payment) => (
                            <tr
                                key={payment.id}
                                className="hover:bg-[#1F2937] transition"
                            >
                                {/* ID */}
                                <td className="px-6 py-4 whitespace-nowrap text-white">
                                    {payment.id}
                                </td>

                                {/* Tenant & Plan */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-white font-medium">
                                            {payment.tenantName}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            {payment.tenantDomain}
                                        </div>
                                        <div className="text-gray-300 text-sm mt-1">
                                            {payment.planName}
                                        </div>
                                    </div>
                                </td>

                                {/* Month */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {payment.month}
                                </td>

                                {/* Transaction */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-white font-medium">
                                            {payment.trxId}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            {payment.transactionType}
                                        </div>
                                    </div>
                                </td>

                                {/* Amount */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-white font-semibold">
                                        {formatCurrency(payment.amount)}
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        Plan:{" "}
                                        {formatCurrency(payment.planAmount)}
                                    </div>
                                </td>

                                {/* Payment Status */}
                                <td className="px-6 py-4 text-center">
                                    {getStatusBadge(payment.paymentStatus)}
                                </td>

                                {/* Created At */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                                    {formatDate(payment.createdAt)}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <select
                                        value=""
                                        onChange={(e) => {
                                            const action = e.target.value;
                                            if (action === "mark_paid") {
                                                handleStatusUpdate(
                                                    payment.id,
                                                    "PAID"
                                                );
                                            } else if (
                                                action === "mark_pending"
                                            ) {
                                                handleStatusUpdate(
                                                    payment.id,
                                                    "PENDING"
                                                );
                                            } else if (
                                                action === "mark_failed"
                                            ) {
                                                handleStatusUpdate(
                                                    payment.id,
                                                    "FAILED"
                                                );
                                            } else if (
                                                action === "mark_refunded"
                                            ) {
                                                handleStatusUpdate(
                                                    payment.id,
                                                    "REFUNDED"
                                                );
                                            } else if (
                                                action === "mark_cancelled"
                                            ) {
                                                handleStatusUpdate(
                                                    payment.id,
                                                    "CANCELLED"
                                                );
                                            } else if (action === "delete") {
                                                handleDelete(payment.id);
                                            }
                                            e.target.value = "";
                                        }}
                                        disabled={actionLoading === payment.id}
                                        className="bg-gray-800 border border-gray-600 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
                                    >
                                        <option
                                            value=""
                                            className="text-gray-400"
                                        >
                                            {actionLoading === payment.id
                                                ? "Processing..."
                                                : "Actions"}
                                        </option>
                                        {payment.paymentStatus !== "PAID" && (
                                            <option value="mark_paid">
                                                Mark as Paid
                                            </option>
                                        )}
                                        {payment.paymentStatus !==
                                            "PENDING" && (
                                            <option value="mark_pending">
                                                Mark as Pending
                                            </option>
                                        )}
                                        {payment.paymentStatus !== "FAILED" && (
                                            <option value="mark_failed">
                                                Mark as Failed
                                            </option>
                                        )}
                                        {payment.paymentStatus !==
                                            "REFUNDED" && (
                                            <option value="mark_refunded">
                                                Mark as Refunded
                                            </option>
                                        )}
                                        {payment.paymentStatus !==
                                            "CANCELLED" && (
                                            <option value="mark_cancelled">
                                                Mark as Cancelled
                                            </option>
                                        )}
                                        <option value="delete">
                                            Delete Payment
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* No data message */}
                {payments.length === 0 && !loading && (
                    <div className="p-6 text-center text-gray-400">
                        {searchTerm || statusFilter || dateFilter
                            ? "No payments found matching your criteria."
                            : "No payments found."}
                    </div>
                )}

                {loading && payments.length > 0 && (
                    <div className="p-6 text-center text-gray-400">
                        Loading...
                    </div>
                )}
            </div>
        </div>
    );
}
