"use client";

import { useState, ChangeEvent } from "react";
import SettingsSidebar from "@/components/admin/SettingsSidebar";
import { Plus, Edit2, Trash2, X, Search } from "lucide-react";

interface ExplorerItem {
    id: number;
    image: string;
    title: string;
    description: string;
    status: "Active" | "Inactive"; // Restrict to these two
}

type FormData = Omit<ExplorerItem, "id">;

export default function ExplorerElements() {
    const [explorers, setExplorers] = useState<ExplorerItem[]>([
        {
            id: 1,
            image: "/images/explorer-1.png",
            title: "Automate Your Business",
            description:
                "Automate repetitive tasks and scale your business faster.",
            status: "Active",
        },
        {
            id: 2,
            image: "/images/explorer-2.png",
            title: "Remove Your PaperWork",
            description: "Digitalize workflows to eliminate manual paperwork.",
            status: "Active",
        },
        {
            id: 3,
            image: "/images/explorer-3.png",
            title: "Go Beyond Your Expectation",
            description:
                "Unlock the full potential of your team and operations.",
            status: "Active",
        },
    ]);

    const [showOnLanding, setShowOnLanding] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ExplorerItem | null>(null);

    const [formData, setFormData] = useState<FormData>({
        image: "",
        title: "",
        description: "",
        status: "Active",
    });

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
            image: "",
            title: "",
            description: "",
            status: "Active",
        });
        setEditingItem(null);
        setIsModalOpen(true);
    };

    // Open Edit Modal
    const handleEdit = (item: ExplorerItem) => {
        setFormData({
            image: item.image,
            title: item.title,
            description: item.description,
            status: item.status,
        });
        setEditingItem(item);
        setIsModalOpen(true);
    };

    // Save Data
    const handleSave = () => {
        if (!formData.title.trim() || !formData.image.trim()) {
            alert("Title and Image URL are required!");
            return;
        }

        if (editingItem) {
            // Update existing item
            setExplorers((prev) =>
                prev.map((e) =>
                    e.id === editingItem.id
                        ? { ...editingItem, ...formData }
                        : e
                )
            );
        } else {
            // Add new item
            const newItem: ExplorerItem = {
                id:
                    explorers.length > 0
                        ? explorers[explorers.length - 1].id + 1
                        : 1,
                ...formData,
            };
            setExplorers((prev) => [...prev, newItem]);
        }
        setIsModalOpen(false);
    };

    // Delete Data
    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this item?")) {
            setExplorers((prev) => prev.filter((e) => e.id !== id));
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-gray-200">
            {/* Sidebar */}
            <div className="w-72">
                <SettingsSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-6 mb-6">
                <div className="max-w-6xl mx-auto bg-[#111827] rounded-xl shadow-md border border-gray-800">
                    <div className="flex items-start justify-between p-6 pb-0 border-gray-700">
                        <h2 className="text-xl font-semibold text-white">
                            Explorer Elements
                        </h2>
                        <div className="flex justify-end">
                            {/* Search Bar */}
                            <div className="relative mb-4 w-full mr-2 ">
                                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <button
                                onClick={handleAdd}
                                className="flex items-center mb-auto gap-2 px-4 py-2 bg-green-600 text-white  rounded-lg hover:bg-green-500 transition"
                            >
                                <Plus className="w-4 h-4" /> Create
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-t border-gray-700">
                            <thead className="bg-gray-900">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                                        #
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                                        Image
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                                        Title
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                                        Description
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {explorers.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="border-t border-gray-700 hover:bg-gray-700/40 transition"
                                    >
                                        <td className="px-4 py-3 text-sm">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-10 h-10 rounded-lg object-cover border border-gray-600"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {item.title}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {item.description}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    item.status === "Active"
                                                        ? "bg-indigo-700 text-white"
                                                        : "bg-gray-600 text-gray-200"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 flex gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2 rounded-lg bg-teal-600 hover:bg-teal-500"
                                            >
                                                <Edit2 className="w-4 h-4 text-white" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="p-2 rounded-lg bg-red-600 hover:bg-red-500"
                                            >
                                                <Trash2 className="w-4 h-4 text-white" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Per Page + Toggle */}
                    <div className="flex items-center justify-between p-6 border-t border-gray-700">
                        <div className="flex items-center space-x-2">
                            <label className="text-sm">Per Page</label>
                            <select className="rounded-lg bg-gray-900 border-gray-700 text-sm p-1">
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                            </select>
                        </div>

                        {/* Toggle */}
                        <div className="flex items-center space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowOnLanding(!showOnLanding)}
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
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-xl border border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white">
                                {editingItem
                                    ? "Edit Explorer Item"
                                    : "Add Explorer Item"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/image.png"
                                    className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter title"
                                    className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter description"
                                    className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
                            >
                                {editingItem ? "Save Changes" : "Add Item"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
