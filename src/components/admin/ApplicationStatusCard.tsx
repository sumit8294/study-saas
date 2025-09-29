"use client";

import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const plansData = [
    { name: "New Business", value: 33, color: "#6366F1" }, // Indigo
    { name: "Growing Business", value: 34, color: "#22C55E" }, // Green
    { name: "Pro Marketer", value: 33, color: "#FACC15" }, // Yellow
];

const clientsData = [
    { id: 1, name: "John Doe", company: "Apply", subscriptions: 0 },
    { id: 2, name: "Jane Doe", company: "Apply", subscriptions: 0 },
];

export default function DashboardSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
            {/* Top Plans Card */}
            <div className="bg-[#111827] border border-white/10 rounded-xl shadow-lg p-5">
                <h2 className="text-lg font-semibold text-white mb-4">
                    Top Plans (2025)
                </h2>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={plansData}
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                dataKey="value"
                                label
                            >
                                {plansData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1F2937",
                                    border: "none",
                                    color: "#fff",
                                }}
                            />
                            <Legend
                                wrapperStyle={{
                                    color: "#fff",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Clients Card */}
            <div className="bg-[#111827] border border-white/10 rounded-xl shadow-lg p-5">
                <h2 className="text-lg font-semibold text-white mb-4">
                    Top Clients
                </h2>
                <div className="space-y-4">
                    {clientsData.map((client) => (
                        <div
                            key={client.id}
                            className="flex items-center justify-between bg-[#1F2937] border border-white/10 rounded-lg p-4 shadow-md hover:shadow-xl transition"
                        >
                            <div className="flex items-center space-x-4">
                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 font-bold">
                                    {client.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </div>
                                {/* Client Info */}
                                <div>
                                    <p className="text-white font-medium">
                                        {client.name}
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        {client.company}
                                    </p>
                                </div>
                            </div>
                            {/* Subscriptions */}
                            <p className="text-gray-300 text-sm">
                                Subscriptions:{" "}
                                <span className="text-white font-semibold">
                                    {client.subscriptions}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
