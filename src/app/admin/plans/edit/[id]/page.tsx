"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Feature {
    id: number;
    name: string;
}

interface Plan {
    id: number;
    name: string;
    amount: number;
    description: string;
    limitClients: number;
    limitSuppliers: number;
    limitEmployees: number;
    limitDomains: number;
    limitPurchases: number;
    limitInvoices: number;
    image: string;
    features: Feature[];
}

interface Props {
    params: {
        id: string;
    };
}

export default function EditPlanPage({ params }: Props) {
    const router = useRouter();
    const planId = params.id;

    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        description: "",
        limitClients: 0,
        limitSuppliers: 0,
        limitEmployees: 0,
        limitDomains: 0,
        limitPurchases: 0,
        limitInvoices: 0,
        featureIds: [] as number[],
        image: null as File | null,
        currentImage: "",
    });

    const [features, setFeatures] = useState<Feature[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchData();
    }, [planId]);

    // Fetch plan data and available features
    const fetchData = async () => {
        try {
            setFetching(true);

            // Fetch the specific plan
            const planResponse = await fetch(`/api/plans/${planId}`);
            if (!planResponse.ok) {
                throw new Error("Failed to fetch plan");
            }
            const planData: Plan = await planResponse.json();

            // Fetch available features
            const featuresResponse = await fetch("/api/features");
            if (featuresResponse.ok) {
                const featuresData = await featuresResponse.json();
                setFeatures(featuresData);
            }

            // Set form data with existing plan data
            setFormData({
                name: planData.name,
                amount: planData.amount.toString(),
                description: planData.description || "",
                limitClients: planData.limitClients,
                limitSuppliers: planData.limitSuppliers,
                limitEmployees: planData.limitEmployees,
                limitDomains: planData.limitDomains,
                limitPurchases: planData.limitPurchases,
                limitInvoices: planData.limitInvoices,
                featureIds:
                    planData.features?.map((feature) => feature.id) || [],
                image: null,
                currentImage: planData.image,
            });
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to load plan"
            );
            console.error("Error fetching plan:", err);
        } finally {
            setFetching(false);
        }
    };

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

    const handleFeatureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions);
        const selectedFeatureIds = selectedOptions.map((option) =>
            parseInt(option.value)
        );
        setFormData({
            ...formData,
            featureIds: selectedFeatureIds,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Handle image upload if a new file is selected
            let imageUrl = formData.currentImage;
            if (formData.image) {
                // You'll need to implement file upload to your storage
                // For now, we'll just use a placeholder
                imageUrl = `/plans/${formData.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}.png`;
            }

            const planData = {
                name: formData.name,
                amount: formData.amount,
                description: formData.description,
                limitClients: formData.limitClients,
                limitSuppliers: formData.limitSuppliers,
                limitEmployees: formData.limitEmployees,
                limitDomains: formData.limitDomains,
                limitPurchases: formData.limitPurchases,
                limitInvoices: formData.limitInvoices,
                image: imageUrl,
                featureIds: formData.featureIds,
            };

            const response = await fetch(`/api/plans/${planId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(planData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update plan");
            }

            const updatedPlan = await response.json();
            console.log("Plan updated:", updatedPlan);

            // Redirect to plans list
            router.push("/admin/plans");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong"
            );
            console.error("Error updating plan:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        // Re-fetch original data to reset
        fetchData();
        setError("");
    };

    const handleDelete = async () => {
        if (
            !confirm(
                "Are you sure you want to delete this plan? This action cannot be undone."
            )
        ) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/plans/${planId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete plan");
            }

            router.push("/admin/plans");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to delete plan"
            );
        } finally {
            setLoading(false);
        }
    };

    if (!mounted || fetching) {
        return (
            <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10 p-6">
                <div className="flex justify-center items-center py-8">
                    <div className="text-white">Loading plan data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-white">Edit Plan</h2>
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
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Amount ($) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="amount"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Description
                    </label>
                    <textarea
                        name="description"
                        placeholder="Enter plan description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Limits */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Limit Clients
                            <span className="text-gray-500 text-xs block">
                                (0 means unlimited)
                            </span>
                        </label>
                        <input
                            type="number"
                            name="limitClients"
                            min="0"
                            value={formData.limitClients}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Limit Suppliers
                            <span className="text-gray-500 text-xs block">
                                (0 means unlimited)
                            </span>
                        </label>
                        <input
                            type="number"
                            name="limitSuppliers"
                            min="0"
                            value={formData.limitSuppliers}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Limit Employees
                            <span className="text-gray-500 text-xs block">
                                (0 means unlimited)
                            </span>
                        </label>
                        <input
                            type="number"
                            name="limitEmployees"
                            min="0"
                            value={formData.limitEmployees}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Limit Domains
                            <span className="text-gray-500 text-xs block">
                                (0 means unlimited)
                            </span>
                        </label>
                        <input
                            type="number"
                            name="limitDomains"
                            min="0"
                            value={formData.limitDomains}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Limit Purchases
                            <span className="text-gray-500 text-xs block">
                                (0 means unlimited)
                            </span>
                        </label>
                        <input
                            type="number"
                            name="limitPurchases"
                            min="0"
                            value={formData.limitPurchases}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Limit Invoices
                            <span className="text-gray-500 text-xs block">
                                (0 means unlimited)
                            </span>
                        </label>
                        <input
                            type="number"
                            name="limitInvoices"
                            min="0"
                            value={formData.limitInvoices}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Features Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Features
                    </label>
                    <select
                        multiple
                        name="featureIds"
                        value={formData.featureIds.map((id) => id.toString())}
                        onChange={handleFeatureChange}
                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        size={4}
                    >
                        {features.map((feature) => (
                            <option key={feature.id} value={feature.id}>
                                {feature.name}
                            </option>
                        ))}
                    </select>
                    <p className="mt-1 text-sm text-gray-400">
                        Hold Ctrl/Cmd to select multiple features
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        Selected: {formData.featureIds.length} feature(s)
                    </p>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Image
                    </label>
                    {formData.currentImage && (
                        <div className="mb-3">
                            <p className="text-sm text-gray-400 mb-2">
                                Current Image:
                            </p>
                            <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-gray-700">
                                <img
                                    src={formData.currentImage}
                                    alt="Current plan"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            "/site/no-image.png";
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="mt-1 w-full text-gray-300 bg-[#1F2937] border border-gray-700 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        Optional: Upload a new plan image
                    </p>
                </div>

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

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 disabled:opacity-50"
                    >
                        Delete Plan
                    </button>
                </div>
            </form>
        </div>
    );
}
