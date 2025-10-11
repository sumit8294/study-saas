"use client";

import { useState, useEffect, ChangeEvent } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { Pencil, Trash2, Plus, Search, Save, Loader2, X } from "lucide-react";

interface SoftwareOverviewFormData {
    tagline: string;
    title: string;
    showOnLanding: boolean;
}

interface SoftwareElement {
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

interface SoftwareOverviewSection {
    id: number;
    content: SoftwareOverviewFormData;
    show_on_landing: boolean;
    status: string;
}

interface ElementFormData {
    title: string;
    description: string;
    image: string;
    status: "ACTIVE" | "INACTIVE";
    order_index: number;
}

export default function SoftwareOverviewPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Main section form data
    const [formData, setFormData] = useState<SoftwareOverviewFormData>({
        tagline: "",
        title: "",
        showOnLanding: true,
    });

    // Elements data
    const [elements, setElements] = useState<SoftwareElement[]>([]);
    const [elementsLoading, setElementsLoading] = useState(false);

    // Modal states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingElement, setEditingElement] =
        useState<SoftwareElement | null>(null);
    const [elementSaving, setElementSaving] = useState(false);

    // Element form data
    const [elementFormData, setElementFormData] = useState<ElementFormData>({
        title: "",
        description: "",
        image: "",
        status: "ACTIVE",
        order_index: 0,
    });

    // Fetch software overview section data and elements
    useEffect(() => {
        const fetchSoftwareOverviewData = async () => {
            try {
                setLoading(true);

                // Fetch main section content
                const sectionResponse = await fetch(
                    "/api/website-sections/software_overview"
                );
                if (!sectionResponse.ok) {
                    throw new Error(
                        "Failed to fetch software overview section"
                    );
                }

                const sectionData = await sectionResponse.json();

                if (sectionData.section && sectionData.section.content) {
                    setFormData({
                        tagline: sectionData.section.content.tagline || "",
                        title: sectionData.section.content.title || "",
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
                        : "Failed to load software overview section"
                );
                console.error("Error fetching software overview section:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSoftwareOverviewData();
    }, []);

    // Fetch elements separately
    const fetchElements = async () => {
        try {
            setElementsLoading(true);
            const response = await fetch(
                "/api/website-sections/software_overview/elements"
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
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setElementFormData((prev) => ({
            ...prev,
            [name]: name === "order_index" ? parseInt(value) || 0 : value,
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
            const response = await fetch(
                "/api/website-sections/software_overview",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content: formData,
                        showOnLanding: formData.showOnLanding,
                        status: "ACTIVE",
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error ||
                        "Failed to update software overview section"
                );
            }

            setSuccess("Software overview section updated successfully!");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update software overview section"
            );
        } finally {
            setSaving(false);
        }
    };

    // Element CRUD Operations
    const handleCreateElement = () => {
        // Get next order index
        const nextOrderIndex =
            elements.length > 0
                ? Math.max(...elements.map((el) => el.order_index)) + 1
                : 1;

        setElementFormData({
            title: "",
            description: "",
            image: "",
            status: "ACTIVE",
            order_index: nextOrderIndex,
        });
        setEditingElement(null);
        setIsCreateModalOpen(true);
    };

    const handleEditElement = (element: SoftwareElement) => {
        setEditingElement(element);
        setElementFormData({
            title: element.title,
            description: element.description || "",
            image: element.image,
            status: element.status,
            order_index: element.order_index,
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
                    "/api/website-sections/software_overview/elements",
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
                    `/api/website-sections/software_overview/elements/${editingElement?.id}`,
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
                    errorData.error || "Failed to save software element"
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
                    ? "Software element created successfully!"
                    : "Software element updated successfully!"
            );
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to save software element"
            );
        } finally {
            setElementSaving(false);
        }
    };

    const handleDeleteElement = async (elementId: number) => {
        if (
            !confirm("Are you sure you want to delete this software element?")
        ) {
            return;
        }

        try {
            const response = await fetch(
                `/api/website-sections/software_overview/elements/${elementId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete element");
            }

            // Refresh elements list
            await fetchElements();
            setSuccess("Software element deleted successfully!");
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
            order_index: 0,
        });
    };

    const filteredElements = elements.filter(
        (el) =>
            el.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            el.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a]">
                <SettingsSidebar />
                <div className="bg-[#111827] flex-1 mt-6 ml-0 lg:ml-6 lg:mt-0 mb-6 rounded-xl shadow-lg border border-white/10 p-6 flex items-center justify-center">
                    <div className="flex items-center gap-3 text-white">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Loading software overview settings...
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
                        Software Overview
                    </h2>

                    <form onSubmit={handleSectionSubmit} className="space-y-6">
                        {/* Tagline */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Software Overview Section Tagline{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="tagline"
                                placeholder="Dashboard Screenshot"
                                value={formData.tagline}
                                onChange={handleFormChange}
                                required
                                className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Software Overview Section Title{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Software Overview"
                                value={formData.title}
                                onChange={handleFormChange}
                                required
                                className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

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

                {/* Table Section */}
                <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">
                            Software Overview Elements
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
                            placeholder="Search software elements..."
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
                                        Order
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
                                            colSpan={7}
                                            className="px-6 py-8 text-center"
                                        >
                                            <div className="flex items-center justify-center gap-2 text-gray-400">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Loading software elements...
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredElements.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-6 py-8 text-center text-gray-400"
                                        >
                                            {searchTerm
                                                ? "No software elements found matching your search."
                                                : "No software elements found."}
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
                                            <td className="px-6 py-4 text-gray-300 font-mono">
                                                {element.order_index}
                                            </td>
                                            <td className="px-6 py-4">
                                                {element.image ? (
                                                    <img
                                                        src={element.image}
                                                        alt={element.title}
                                                        className="w-12 h-12 object-cover rounded-lg border border-gray-600"
                                                    />
                                                ) : (
                                                    <img
                                                        src={
                                                            "/site/no-image.png"
                                                        }
                                                        alt={"No Image"}
                                                        className="w-12 h-12 object-cover rounded-lg border border-gray-600"
                                                    />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-300 font-medium">
                                                {element.title}
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 max-w-xs">
                                                <div className="line-clamp-2">
                                                    {element.description ||
                                                        "No description"}
                                                </div>
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
                    <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-white">
                                {isCreateModalOpen ? "Create" : "Edit"} Software
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Title */}
                                <div className="md:col-span-2">
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
                                        placeholder="Enter software element title"
                                    />
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={elementFormData.description}
                                        onChange={handleElementFormChange}
                                        rows={3}
                                        className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter software element description"
                                    />
                                </div>

                                {/* Image URL */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Image URL{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={elementFormData.image}
                                        onChange={handleElementFormChange}
                                        required
                                        className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter image URL"
                                    />
                                </div>

                                {/* Order Index */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Order Index
                                    </label>
                                    <input
                                        type="number"
                                        name="order_index"
                                        value={elementFormData.order_index}
                                        onChange={handleElementFormChange}
                                        min="0"
                                        className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                        <option value="INACTIVE">
                                            Inactive
                                        </option>
                                    </select>
                                </div>
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
