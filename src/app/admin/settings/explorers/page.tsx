"use client";

import { useState, useEffect, ChangeEvent } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { Plus, Edit2, Trash2, X, Search, Save, Loader2 } from "lucide-react";

interface ExplorerItem {
    id: number;
    uuid: string;
    title: string;
    description: string;
    image: string;
    status: "ACTIVE" | "INACTIVE";
    order_index: number;
    created_at: string;
    updated_at: string;
}

interface FormData {
    title: string;
    description: string;
    image: string;
    status: "ACTIVE" | "INACTIVE";
}

interface ExplorerSection {
    id: number;
    show_on_landing: boolean;
    status: string;
}

export default function ExplorerElements() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const [explorers, setExplorers] = useState<ExplorerItem[]>([]);
    const [showOnLanding, setShowOnLanding] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ExplorerItem | null>(null);
    const [elementSaving, setElementSaving] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        image: "",
        status: "ACTIVE",
    });

    // Fetch explorers data
    useEffect(() => {
        const fetchExplorersData = async () => {
            try {
                setLoading(true);

                // Fetch section data for toggle
                const sectionResponse = await fetch(
                    "/api/website-sections/explorers"
                );
                if (sectionResponse.ok) {
                    const sectionData = await sectionResponse.json();
                    if (sectionData.section) {
                        setShowOnLanding(
                            sectionData.section.show_on_landing ?? true
                        );
                    }
                }

                // Fetch elements
                await fetchElements();
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load explorers"
                );
                console.error("Error fetching explorers:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchExplorersData();
    }, []);

    // Fetch elements separately
    const fetchElements = async () => {
        try {
            const response = await fetch(
                "/api/website-sections/explorers/elements"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch elements");
            }

            const elementsData = await response.json();
            setExplorers(elementsData);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to load elements"
            );
        }
    };

    // Generic form handler
    const handleInputChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Open Add Modal
    const handleAdd = () => {
        setFormData({
            title: "",
            description: "",
            image: "",
            status: "ACTIVE",
        });
        setEditingItem(null);
        setIsModalOpen(true);
    };

    // Open Edit Modal
    const handleEdit = (item: ExplorerItem) => {
        setFormData({
            title: item.title,
            description: item.description,
            image: item.image,
            status: item.status,
        });
        setEditingItem(item);
        setIsModalOpen(true);
    };

    // Save Data
    const handleSave = async () => {
        if (!formData.title.trim()) {
            setError("Title is required!");
            return;
        }

        setElementSaving(true);
        setError("");

        try {
            let response;
            if (editingItem) {
                // Update existing item
                response = await fetch(
                    `/api/website-sections/explorers/elements/${editingItem.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    }
                );
            } else {
                // Add new item
                response = await fetch(
                    "/api/website-sections/explorers/elements",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    }
                );
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || "Failed to save explorer item"
                );
            }

            // Refresh elements list
            await fetchElements();
            setIsModalOpen(false);
            setSuccess(
                editingItem
                    ? "Explorer item updated successfully!"
                    : "Explorer item created successfully!"
            );
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to save explorer item"
            );
        } finally {
            setElementSaving(false);
        }
    };

    // Delete Data
    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this explorer item?")) {
            return;
        }

        try {
            const response = await fetch(
                `/api/website-sections/explorers/elements/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete explorer item");
            }

            // Refresh elements list
            await fetchElements();
            setSuccess("Explorer item deleted successfully!");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to delete explorer item"
            );
        }
    };

    // Toggle show on landing
    const handleToggleChange = async () => {
        const newShowOnLanding = !showOnLanding;
        setShowOnLanding(newShowOnLanding);

        try {
            const response = await fetch("/api/website-sections/explorers", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: {},
                    showOnLanding: newShowOnLanding,
                    status: "ACTIVE",
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update section visibility");
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update visibility"
            );
            // Revert on error
            setShowOnLanding(!newShowOnLanding);
        }
    };

    const filteredExplorers = explorers.filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
                <SettingsSidebar />
                <div className="bg-[#111827] flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 rounded-xl shadow-lg border border-white/10 p-6 flex items-center justify-center">
                    <div className="flex items-center gap-3 text-white">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Loading explorers...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <SettingsSidebar />

            {/* Main Content */}
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6">
                {/* Success Message */}
                {success && (
                    <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg mb-6">
                        <p className="text-green-400 text-sm">{success}</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg mb-6">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                <div className="max-w-6xl mx-auto bg-[#111827] rounded-xl shadow-md border border-white/10">
                    <div className="flex items-start justify-between p-6 pb-0">
                        <h2 className="text-xl font-semibold text-white">
                            Explorer Elements
                        </h2>
                        <div className="flex justify-end">
                            {/* Search Bar */}
                            <div className="relative mb-4 w-full mr-2">
                                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Search explorers..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <button
                                onClick={handleAdd}
                                className="flex items-center mb-auto gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                            >
                                <Plus className="w-4 h-4" /> Create
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-t border-gray-700">
                            <thead className="bg-[#1F2937]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Image
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExplorers.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-8 text-center text-gray-400"
                                        >
                                            {searchTerm
                                                ? "No explorers found matching your search."
                                                : "No explorers found."}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredExplorers.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="border-t border-gray-700 hover:bg-[#1F2937] transition-colors"
                                        >
                                            <td className="px-6 py-4 text-gray-300">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-10 h-10 rounded-lg object-cover border border-gray-600"
                                                    />
                                                ) : (
                                                    <img
                                                        src={
                                                            "/site/no-image.png"
                                                        }
                                                        alt={"No Image"}
                                                        className="w-10 h-10 rounded-lg object-cover border border-gray-600"
                                                    />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-300 font-medium">
                                                {item.title}
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 max-w-md">
                                                {item.description}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        item.status === "ACTIVE"
                                                            ? "bg-green-600/20 text-green-400 border border-green-500/30"
                                                            : "bg-gray-600/20 text-gray-400 border border-gray-500/30"
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(item)
                                                        }
                                                        className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4 text-white" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                        className="p-2 rounded-lg bg-red-600 hover:bg-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-white" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Per Page + Toggle */}
                    <div className="flex items-center justify-between p-6 border-t border-gray-700">
                        <div className="flex items-center space-x-2">
                            <label className="text-sm text-gray-300">
                                Per Page
                            </label>
                            <select className="rounded-lg bg-[#1F2937] border border-gray-700 text-gray-300 text-sm p-1">
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                            </select>
                        </div>

                        {/* Toggle */}
                        <div className="flex items-center space-x-3">
                            <button
                                type="button"
                                onClick={handleToggleChange}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    showOnLanding
                                        ? "bg-green-500"
                                        : "bg-gray-600"
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        showOnLanding
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                    }`}
                                />
                            </button>
                            <span className="text-gray-300 text-sm">
                                Show at landing page
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-[#111827] p-6 rounded-xl w-full max-w-md shadow-xl border border-white/10">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-white">
                                {editingItem
                                    ? "Edit Explorer Item"
                                    : "Add Explorer Item"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Title{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter title"
                                    required
                                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter description"
                                    rows={3}
                                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/image.png"
                                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-700">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={elementSaving}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {elementSaving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        {editingItem
                                            ? "Save Changes"
                                            : "Add Item"}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
