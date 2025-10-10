"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, RotateCcw, Save, Send, X } from "lucide-react";

interface PageFormData {
    title: string;
    name: string;
    slug: string;
    type: "INFORMATION" | "NEED_HELP" | "LEGAL" | "CUSTOM";
    status: "DRAFT" | "ACTIVE" | "INACTIVE" | "ARCHIVED";
    content: string;
}

export default function CreatePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<PageFormData>({
        title: "",
        name: "",
        slug: "",
        type: "INFORMATION",
        status: "DRAFT",
        content: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/pages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create page");
            }

            // Redirect to pages list on success
            router.push("/admin/pages");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to create page"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Auto-generate slug from title
        if (name === "title") {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");
            setFormData((prev) => ({
                ...prev,
                slug: slug,
            }));
        }
    };

    const handleCancel = () => {
        router.push("/admin/pages");
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        Create a page
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Add a new static page to your application
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center gap-2 mb-2">
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-600"
                        >
                            ← Back
                        </button>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}

            {/* Form */}
            <div className="bg-[#111827] border border-white/10 rounded-lg shadow-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title Field */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Page Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Enter page title"
                        />
                    </div>

                    {/* Name Field */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Internal Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Enter internal name for reference"
                        />
                    </div>

                    {/* Slug Field */}
                    <div>
                        <label
                            htmlFor="slug"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Slug *
                        </label>
                        <div className="flex items-center">
                            <span className="px-3 py-2.5 bg-[#374151] border border-r-0 border-gray-600 rounded-l-lg text-gray-400">
                                /
                            </span>
                            <input
                                type="text"
                                id="slug"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                className="flex-1 px-4 py-2.5 bg-[#1F2937] border border-gray-600 rounded-r-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="page-slug"
                            />
                        </div>
                    </div>

                    {/* Type and Status Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Type Field */}
                        <div>
                            <label
                                htmlFor="type"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Type *
                            </label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            >
                                <option value="INFORMATION">Information</option>
                                <option value="NEED_HELP">Need Help</option>
                                <option value="LEGAL">Legal</option>
                                <option value="CUSTOM">Custom</option>
                            </select>
                        </div>

                        {/* Status Field */}
                        <div>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Status *
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-[#1F2937] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            >
                                <option value="DRAFT">Draft</option>
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                                <option value="ARCHIVED">Archived</option>
                            </select>
                        </div>
                    </div>

                    {/* Content Field */}
                    <div>
                        <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Content *
                        </label>
                        <div className="border border-gray-600 rounded-lg overflow-hidden">
                            {/* Textarea */}
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                rows={15}
                                className="w-full px-4 py-3 bg-[#1F2937] text-white placeholder-gray-500 focus:outline-none resize-none border-none focus:ring-0"
                                placeholder="Enter page content..."
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                        <div className="flex gap-3">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                <Save className="w-4 h-4" />
                                {loading ? "Creating..." : "Create Page"}
                            </button>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
