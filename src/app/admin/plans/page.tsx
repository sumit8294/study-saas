"use client";

import { useState, useEffect } from "react";

interface PlanFeature {
    id: number;
    name: string;
}

interface Plan {
    id: number;
    image: string;
    name: string;
    amount: number;
    currency: string;
    description: string;
    limitClients: number;
    limitSuppliers: number;
    limitEmployees: number;
    limitDomains: number;
    limitInvoices: number;
    limitPurchases: number;
    features: PlanFeature[];
    tenantCount: number;
}

export default function PlansPage() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [mounted, setMounted] = useState(false);

    // Set mounted to true after component mounts
    useEffect(() => {
        setMounted(true);
    }, []);

    // Fetch plans from API
    const fetchPlans = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/plans");

            if (!response.ok) {
                throw new Error("Failed to fetch plans");
            }

            const data = await response.json();
            setPlans(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error fetching plans:", err);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchPlans();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this plan?")) {
            return;
        }

        try {
            const response = await fetch(`/api/plans/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete plan");
            }

            await fetchPlans();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to delete plan"
            );
        }
    };

    // Prevent hydration by not rendering until mounted
    if (!mounted) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (loading && plans.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-white">Loading plans...</div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-white">Plans</h1>
                    <p className="text-gray-400 text-sm">
                        A list of all plans including their name, amount,
                        currency, and description.
                        {plans.length > 0 && ` (${plans.length} plans)`}
                    </p>
                </div>
                <a href="/admin/plans/create" className="flex">
                    <button className="mt-4 sm:mt-0 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500">
                        Add Plan
                    </button>
                </a>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}

            {/* Table Container */}
            <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#111827] shadow-lg">
                {plans.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                        No plans found. Create your first plan!
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-[#1F2937]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Image
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Currency
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Features
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Tenants
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {plans.map((plan) => (
                                <tr
                                    key={plan.id}
                                    className="hover:bg-[#1F2937] transition"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="w-12 h-12 relative rounded-lg overflow-hidden">
                                            {/* Using regular img tag to avoid hydration issues */}
                                            <img
                                                src={plan.image}
                                                alt={plan.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (
                                                        e.target as HTMLImageElement
                                                    ).src =
                                                        "/site/no-image.png";
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                                        {plan.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                        ${plan.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                        {plan.currency}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 max-w-xs">
                                        {plan.description}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">
                                        <div className="flex flex-wrap gap-1 max-w-xs">
                                            {plan.features &&
                                            plan.features.length > 0 ? (
                                                plan.features
                                                    .slice(0, 3)
                                                    .map((feature) => (
                                                        <span
                                                            key={feature.id}
                                                            className="px-2 py-1 bg-gray-700 rounded text-xs"
                                                        >
                                                            {feature.name}
                                                        </span>
                                                    ))
                                            ) : (
                                                <span className="text-gray-500 text-sm">
                                                    No features
                                                </span>
                                            )}
                                            {plan.features &&
                                                plan.features.length > 3 && (
                                                    <span className="text-gray-500 text-xs">
                                                        +
                                                        {plan.features.length -
                                                            3}{" "}
                                                        more
                                                    </span>
                                                )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                        {plan.tenantCount} tenants
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                                        <a
                                            href={`/admin/plans/edit/${plan.id}`}
                                        >
                                            <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                                                Edit
                                            </button>
                                        </a>
                                        <button
                                            onClick={() =>
                                                handleDelete(plan.id)
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
