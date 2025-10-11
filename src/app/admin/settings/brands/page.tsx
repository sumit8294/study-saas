"use client";

import { useState, useEffect } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { Pencil, Trash2, Plus, Search, RefreshCw, Save, X } from "lucide-react";

// Types
interface BrandElement {
    id: number;
    name: string;
    image: string;
    order_index: number;
    status: "ACTIVE" | "INACTIVE";
    is_deleted?: boolean;
}

interface SectionData {
    showOnLanding: boolean;
    status: "ACTIVE" | "INACTIVE";
}

export default function BrandsSettingsPage() {
    const [sectionData, setSectionData] = useState<SectionData>({
        showOnLanding: true,
        status: "ACTIVE",
    });

    const [brands, setBrands] = useState<BrandElement[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showBrandModal, setShowBrandModal] = useState(false);
    const [editingBrand, setEditingBrand] = useState<BrandElement | null>(null);
    const [brandForm, setBrandForm] = useState({
        name: "",
        image: "",
        order_index: 0,
        status: "ACTIVE" as "ACTIVE" | "INACTIVE",
    });

    // Toast states
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");

    // Fetch section data and brands
    useEffect(() => {
        fetchSectionData();
        fetchBrands();
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
            const response = await fetch("/api/website-sections/brands");
            const data = await response.json();

            if (data.section) {
                setSectionData({
                    showOnLanding: data.section.show_on_landing,
                    status: data.section.status,
                });
            }
        } catch (error) {
            console.error("Error fetching section data:", error);
            showToast("Failed to load section data", "error");
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await fetch(
                "/api/website-sections/brands/elements"
            );
            const data = await response.json();
            setBrands(data);
        } catch (error) {
            console.error("Error fetching brands:", error);
            showToast("Failed to load brands", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSectionSubmit = async () => {
        setSaving(true);

        try {
            const response = await fetch("/api/website-sections/brands", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: {}, // Brands section might not need content
                    showOnLanding: sectionData.showOnLanding,
                    status: sectionData.status,
                }),
            });

            if (response.ok) {
                showToast("Brands section updated successfully!", "success");
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

    const handleBrandSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const url = editingBrand
                ? `/api/website-sections/brands/elements/${editingBrand.id}`
                : "/api/website-sections/brands/elements";

            const method = editingBrand ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(brandForm),
            });

            if (response.ok) {
                await fetchBrands();
                setShowBrandModal(false);
                setEditingBrand(null);
                resetBrandForm();
                showToast(
                    editingBrand
                        ? "Brand updated successfully!"
                        : "Brand created successfully!",
                    "success"
                );
            } else {
                const errorData = await response.json();
                showToast(errorData.error || "Failed to save brand", "error");
            }
        } catch (error) {
            console.error("Error saving brand:", error);
            showToast("Failed to save brand", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteBrand = async (id: number) => {
        if (!confirm("Are you sure you want to delete this brand?")) return;

        try {
            const response = await fetch(
                `/api/website-sections/brands/elements/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                await fetchBrands();
                showToast("Brand deleted successfully!", "success");
            } else {
                const errorData = await response.json();
                showToast(errorData.error || "Failed to delete brand", "error");
            }
        } catch (error) {
            console.error("Error deleting brand:", error);
            showToast("Failed to delete brand", "error");
        }
    };

    const openCreateModal = () => {
        setEditingBrand(null);
        resetBrandForm();
        setShowBrandModal(true);
    };

    const openEditModal = (brand: BrandElement) => {
        setEditingBrand(brand);
        setBrandForm({
            name: brand.name,
            image: brand.image,
            order_index: brand.order_index,
            status: brand.status,
        });
        setShowBrandModal(true);
    };

    const resetBrandForm = () => {
        setBrandForm({
            name: "",
            image: "",
            order_index:
                brands.length > 0
                    ? Math.max(...brands.map((brand) => brand.order_index)) + 1
                    : 1,
            status: "ACTIVE",
        });
    };

    const handleBrandChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setBrandForm((prev) => ({
            ...prev,
            [name]: name === "order_index" ? parseInt(value) || 0 : value,
        }));
    };

    const handleRefresh = () => {
        setLoading(true);
        fetchSectionData();
        fetchBrands();
        showToast("Refreshed successfully!", "success");
    };

    const filteredBrands = brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
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

                {/* Table Section */}
                <div className="bg-[#111827] rounded-lg shadow border border-gray-800 p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-md font-semibold text-white">
                            Brands
                        </h3>
                        <div className="flex gap-2">
                            {/* Refresh Button */}
                            <button
                                onClick={handleRefresh}
                                disabled={loading}
                                className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-500 disabled:opacity-50"
                            >
                                <RefreshCw
                                    className={`w-4 h-4 ${
                                        loading ? "animate-spin" : ""
                                    }`}
                                />
                            </button>

                            {/* Create Button */}
                            <button
                                onClick={openCreateModal}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-500"
                            >
                                <Plus className="w-4 h-4" /> Create
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-4 w-full sm:w-1/3">
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search brands..."
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
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {filteredBrands.map((brand, index) => (
                                    <tr
                                        key={brand.id}
                                        className="hover:bg-[#1F2937]/50"
                                    >
                                        <td className="px-6 py-4 text-sm text-white">
                                            {brand.order_index}
                                        </td>
                                        <td className="px-6 py-4">
                                            <img
                                                src={
                                                    brand.image ||
                                                    "/site/no-image.png"
                                                }
                                                alt={brand.name}
                                                className="w-16 h-10 object-contain border rounded-md bg-white p-1"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white">
                                            {brand.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-1 text-xs font-semibold rounded ${
                                                    brand.status === "ACTIVE"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-700"
                                                }`}
                                            >
                                                {brand.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <button
                                                onClick={() =>
                                                    openEditModal(brand)
                                                }
                                                className="p-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteBrand(brand.id)
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
                        {filteredBrands.length === 0 && (
                            <div className="text-center py-8 text-gray-400">
                                No brands found
                            </div>
                        )}
                    </div>
                </div>

                {/* Show at Landing Page Toggle */}
                <div className="bg-[#111827] rounded-lg shadow border border-gray-800 p-6">
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
                            onClick={handleSectionSubmit}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Brand Modal */}
            {showBrandModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-[#111827] rounded-lg shadow-lg border border-gray-800 w-full max-w-md">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">
                                {editingBrand
                                    ? "Edit Brand"
                                    : "Create New Brand"}
                            </h3>

                            <form
                                onSubmit={handleBrandSubmit}
                                className="space-y-4"
                            >
                                {/* Name */}
                                <div>
                                    <label className="block text-sm mb-2 font-medium text-white">
                                        Brand Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={brandForm.name}
                                        onChange={handleBrandChange}
                                        placeholder="Enter brand name"
                                        className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                {/* Image URL */}
                                <div>
                                    <label className="block text-sm mb-2 font-medium text-white">
                                        Logo URL{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={brandForm.image}
                                        onChange={handleBrandChange}
                                        placeholder="https://example.com/logo.png"
                                        className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Order Index */}
                                    <div>
                                        <label className="block text-sm mb-2 font-medium text-white">
                                            Order Index
                                        </label>
                                        <input
                                            type="number"
                                            name="order_index"
                                            value={brandForm.order_index}
                                            onChange={handleBrandChange}
                                            className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm mb-2 font-medium text-white">
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            value={brandForm.status}
                                            onChange={handleBrandChange}
                                            className="w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            <option value="ACTIVE">
                                                Active
                                            </option>
                                            <option value="INACTIVE">
                                                Inactive
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                {/* Image Preview */}
                                {brandForm.image && (
                                    <div>
                                        <label className="block text-sm mb-2 font-medium text-white">
                                            Logo Preview
                                        </label>
                                        <div className="border border-gray-700 rounded-lg p-4 bg-[#1F2937] flex justify-center">
                                            <img
                                                src={brandForm.image}
                                                alt="Preview"
                                                className="max-h-20 max-w-full object-contain"
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        "/site/no-image.png";
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Modal Actions */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowBrandModal(false);
                                            setEditingBrand(null);
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
                                            : editingBrand
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
