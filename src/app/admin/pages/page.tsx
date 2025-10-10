"use client";

import { useState, useEffect } from "react";
import { Plus, SearchIcon, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Page {
    id: number;
    uuid: string;
    title: string;
    name: string;
    slug: string;
    type: "INFORMATION" | "NEED_HELP" | "LEGAL" | "CUSTOM";
    status: "DRAFT" | "ACTIVE" | "INACTIVE" | "ARCHIVED";
    author: string;
    publishedAt: string | null;
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

export default function PagesTable() {
    const router = useRouter();
    const [pages, setPages] = useState<Page[]>([]);
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

    const fetchPages = async (search = "", page = 1, limit = itemsPerPage) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            params.append("page", page.toString());
            params.append("limit", limit.toString());

            const url = `/api/pages?${params.toString()}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch pages");
            }

            const data = await response.json();
            setPages(data.pages);
            setPagination(data.pagination);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error fetching pages:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchPages(searchTerm, 1, itemsPerPage);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, itemsPerPage]);

    const handleStatusUpdate = async (
        id: number,
        newStatus: Page["status"]
    ) => {
        try {
            setActionLoading(id);
            const response = await fetch(`/api/pages/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error("Failed to update page status");
            }

            fetchPages(searchTerm, pagination.currentPage, itemsPerPage);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update page status"
            );
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (id: number) => {
        if (
            !confirm(
                "Are you sure you want to delete this page? This action cannot be undone."
            )
        ) {
            return;
        }

        try {
            setActionLoading(id);
            const response = await fetch(`/api/pages/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete page");
            }

            fetchPages(searchTerm, pagination.currentPage, itemsPerPage);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to delete page"
            );
        } finally {
            setActionLoading(null);
        }
    };

    const handleCreate = () => {
        router.push("/admin/pages/create");
    };

    const handleEdit = (id: number) => {
        router.push(`/admin/pages/edit/${id}`);
    };

    const getStatusBadge = (status: Page["status"]) => {
        const statusConfig = {
            ACTIVE: {
                color: "bg-purple-600/20 text-purple-400",
                label: "Active",
            },
            DRAFT: {
                color: "bg-yellow-600/20 text-yellow-400",
                label: "Draft",
            },
            INACTIVE: {
                color: "bg-gray-600/20 text-gray-400",
                label: "Inactive",
            },
            ARCHIVED: {
                color: "bg-red-600/20 text-red-400",
                label: "Archived",
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

    const getTypeLabel = (type: Page["type"]) => {
        const typeLabels = {
            INFORMATION: "Information",
            NEED_HELP: "Need Help",
            LEGAL: "Legal",
            CUSTOM: "Custom",
        };
        return typeLabels[type];
    };

    const handlePageChange = (newPage: number) => {
        fetchPages(searchTerm, newPage, itemsPerPage);
    };

    if (loading && pages.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex justify-center items-center py-12">
                    <div className="text-white">Loading pages...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white">Pages</h1>
                    <p className="text-gray-400 text-sm">
                        Manage all static pages for your application.
                        {pagination.totalCount > 0 &&
                            ` (${pagination.totalCount} pages)`}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        <Plus className="w-4 h-4" />
                        Create
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
                    <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search by page name, slug or type"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                                #
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Pages
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Slug
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {pages.map((page, index) => (
                            <tr
                                key={page.id}
                                className="hover:bg-[#1F2937] transition"
                            >
                                {/* Index */}
                                <td className="px-6 py-4 text-white">
                                    {(pagination.currentPage - 1) *
                                        itemsPerPage +
                                        index +
                                        1}
                                </td>

                                {/* Page Name */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-white font-medium">
                                        {page.title}
                                    </div>
                                    <div className="text-gray-400 text-sm">
                                        Created by: {page.author}
                                    </div>
                                </td>

                                {/* Slug */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    /{page.slug}
                                </td>

                                {/* Type */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {getTypeLabel(page.type)}
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4 text-center">
                                    <select
                                        value={page.status}
                                        onChange={(e) =>
                                            handleStatusUpdate(
                                                page.id,
                                                e.target.value as Page["status"]
                                            )
                                        }
                                        disabled={actionLoading === page.id}
                                        className="bg-[#1F2937] border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        <option value="DRAFT">Draft</option>
                                        <option value="ACTIVE">Active</option>
                                        <option value="INACTIVE">
                                            Inactive
                                        </option>
                                        <option value="ARCHIVED">
                                            Archived
                                        </option>
                                    </select>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                                    <button
                                        onClick={() => handleEdit(page.id)}
                                        className="text-indigo-400 hover:text-indigo-300 font-medium"
                                    >
                                        <Edit className="w-4 h-4 inline mr-1" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(page.id)}
                                        disabled={actionLoading === page.id}
                                        className="text-red-400 hover:text-red-300 font-medium disabled:opacity-50"
                                    >
                                        <Trash2 className="w-4 h-4 inline mr-1" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {pages.length === 0 && !loading && (
                    <div className="p-6 text-center text-gray-400">
                        {searchTerm
                            ? "No pages found matching your criteria."
                            : "No pages found."}
                    </div>
                )}

                {loading && pages.length > 0 && (
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
