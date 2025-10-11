"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Edit2, Trash2, Plus, Save, Search, X, Loader2 } from "lucide-react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";

interface AllFeaturesFormData {
    tagline: string;
    title: string;
    showOnLanding: boolean;
}

interface FeatureElement {
    id: number;
    uuid: string;
    title: string;
    image: string;
    status: "ACTIVE" | "INACTIVE";
    order_index: number;
    created_at: string;
    updated_at: string;
}

interface AllFeaturesSection {
    id: number;
    content: AllFeaturesFormData;
    show_on_landing: boolean;
    status: string;
}

interface ElementFormData {
    title: string;
    image: string;
    status: "ACTIVE" | "INACTIVE";
}

export default function AllFeatures() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Main section form data
    const [formData, setFormData] = useState<AllFeaturesFormData>({
        tagline: "Core Modules",
        title: "Core Modules For Your Business",
        showOnLanding: true,
    });

    // Elements data
    const [features, setFeatures] = useState<FeatureElement[]>([]);
    const [elementsLoading, setElementsLoading] = useState(false);

    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingElement, setEditingElement] = useState<FeatureElement | null>(
        null
    );
    const [elementSaving, setElementSaving] = useState(false);

    // Element form data
    const [elementFormData, setElementFormData] = useState<ElementFormData>({
        title: "",
        image: "",
        status: "ACTIVE",
    });

    // Fetch all features section data and elements
    useEffect(() => {
        const fetchAllFeaturesData = async () => {
            try {
                setLoading(true);

                // Fetch main section content
                const sectionResponse = await fetch(
                    "/api/website-sections/all_features"
                );
                if (!sectionResponse.ok) {
                    throw new Error("Failed to fetch all features section");
                }

                const sectionData = await sectionResponse.json();

                if (sectionData.section && sectionData.section.content) {
                    setFormData({
                        tagline:
                            sectionData.section.content.tagline ||
                            "Core Modules",
                        title:
                            sectionData.section.content.title ||
                            "Core Modules For Your Business",
                        showOnLanding:
                            sectionData.section.show_on_landing ?? true,
                    });
                }

                // Fetch elements
                await fetchElements();
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load all features section"
                );
                console.error("Error fetching all features section:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllFeaturesData();
    }, []);

    // Fetch elements separately
    const fetchElements = async () => {
        try {
            setElementsLoading(true);
            const response = await fetch(
                "/api/website-sections/all_features/elements"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch elements");
            }

            const elementsData = await response.json();
            setFeatures(elementsData);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to load elements"
            );
        } finally {
            setElementsLoading(false);
        }
    };

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleElementFormChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setElementFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleToggleChange = () => {
        setFormData((prev) => ({
            ...prev,
            showOnLanding: !prev.showOnLanding,
        }));
    };

    const handleSectionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch("/api/website-sections/all_features", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: formData,
                    showOnLanding: formData.showOnLanding,
                    status: "ACTIVE",
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || "Failed to update all features section"
                );
            }

            setSuccess("All Features section updated successfully!");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update all features section"
            );
        } finally {
            setSaving(false);
        }
    };

    // Element CRUD Operations
    const handleCreateElement = () => {
        setElementFormData({
            title: "",
            image: "",
            status: "ACTIVE",
        });
        setIsCreateModalOpen(true);
    };

    const handleEditElement = (element: FeatureElement) => {
        setEditingElement(element);
        setElementFormData({
            title: element.title,
            image: element.image,
            status: element.status,
        });
        setIsEditModalOpen(true);
    };

    const handleSubmitElement = async (e: React.FormEvent) => {
        e.preventDefault();
        setElementSaving(true);
        setError("");

        try {
            let response;
            if (isCreateModalOpen) {
                // Create new element
                response = await fetch(
                    "/api/website-sections/all_features/elements",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(elementFormData),
                    }
                );
            } else {
                // Update existing element
                response = await fetch(
                    `/api/website-sections/all_features/elements/${editingElement?.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(elementFormData),
                    }
                );
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || "Failed to save feature element"
                );
            }

            // Refresh elements list
            await fetchElements();

            // Close modal and show success
            setIsCreateModalOpen(false);
            setIsEditModalOpen(false);
            setEditingElement(null);
            setSuccess(
                isCreateModalOpen
                    ? "Feature element created successfully!"
                    : "Feature element updated successfully!"
            );
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to save feature element"
            );
        } finally {
            setElementSaving(false);
        }
    };

    const handleDeleteElement = async (elementId: number) => {
        if (!confirm("Are you sure you want to delete this feature element?")) {
            return;
        }

        try {
            const response = await fetch(
                `/api/website-sections/all_features/elements/${elementId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete element");
            }

            // Refresh elements list
            await fetchElements();
            setSuccess("Feature element deleted successfully!");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to delete element"
            );
        }
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        setEditingElement(null);
        setElementFormData({
            title: "",
            image: "",
            status: "ACTIVE",
        });
    };

    const filteredFeatures = features.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
                <SettingsSidebar />
                <div className="bg-[#111827] flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 rounded-xl shadow-lg border border-white/10 p-6 flex items-center justify-center">
                    <div className="flex items-center gap-3 text-white">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Loading all features settings...
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
            <div className="flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 space-y-8">
                {/* Success Message */}
                {success && (
                    <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg">
                        <p className="text-green-400 text-sm">{success}</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {/* Top Section */}
                <div className="bg-[#111827] p-6 rounded-xl shadow-lg border border-white/10">
                    <h2 className="text-xl font-semibold text-white mb-6">
                        All Features
                    </h2>

                    <form onSubmit={handleSectionSubmit} className="space-y-6">
                        {/* Tagline */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                All Features Section Tagline{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="tagline"
                                value={formData.tagline}
                                onChange={handleFormChange}
                                required
                                className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                All Features Section Title{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleFormChange}
                                required
                                className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Toggle + Save */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                            <div className="flex items-center space-x-3">
                                <button
                                    type="button"
                                    onClick={handleToggleChange}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        formData.showOnLanding
                                            ? "bg-green-500"
                                            : "bg-gray-600"
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            formData.showOnLanding
                                                ? "translate-x-6"
                                                : "translate-x-1"
                                        }`}
                                    />
                                </button>
                                <span className="text-sm text-gray-300">
                                    Show at landing page
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Features Table */}
                <div className="bg-[#111827] p-6 rounded-xl shadow-lg border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">
                            All Feature Elements
                        </h3>
                        <button
                            onClick={handleCreateElement}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Create
                        </button>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search features..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
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
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {elementsLoading ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-8 text-center"
                                        >
                                            <div className="flex items-center justify-center gap-2 text-gray-400">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Loading features...
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredFeatures.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-8 text-center text-gray-400"
                                        >
                                            {searchQuery
                                                ? "No features found matching your search."
                                                : "No features found."}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredFeatures.map((feature, index) => (
                                        <tr
                                            key={feature.id}
                                            className="border-t border-gray-700 hover:bg-[#1F2937] transition-colors"
                                        >
                                            <td className="px-6 py-4 text-gray-300">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {feature.image ? (
                                                    <img
                                                        src={feature.image}
                                                        alt={feature.title}
                                                        className="w-10 h-10 rounded-lg object-contain"
                                                    />
                                                ) : (
                                                    <img
                                                        src={
                                                            "/site/no-image.png"
                                                        }
                                                        alt={"No Image"}
                                                        className="w-10 h-10 rounded-lg object-contain"
                                                    />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-300 font-medium">
                                                {feature.title}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        feature.status ===
                                                        "ACTIVE"
                                                            ? "bg-green-600/20 text-green-400 border border-green-500/30"
                                                            : "bg-gray-600/20 text-gray-400 border border-gray-500/30"
                                                    }`}
                                                >
                                                    {feature.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEditElement(
                                                                feature
                                                            )
                                                        }
                                                        className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4 text-white" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteElement(
                                                                feature.id
                                                            )
                                                        }
                                                        className="p-2 bg-red-600 rounded-lg hover:bg-red-500 transition-colors"
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

                    {/* Pagination - You can implement real pagination later */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700">
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
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 bg-[#1F2937] border border-gray-700 rounded hover:bg-gray-600 transition-colors text-gray-300">
                                1
                            </button>
                            <button className="px-3 py-1 bg-[#1F2937] border border-gray-700 rounded hover:bg-gray-600 transition-colors text-gray-300">
                                2
                            </button>
                            <button className="px-3 py-1 bg-[#1F2937] border border-gray-700 rounded hover:bg-gray-600 transition-colors text-gray-300">
                                3
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Element Modal */}
            {(isCreateModalOpen || isEditModalOpen) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-[#111827] p-6 rounded-xl w-full max-w-md shadow-xl border border-white/10">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-white">
                                {isCreateModalOpen ? "Create" : "Edit"} Feature
                                Element
                            </h3>
                            <button
                                onClick={closeModals}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmitElement}
                            className="space-y-4"
                        >
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Title{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={elementFormData.title}
                                    onChange={handleElementFormChange}
                                    required
                                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter feature title"
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    value={elementFormData.image}
                                    onChange={handleElementFormChange}
                                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter image URL (optional)"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={elementFormData.status}
                                    onChange={handleElementFormChange}
                                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                </select>
                            </div>

                            {/* Modal Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                                <button
                                    type="button"
                                    onClick={closeModals}
                                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
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
                                            {isCreateModalOpen
                                                ? "Create"
                                                : "Save"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
