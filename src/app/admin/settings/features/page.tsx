"use client";

import { useState, useEffect } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { Pencil, Trash2, Plus, Search, Save, Loader2, X } from "lucide-react";

interface FeaturesFormData {
    tagline: string;
    title: string;
    description: string;
    showOnLanding: boolean;
}

interface FeatureElement {
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

interface FeaturesSection {
    id: number;
    content: FeaturesFormData;
    show_on_landing: boolean;
    status: string;
}

interface ElementFormData {
    title: string;
    description: string;
    image: string;
    status: "ACTIVE" | "INACTIVE";
}

export default function FeatureSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Main section form data
    const [formData, setFormData] = useState<FeaturesFormData>({
        tagline: "",
        title: "",
        description: "",
        showOnLanding: true,
    });

    // Elements data
    const [elements, setElements] = useState<FeatureElement[]>([]);
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
        description: "",
        image: "",
        status: "ACTIVE",
    });

    // Fetch features section data and elements
    useEffect(() => {
        const fetchFeaturesData = async () => {
            try {
                setLoading(true);

                // Fetch main section content
                const sectionResponse = await fetch(
                    "/api/website-sections/features"
                );
                if (!sectionResponse.ok) {
                    throw new Error("Failed to fetch features section");
                }

                const sectionData = await sectionResponse.json();

                if (sectionData.section && sectionData.section.content) {
                    setFormData({
                        tagline: sectionData.section.content.tagline || "",
                        title: sectionData.section.content.title || "",
                        description:
                            sectionData.section.content.description || "",
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
                        : "Failed to load features section"
                );
                console.error("Error fetching features section:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturesData();
    }, []);

    // Fetch elements separately
    const fetchElements = async () => {
        try {
            setElementsLoading(true);
            const response = await fetch(
                "/api/website-sections/features/elements"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch elements");
            }

            const elementsData = await response.json();
            setElements(elementsData);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to load elements"
            );
        } finally {
            setElementsLoading(false);
        }
    };

    const handleFormChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleElementFormChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
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
            const response = await fetch("/api/website-sections/features", {
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
                    errorData.error || "Failed to update features section"
                );
            }

            setSuccess("Features section updated successfully!");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update features section"
            );
        } finally {
            setSaving(false);
        }
    };

    // Element CRUD Operations
    const handleCreateElement = () => {
        setElementFormData({
            title: "",
            description: "",
            image: "",
            status: "ACTIVE",
        });
        setIsCreateModalOpen(true);
    };

    const handleEditElement = (element: FeatureElement) => {
        setEditingElement(element);
        setElementFormData({
            title: element.title,
            description: element.description,
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
                    "/api/website-sections/features/elements",
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
                    `/api/website-sections/features/elements/${editingElement?.id}`,
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
                throw new Error(errorData.error || "Failed to save element");
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
                err instanceof Error ? err.message : "Failed to save element"
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
                `/api/website-sections/features/elements/${elementId}`,
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
            description: "",
            image: "",
            status: "ACTIVE",
        });
    };

    const filteredElements = elements.filter((el) =>
        el.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
                <SettingsSidebar />
                <div className="bg-[#111827] flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 rounded-xl shadow-lg border border-white/10 p-6 flex items-center justify-center">
                    <div className="flex items-center gap-3 text-white">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Loading features settings...
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

                {/* Form Section */}
                <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">
                        Features
                    </h2>

                    <form onSubmit={handleSectionSubmit} className="space-y-6">
                        {/* Tagline */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Features Tagline{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="tagline"
                                placeholder="Powerful Features"
                                value={formData.tagline}
                                onChange={handleFormChange}
                                required
                                className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Features Title{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Everything You Need to Succeed"
                                value={formData.title}
                                onChange={handleFormChange}
                                required
                                className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Features Description{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                placeholder="Describe the powerful features of your platform..."
                                value={formData.description}
                                onChange={handleFormChange}
                                rows={3}
                                required
                                className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Toggle */}
                        <div className="flex items-center">
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
                            <span className="ml-3 text-sm text-gray-300">
                                Show at landing page
                            </span>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end pt-4 border-t border-gray-700">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
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

                {/* Table Section */}
                <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">
                            Feature Elements
                        </h3>
                        <button
                            onClick={handleCreateElement}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-500 transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Create
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-6 w-full sm:w-1/3">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search features..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
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
                            <tbody className="divide-y divide-gray-700">
                                {elementsLoading ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-8 text-center"
                                        >
                                            <div className="flex items-center justify-center gap-2 text-gray-400">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Loading features...
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredElements.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-8 text-center text-gray-400"
                                        >
                                            {searchTerm
                                                ? "No features found matching your search."
                                                : "No features found."}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredElements.map((element, index) => (
                                        <tr
                                            key={element.id}
                                            className="hover:bg-[#1F2937] transition-colors"
                                        >
                                            <td className="px-6 py-4 text-gray-300">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {element.image ? (
                                                    <img
                                                        src={element.image}
                                                        alt={element.title}
                                                        className="w-10 h-10 object-contain rounded"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 bg-gray-600 rounded flex items-center justify-center">
                                                        <span className="text-xs text-gray-400">
                                                            No Image
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-300 font-medium">
                                                {element.title}
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 max-w-md truncate">
                                                {element.description}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        element.status ===
                                                        "ACTIVE"
                                                            ? "bg-green-600/20 text-green-400"
                                                            : "bg-gray-600/20 text-gray-400"
                                                    }`}
                                                >
                                                    {element.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEditElement(
                                                                element
                                                            )
                                                        }
                                                        className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteElement(
                                                                element.id
                                                            )
                                                        }
                                                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create/Edit Element Modal */}
            {(isCreateModalOpen || isEditModalOpen) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
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

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Description{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={elementFormData.description}
                                    onChange={handleElementFormChange}
                                    required
                                    rows={3}
                                    className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter feature description"
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
