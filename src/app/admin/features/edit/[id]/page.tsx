"use client";

import { useRouter } from "next/navigation";
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

interface Props {
    params: {
        id: string;
    };
}

export default function EditFeatures({ params }: Props) {
    const router = useRouter();
    const featureId = params.id;

    const [formData, setFormData] = useState({
        name: "",
        planIds: [] as number[],
    });
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");

    // Fetch feature data and available plans
    useEffect(() => {
        const fetchData = async () => {
            try {
                setFetching(true);

                // Fetch the specific feature
                const featureResponse = await fetch(
                    `/api/features/${featureId}`
                );
                if (!featureResponse.ok) {
                    throw new Error("Failed to fetch feature");
                }
                const featureData: Feature = await featureResponse.json();

                // Fetch available plans (you'll need to create this API route)
                const plansResponse = await fetch("/api/plans");
                if (plansResponse.ok) {
                    const plansData = await plansResponse.json();
                    setPlans(plansData);
                }

                // Set form data with existing feature data
                setFormData({
                    name: featureData.name,
                    planIds: featureData.plans?.map((plan) => plan.id) || [],
                });
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load feature"
                );
                console.error("Error fetching feature:", err);
            } finally {
                setFetching(false);
            }
        };

        if (featureId) {
            fetchData();
        }
    }, [featureId]);

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

    const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedPlanIds = selectedOptions.map((option) =>
            parseInt(option.value)
        );
        setFormData({
            ...formData,
            planIds: selectedPlanIds,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`/api/features/${featureId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    planIds: formData.planIds,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update feature");
            }

            const updatedFeature = await response.json();
            console.log("Feature updated:", updatedFeature);

            // Redirect back to features list
            router.push("/admin/features");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong"
            );
            console.error("Error updating feature:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        // Re-fetch original data to reset
        const fetchOriginalData = async () => {
            try {
                const response = await fetch(`/api/features/${featureId}`);
                if (response.ok) {
                    const featureData: Feature = await response.json();
                    setFormData({
                        name: featureData.name,
                        planIds:
                            featureData.plans?.map((plan) => plan.id) || [],
                    });
                }
            } catch (err) {
                console.error("Error resetting form:", err);
            }
        };
        fetchOriginalData();
        setError("");
    };

    const handleDelete = async () => {
        if (
            !confirm(
                "Are you sure you want to delete this feature? This action cannot be undone."
            )
        ) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/features/${featureId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete feature");
            }

            router.push("/admin/features");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to delete feature"
            );
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                <div className="flex justify-center items-center py-8">
                    <div className="text-white">Loading feature data...</div>
                </div>
            </div>
        );
    }

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

                {/* Plan Selection */}
                {/* <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Linked Plans
                    </label>
                    <select
                        multiple
                        value={formData.planIds.map((id) => id.toString())}
                        onChange={handlePlanChange}
                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        size={4}
                    >
                        {plans.map((plan) => (
                            <option key={plan.id} value={plan.id}>
                                {plan.name}
                            </option>
                        ))}
                    </select>
                    <p className="mt-1 text-sm text-gray-400">
                        Hold Ctrl/Cmd to select multiple plans
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        Currently linked to: {formData.planIds.length} plan(s)
                    </p>
                </div> */}

                {/* Actions */}
                <div className="flex justify-between pt-4">
                    <div className="space-x-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Updating..." : "Save Changes"}
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
                </div>
            </form>
        </div>
    );
}
