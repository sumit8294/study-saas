"use client"; // if you need client-side hooks

import { useRouter, usePathname } from "next/navigation";

import { useState } from "react";
interface Props {
    params: {
        id: string; // this will be "2" in /plans/edit/2
    };
}

export default function EditFeatures({ params }: Props) {
    const router = useRouter();
    const pathname = usePathname(); // e.g., "/admin/features/edit/2"
    const planId = pathname.split("/").pop(); // get the last segment

    const [formData, setFormData] = useState({
        name: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
    };

    const handleReset = () => {
        setFormData({
            name: "",
        });
    };

    return (
        <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-white">
                    Edit Feature
                </h2>
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                    ← Back
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Name and Amount */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter plan name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}
