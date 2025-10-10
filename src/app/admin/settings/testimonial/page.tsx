"use client";

import { useState, useEffect } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { Pencil, Trash2, Plus, Search, Save, X } from "lucide-react";

// Types
interface TestimonialElement {
    id: number;
    name: string;
    title: string;
    description: string;
    image: string;
    order_index: number;
    status: "ACTIVE" | "INACTIVE";
    is_deleted?: boolean;
}

interface SectionData {
    tagline: string;
    title: string;
    showOnLanding: boolean;
    status: "ACTIVE" | "INACTIVE";
}

export default function TestimonialSettingsPage() {
    const [sectionData, setSectionData] = useState<SectionData>({
        tagline: "",
        title: "",
        showOnLanding: true,
        status: "ACTIVE",
    });

    const [elements, setElements] = useState<TestimonialElement[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showElementModal, setShowElementModal] = useState(false);
    const [editingElement, setEditingElement] =
        useState<TestimonialElement | null>(null);
    const [elementForm, setElementForm] = useState({
        name: "",
        title: "",
        description: "",
        image: "",
        order_index: 0,
        status: "ACTIVE" as "ACTIVE" | "INACTIVE",
    });

    // Toast states
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");

    // Fetch section data and elements
    useEffect(() => {
        fetchSectionData();
        fetchElements();
    }, []);

    // Auto-hide toasts after 5 seconds
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess("");
                setError("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    const showToast = (message: string, type: "success" | "error") => {
        if (type === "success") {
            setSuccess(message);
            setError("");
        } else {
            setError(message);
            setSuccess("");
        }
    };

    const fetchSectionData = async () => {
        try {
            const response = await fetch("/api/website-sections/testimonial");
            const data = await response.json();

            if (data.section) {
                const content = data.section.content || {};
                setSectionData({
                    tagline: content.tagline || "",
                    title: content.title || "",
                    showOnLanding: data.section.show_on_landing,
                    status: data.section.status,
                });
            }
        } catch (error) {
            console.error("Error fetching section data:", error);
            showToast("Failed to load section data", "error");
        }
    };

    const fetchElements = async () => {
        try {
            const response = await fetch(
                "/api/website-sections/testimonial/elements"
            );
            const data = await response.json();
            setElements(data);
        } catch (error) {
            console.error("Error fetching elements:", error);
            showToast("Failed to load testimonial elements", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSectionChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setSectionData({ ...sectionData, [name]: value });
    };

    const handleSectionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch("/api/website-sections/testimonial", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: {
                        tagline: sectionData.tagline,
                        title: sectionData.title,
                    },
                    showOnLanding: sectionData.showOnLanding,
                    status: sectionData.status,
                }),
            });

            if (response.ok) {
                showToast("Section updated successfully!", "success");
            } else {
                const errorData = await response.json();
                showToast(
                    errorData.error || "Failed to update section",
                    "error"
                );
            }
        } catch (error) {
            console.error("Error updating section:", error);
            showToast("Failed to update section", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleElementSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const url = editingElement
                ? `/api/website-sections/testimonial/elements/${editingElement.id}`
                : "/api/website-sections/testimonial/elements";

            const method = editingElement ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(elementForm),
            });

            if (response.ok) {
                await fetchElements();
                setShowElementModal(false);
                setEditingElement(null);
                resetElementForm();
                showToast(
                    editingElement
                        ? "Testimonial updated successfully!"
                        : "Testimonial created successfully!",
                    "success"
                );
            } else {
                const errorData = await response.json();
                showToast(
                    errorData.error || "Failed to save testimonial",
                    "error"
                );
            }
        } catch (error) {
            console.error("Error saving element:", error);
            showToast("Failed to save testimonial", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteElement = async (id: number) => {
        if (!confirm("Are you sure you want to delete this testimonial?"))
            return;

        try {
            const response = await fetch(
                `/api/website-sections/testimonial/elements/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                await fetchElements();
                showToast("Testimonial deleted successfully!", "success");
            } else {
                const errorData = await response.json();
                showToast(
                    errorData.error || "Failed to delete testimonial",
                    "error"
                );
            }
        } catch (error) {
            console.error("Error deleting element:", error);
            showToast("Failed to delete testimonial", "error");
        }
    };

    const openCreateModal = () => {
        setEditingElement(null);
        resetElementForm();
        setShowElementModal(true);
    };

    const openEditModal = (element: TestimonialElement) => {
        setEditingElement(element);
        setElementForm({
            name: element.name,
            title: element.title,
            description: element.description,
            image: element.image,
            order_index: element.order_index,
            status: element.status,
        });
        setShowElementModal(true);
    };

    const resetElementForm = () => {
        setElementForm({
            name: "",
            title: "",
            description: "",
            image: "",
            order_index:
                elements.length > 0
                    ? Math.max(...elements.map((el) => el.order_index)) + 1
                    : 1,
            status: "ACTIVE",
        });
    };

    const handleElementChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setElementForm((prev) => ({
            ...prev,
            [name]: name === "order_index" ? parseInt(value) || 0 : value,
        }));
    };

    const filteredElements = elements.filter(
        (el) =>
            el.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            el.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            el.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[#0f172a]">
                <SettingsSidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-white">Loading...</div>
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
                {/* Toast Notifications */}
                {success && (
                    <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg flex justify-between items-center">
                        <p className="text-green-400 text-sm">{success}</p>
                        <button
                            onClick={() => setSuccess("")}
                            className="text-green-400 hover:text-green-300"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg flex justify-between items-center">
                        <p className="text-red-400 text-sm">{error}</p>
                        <button
                            onClick={() => setError("")}
                            className="text-red-400 hover:text-red-300"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Form Section */}
                <div className="bg-[#111827] rounded-lg shadow border border-gray-800 p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">
                        Testimonial Section Configuration
                    </h2>

                    <form onSubmit={handleSectionSubmit} className="space-y-6">
                        {/* Tagline */}
                        <div>
                            <label className="block text-sm mb-2 font-medium text-white">
                                Testimonial Section Tagline{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="tagline"
                                placeholder="Testimonials"
                                value={sectionData.tagline}
                                onChange={handleSectionChange}
                                className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm mb-2 font-medium text-white">
                                Testimonial Section Title{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="What Our Clients Say"
                                value={sectionData.title}
                                onChange={handleSectionChange}
                                className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Toggle Show on Landing */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSectionData({
                                            ...sectionData,
                                            showOnLanding:
                                                !sectionData.showOnLanding,
                                        })
                                    }
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        sectionData.showOnLanding
                                            ? "bg-green-500"
                                            : "bg-gray-600"
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            sectionData.showOnLanding
                                                ? "translate-x-6"
                                                : "translate-x-1"
                                        }`}
                                    />
                                </button>
                                <span className="text-sm text-white">
                                    Show at landing page
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Table Section */}
                <div className="bg-[#111827] rounded-lg shadow border border-gray-800 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-md font-semibold text-white">
                            Testimonial Elements
                        </h3>
                        <button
                            onClick={openCreateModal}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-500"
                        >
                            <Plus className="w-4 h-4" /> Create
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-4 w-full sm:w-1/3">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search by name, title, or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-[#1F2937]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Order
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Image
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filteredElements.map((element, index) => (
                                    <tr
                                        key={element.id}
                                        className="hover:bg-[#1F2937]/50"
                                    >
                                        <td className="px-6 py-4 text-sm text-white">
                                            {element.order_index}
                                        </td>
                                        <td className="px-6 py-4">
                                            <img
                                                src={
                                                    element.image ||
                                                    "/images/user-placeholder.png"
                                                }
                                                alt={element.name}
                                                className="w-12 h-12 object-cover border rounded-full"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white">
                                            {element.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white">
                                            {element.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white max-w-xs truncate">
                                            {element.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-1 text-xs font-semibold rounded ${
                                                    element.status === "ACTIVE"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-700"
                                                }`}
                                            >
                                                {element.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <button
                                                onClick={() =>
                                                    openEditModal(element)
                                                }
                                                className="p-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteElement(
                                                        element.id
                                                    )
                                                }
                                                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredElements.length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                No testimonial elements found
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Element Modal */}
            {showElementModal && (
                <div className="fixed inset-0 bg-black/50  flex items-center justify-center p-4 z-50">
                    <div className="bg-[#111827] rounded-lg shadow-lg border border-gray-800 w-full max-w-2xl">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">
                                {editingElement
                                    ? "Edit Testimonial"
                                    : "Create New Testimonial"}
                            </h3>

                            <form
                                onSubmit={handleElementSubmit}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm mb-2 font-medium text-white">
                                            Name{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={elementForm.name}
                                            onChange={handleElementChange}
                                            className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                    </div>

                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm mb-2 font-medium text-white">
                                            Title/Position{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={elementForm.title}
                                            onChange={handleElementChange}
                                            className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm mb-2 font-medium text-white">
                                        Testimonial Text{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={elementForm.description}
                                        onChange={handleElementChange}
                                        rows={4}
                                        className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Image URL */}
                                    <div>
                                        <label className="block text-sm mb-2 font-medium text-white">
                                            Image URL
                                        </label>
                                        <input
                                            type="url"
                                            name="image"
                                            value={elementForm.image}
                                            onChange={handleElementChange}
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    {/* Order Index */}
                                    <div>
                                        <label className="block text-sm mb-2 font-medium text-white">
                                            Order Index
                                        </label>
                                        <input
                                            type="number"
                                            name="order_index"
                                            value={elementForm.order_index}
                                            onChange={handleElementChange}
                                            className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm mb-2 font-medium text-white">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={elementForm.status}
                                        onChange={handleElementChange}
                                        className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="ACTIVE">Active</option>
                                        <option value="INACTIVE">
                                            Inactive
                                        </option>
                                    </select>
                                </div>

                                {/* Modal Actions */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowElementModal(false);
                                            setEditingElement(null);
                                        }}
                                        className="px-4 py-2 text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:border-gray-500 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition disabled:opacity-50"
                                    >
                                        {saving
                                            ? "Saving..."
                                            : editingElement
                                            ? "Update"
                                            : "Create"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
