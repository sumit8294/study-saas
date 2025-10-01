"use client";

import { useState, useEffect } from "react";

interface Plan {
    id: number;
    name: string;
}

interface Feature {
    id: number;
    name: string;
    plans: Plan[];
}

export default function Features() {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch features from API
    const fetchFeatures = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/features");

            if (!response.ok) {
                throw new Error("Failed to fetch features");
            }

            const data = await response.json();
            setFeatures(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    // Delete feature
    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this feature?")) {
            return;
        }

        try {
            const response = await fetch(`/api/features/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete feature");
            }

            // Refresh the features list
            await fetchFeatures();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to delete feature"
            );
        }
    };

    // Fetch features on component mount
    useEffect(() => {
        fetchFeatures();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-white">Loading features...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-red-400">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        Features
                    </h1>
                    <p className="text-gray-400 text-sm">
                        A list of all features{" "}
                        {features.length > 0 && `(${features.length})`}
                    </p>
                </div>
                <a href="/admin/features/create" className="flex">
                    <button className="mt-4 sm:mt-0 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500">
                        Add Feature
                    </button>
                </a>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#111827] shadow-lg">
                {features.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                        No features found. Create your first feature!
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-[#1F2937]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Linked Plans
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {features.map((feature) => (
                                <tr
                                    key={feature.id}
                                    className="hover:bg-[#1F2937] transition"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                                        {feature.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                        {feature.plans &&
                                        feature.plans.length > 0
                                            ? feature.plans
                                                  .map((plan) => plan.name)
                                                  .join(", ")
                                            : "No plans linked"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                                        <a
                                            href={`/admin/features/edit/${feature.id}`}
                                            className=""
                                        >
                                            <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                                                Edit
                                            </button>
                                        </a>
                                        <button
                                            onClick={() =>
                                                handleDelete(feature.id)
                                            }
                                            className="text-red-400 hover:text-red-300 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
