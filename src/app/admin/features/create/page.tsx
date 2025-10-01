"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateFeature() {
    const [formData, setFormData] = useState({
        name: "",
        planIds: [] as number[], // Add planIds for linking plans
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/features", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    planIds: formData.planIds, // Send empty array if no plans selected
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create feature");
            }

            const createdFeature = await response.json();
            console.log("Feature created:", createdFeature);

            // Redirect back to features list
            router.push("/admin/features");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong"
            );
            console.error("Error creating feature:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            name: "",
            planIds: [],
        });
        setError("");
    };

    const router = useRouter();

    return (
        <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-white">
                    Create a Feature
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
                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Feature Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter feature name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Plan Selection (Optional - if you want to link plans during creation) */}
                {/* <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Link to Plans (Optional)
                    </label>
                    <div className="mt-2 text-sm text-gray-400">
                        <p>
                            You can link this feature to plans later when
                            editing.
                        </p>
                    </div>
                </div> */}

                {/* Actions */}
                <div className="flex justify-between pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating..." : "Save Feature"}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={loading}
                        className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}
