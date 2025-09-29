"use client";

import { useState } from "react";
import { SearchIcon, RefreshCw, Printer, MailPlus, Trash2 } from "lucide-react";

interface Subscriber {
    id: number;
    email: string;
    subscribedAt: string;
}

export default function SubscribersTable() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([
        { id: 1, email: "john.doe@example.com", subscribedAt: "2nd Sep, 2025" },
        {
            id: 2,
            email: "jane.smith@example.com",
            subscribedAt: "2nd Sep, 2025",
        },
        {
            id: 3,
            email: "test.user123@gmail.com",
            subscribedAt: "2nd Sep, 2025",
        },
        {
            id: 4,
            email: "fake.email@fakedomain.com",
            subscribedAt: "2nd Sep, 2025",
        },
        { id: 5, email: "notreal@example.net", subscribedAt: "2nd Sep, 2025" },
        {
            id: 6,
            email: "random.email@example.org",
            subscribedAt: "2nd Sep, 2025",
        },
        { id: 7, email: "user42@example.com", subscribedAt: "2nd Sep, 2025" },
        {
            id: 8,
            email: "webmaster@example.org",
            subscribedAt: "2nd Sep, 2025",
        },
        { id: 9, email: "admin@example.net", subscribedAt: "2nd Sep, 2025" },
        {
            id: 10,
            email: "customer.service@example.com",
            subscribedAt: "2nd Sep, 2025",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (id: number) => {
        setSubscribers(subscribers.filter((sub) => sub.id !== id));
    };

    const filteredSubscribers = subscribers.filter((sub) =>
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        Subscribers
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Manage your email subscribers list and send campaigns.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500">
                        <Printer className="w-4 h-4" />
                    </button>
                    <a href="/admin/newsletters/create">
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                            <MailPlus className="w-4 h-4" />
                            Send Mail
                        </button>
                    </a>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-1/3">
                <SearchIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                    type="text"
                    placeholder="Search subscribers by email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#111827] shadow-lg">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-[#1F2937]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                #
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Subscribed At
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredSubscribers.map((sub) => (
                            <tr
                                key={sub.id}
                                className="hover:bg-[#1F2937] transition"
                            >
                                <td className="px-6 py-4 text-white">
                                    {sub.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <a
                                        href={`mailto:${sub.email}`}
                                        className="text-indigo-400 hover:underline"
                                    >
                                        {sub.email}
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-gray-300">
                                    {sub.subscribedAt}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <button
                                        onClick={() => handleDelete(sub.id)}
                                        className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg"
                                        title="Delete Subscriber"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredSubscribers.length === 0 && (
                    <div className="p-6 text-center text-gray-400">
                        No subscribers found.
                    </div>
                )}
            </div>

            {/* Per Page Control */}
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-300">Per Page</span>
                    <select className="border border-gray-600 rounded px-2 py-1 text-sm bg-[#1F2937] text-gray-200">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
