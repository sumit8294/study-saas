"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Feature {
    id: number;
    name: string;
}

export default function CreatePlanPage() {
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
        featureIds: [] as number[], // Changed from pricingFeature to featureIds array
        image: null as File | null,
    });

    const [features, setFeatures] = useState<Feature[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mounted, setMounted] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        fetchFeatures();
    }, []);

    // Fetch available features
    const fetchFeatures = async () => {
        try {
            const response = await fetch("/api/features");
            if (response.ok) {
                const featuresData = await response.json();
                setFeatures(featuresData);
            }
        } catch (err) {
            console.error("Failed to fetch features:", err);
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
            // Handle image upload if needed
            let imageUrl = "";
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

            const response = await fetch("/api/plans", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(planData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create plan");
            }

            const createdPlan = await response.json();
            console.log("Plan created:", createdPlan);

            // Redirect to plans list
            router.push("/admin/plans");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong"
            );
            console.error("Error creating plan:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            name: "",
            amount: "",
            description: "",
            limitClients: 0,
            limitSuppliers: 0,
            limitEmployees: 0,
            limitDomains: 0,
            limitPurchases: 0,
            limitInvoices: 0,
            featureIds: [],
            image: null,
        });
        setError("");
    };

    if (!mounted) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-[#111827] rounded-xl shadow-lg border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-white">
                    Create a Plan
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
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="mt-1 w-full text-gray-300 bg-[#1F2937] border border-gray-700 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        Optional: Upload a plan image
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating..." : "Save Plan"}
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
