"use client";

import Image from "next/image";
import { useState } from "react";

interface Feature {
    id: number;

    name: string;
}

export default function Features() {
    const [features, setFeatures] = useState<Feature[]>([
        {
            id: 1,

            name: "Role Management",
        },
        {
            id: 2,
            name: "	VAT Rates Management",
        },
        {
            id: 3,

            name: "Database Backup",
        },
        {
            id: 3,

            name: "On Demand Support",
        },
    ]);

    const handleDelete = (id: number) => {
        setFeatures(features.filter((feature) => feature.id !== id));
    };

    return (
        <div className="">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        Features
                    </h1>
                    <p className="text-gray-400 text-sm">
                        A list of all features
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
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-[#1F2937]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Name
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

                                <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                                    <a
                                        href="/admin/features/edit/1"
                                        className=""
                                    >
                                        <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                                            Edit
                                        </button>
                                    </a>
                                    <button
                                        onClick={() => handleDelete(feature.id)}
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
