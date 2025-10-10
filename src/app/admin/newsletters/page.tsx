"use client";

import { useState, useEffect } from "react";
import {
    SearchIcon,
    RefreshCw,
    Printer,
    MailPlus,
    Trash2,
    ToggleLeft,
    ToggleRight,
} from "lucide-react";

interface Subscriber {
    id: number;
    uuid: string;
    email: string;
    isActive: boolean;
    subscribedAt: string;
    source: string;
    createdAt: string;
    updatedAt: string;
}

interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export default function SubscribersTable() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState<number | null>(null);
    const [pagination, setPagination] = useState<PaginationInfo>({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNext: false,
        hasPrev: false,
    });
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const fetchSubscribers = async (
        search = "",
        page = 1,
        limit = itemsPerPage
    ) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            params.append("page", page.toString());
            params.append("limit", limit.toString());

            const url = `/api/newsletter-subscribers?${params.toString()}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch subscribers");
            }

            const data = await response.json();
            setSubscribers(data.subscribers);
            setPagination(data.pagination);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error fetching subscribers:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchSubscribers(searchTerm, 1, itemsPerPage);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, itemsPerPage]);

    const handleStatusToggle = async (id: number, currentStatus: boolean) => {
        try {
            setActionLoading(id);
            const response = await fetch(`/api/newsletter-subscribers/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isActive: !currentStatus }),
            });

            if (!response.ok) {
                throw new Error("Failed to update subscriber status");
            }

            // Refresh the list
            fetchSubscribers(searchTerm, pagination.currentPage, itemsPerPage);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update subscriber status"
            );
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (id: number) => {
        if (
            !confirm(
                "Are you sure you want to delete this subscriber? This action cannot be undone."
            )
        ) {
            return;
        }

        try {
            setActionLoading(id);
            const response = await fetch(`/api/newsletter-subscribers/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete subscriber");
            }

            // Refresh the list
            fetchSubscribers(searchTerm, pagination.currentPage, itemsPerPage);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to delete subscriber"
            );
        } finally {
            setActionLoading(null);
        }
    };

    const handleRefresh = () => {
        fetchSubscribers(searchTerm, pagination.currentPage, itemsPerPage);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handlePageChange = (newPage: number) => {
        fetchSubscribers(searchTerm, newPage, itemsPerPage);
    };

    if (loading && subscribers.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex justify-center items-center py-12">
                    <div className="text-white">Loading subscribers...</div>
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
                        Subscribers
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Manage your email subscribers list and send campaigns.
                        {pagination.totalCount > 0 &&
                            ` (${pagination.totalCount} subscribers)`}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 disabled:opacity-50"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500">
                        <Printer className="w-4 h-4" />
                    </button>
                    <a href="/admin/newsletters/create">
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                            <MailPlus className="w-4 h-4" />
                            Send Mail
                        </button>
                    </a>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}

            {/* Search Bar */}
            <div className="relative w-full md:w-1/3">
                <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Search subscribers by email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
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
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Source
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Subscribed At
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {subscribers.map((sub, index) => (
                            <tr
                                key={sub.id}
                                className="hover:bg-[#1F2937] transition"
                            >
                                <td className="px-6 py-4 text-white">
                                    {(pagination.currentPage - 1) *
                                        itemsPerPage +
                                        index +
                                        1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <a
                                        href={`mailto:${sub.email}`}
                                        className="text-indigo-400 hover:underline"
                                    >
                                        {sub.email}
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() =>
                                            handleStatusToggle(
                                                sub.id,
                                                sub.isActive
                                            )
                                        }
                                        disabled={actionLoading === sub.id}
                                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                                            sub.isActive
                                                ? "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                                                : "bg-gray-600/20 text-gray-400 hover:bg-gray-600/30"
                                        } disabled:opacity-50`}
                                    >
                                        {sub.isActive ? (
                                            <ToggleRight className="w-4 h-4" />
                                        ) : (
                                            <ToggleLeft className="w-4 h-4" />
                                        )}
                                        {sub.isActive ? "Active" : "Inactive"}
                                    </button>
                                </td>
                                <td className="px-6 py-4 text-gray-300 capitalize">
                                    {sub.source.replace("_", " ").toLowerCase()}
                                </td>
                                <td className="px-6 py-4 text-gray-300">
                                    {formatDate(sub.subscribedAt)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <button
                                        onClick={() => handleDelete(sub.id)}
                                        disabled={actionLoading === sub.id}
                                        className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg disabled:opacity-50"
                                        title="Delete Subscriber"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {subscribers.length === 0 && !loading && (
                    <div className="p-6 text-center text-gray-400">
                        {searchTerm
                            ? "No subscribers found matching your criteria."
                            : "No subscribers found."}
                    </div>
                )}

                {loading && subscribers.length > 0 && (
                    <div className="p-6 text-center text-gray-400">
                        Loading...
                    </div>
                )}
            </div>

            {/* Pagination & Per Page Control */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                {/* Per Page Control */}
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-300">Per Page</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) =>
                            setItemsPerPage(Number(e.target.value))
                        }
                        className="border border-gray-600 rounded px-2 py-1 text-sm bg-[#1F2937] text-gray-200"
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() =>
                                handlePageChange(pagination.currentPage - 1)
                            }
                            disabled={!pagination.hasPrev}
                            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>

                        <span className="text-gray-300 text-sm">
                            Page {pagination.currentPage} of{" "}
                            {pagination.totalPages}
                        </span>

                        <button
                            onClick={() =>
                                handlePageChange(pagination.currentPage + 1)
                            }
                            disabled={!pagination.hasNext}
                            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
