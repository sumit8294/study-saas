"use client";

import Image from "next/image";
import { useState } from "react";

interface Plan {
    id: number;
    image: string;
    name: string;
    amount: number;
    currency: string;
    description: string;
}

export default function PlansPage() {
    const [plans, setPlans] = useState<Plan[]>([
        {
            id: 1,
            image: "/plans/basic.png",
            name: "Basic Plan",
            amount: 29,
            currency: "USD",
            description: "Perfect for small businesses",
        },
        {
            id: 2,
            image: "/plans/pro.png",
            name: "Pro Plan",
            amount: 59,
            currency: "USD",
            description: "Ideal for growing teams",
        },
        {
            id: 3,
            image: "/plans/enterprise.png",
            name: "Enterprise Plan",
            amount: 129,
            currency: "USD",
            description: "Best for large companies",
        },
    ]);

    const handleDelete = (id: number) => {
        setPlans(plans.filter((plan) => plan.id !== id));
    };

    return (
        <div className="">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-white">Plans</h1>
                    <p className="text-gray-400 text-sm">
                        A list of all plans including their name, amount,
                        currency, and description.
                    </p>
                </div>
                <a href="/admin/plans/create" className="flex">
                    <button className="mt-4 sm:mt-0 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500">
                        Add Plan
                    </button>
                </a>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#111827] shadow-lg">
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
                                        <Image
                                            src={plan.image}
                                            alt={plan.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                                    {plan.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {plan.amount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {plan.currency}
                                </td>
                                <td className="px-6 py-4 text-gray-400">
                                    {plan.description}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                                    <a href="/admin/plans/edit/1" className="">
                                        <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                                            Edit
                                        </button>
                                    </a>
                                    <button
                                        onClick={() => handleDelete(plan.id)}
                                        className="text-red-400 hover:text-red-300 font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
