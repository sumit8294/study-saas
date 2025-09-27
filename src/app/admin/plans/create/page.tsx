"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

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
        pricingFeature: "",
        image: null as File | null,
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
            amount: "",
            description: "",
            limitClients: 0,
            limitSuppliers: 0,
            limitEmployees: 0,
            limitDomains: 0,
            limitPurchases: 0,
            limitInvoices: 0,
            pricingFeature: "",
            image: null,
        });
    };

    const router = useRouter();

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
                            Amount <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="amount"
                            placeholder="0"
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
                            Limit Clients{" "}
                            <span className="text-red-500">*</span>{" "}
                            <span className="text-gray-500 text-xs">
                                (0 means unlimited)
                            </span>
                        </label>
                        <input
                            type="number"
                            name="limitClients"
                            value={formData.limitClients}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Limit Suppliers{" "}
                            <span className="text-red-500">*</span>{" "}
                            <span className="text-gray-500 text-xs">
                                (0 means unlimited)
                            </span>
                        </label>
                        <input
                            type="number"
                            name="limitSuppliers"
                            value={formData.limitSuppliers}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Limit Employees{" "}
                            <span className="text-red-500">*</span>{" "}
                            <span className="text-gray-500 text-xs">
                                (0 means unlimited)
                            </span>
                        </label>
                        <input
                            type="number"
                            name="limitEmployees"
                            value={formData.limitEmployees}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Limit Domains{" "}
                            <span className="text-red-500">*</span>{" "}
                            <span className="text-gray-500 text-xs">
                                (0 means unlimited)
                            </span>
                        </label>
                        <input
                            type="number"
                            name="limitDomains"
                            value={formData.limitDomains}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Limit Purchases{" "}
                            <span className="text-red-500">*</span>{" "}
                            <span className="text-gray-500 text-xs">
                                (0 means unlimited)
                            </span>
                        </label>
                        <input
                            type="number"
                            name="limitPurchases"
                            value={formData.limitPurchases}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Limit Invoices{" "}
                            <span className="text-red-500">*</span>{" "}
                            <span className="text-gray-500 text-xs">
                                (0 means unlimited)
                            </span>
                        </label>
                        <input
                            type="number"
                            name="limitInvoices"
                            value={formData.limitInvoices}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Pricing Features */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Pricing Features <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="pricingFeature"
                        value={formData.pricingFeature}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full px-3 py-2 bg-[#1F2937] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select pricing features</option>
                        <option value="basic">Basic Features</option>
                        <option value="pro">Pro Features</option>
                        <option value="enterprise">Enterprise Features</option>
                    </select>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Image <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="mt-1 w-full text-gray-300 bg-[#1F2937] border border-gray-700 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
                    />
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
