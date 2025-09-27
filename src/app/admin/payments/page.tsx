"use client";

import { useState } from "react";
import { CalendarIcon, SearchIcon, FileDown, FileText } from "lucide-react";

interface Payment {
    id: number;
    plan: string;
    month: string;
    transactionType: string;
    transactionId: string;
    amount: number;
    status: "Paid" | "Pending" | "Failed";
    createdAt: string;
}

export default function PaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>([
        {
            id: 1,
            plan: "Pro Plan",
            month: "September 2025",
            transactionType: "Credit Card",
            transactionId: "TRX123456",
            amount: 499,
            status: "Paid",
            createdAt: "2025-09-15",
        },
        {
            id: 2,
            plan: "Basic Plan",
            month: "September 2025",
            transactionType: "PayPal",
            transactionId: "TRX987654",
            amount: 199,
            status: "Pending",
            createdAt: "2025-09-18",
        },
        {
            id: 3,
            plan: "Enterprise Plan",
            month: "August 2025",
            transactionType: "Bank Transfer",
            transactionId: "TRX567890",
            amount: 1299,
            status: "Failed",
            createdAt: "2025-08-25",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (id: number) => {
        setPayments(payments.filter((payment) => payment.id !== id));
    };

    const filteredPayments = payments.filter(
        (payment) =>
            payment.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.transactionId
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            payment.transactionType
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        Payments
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Manage all payment transactions and statuses.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                        <FileText className="w-4 h-4" />
                        Export PDF
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
                        <FileDown className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Search Bar */}
                <div className="relative w-full md:w-1/3">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search by plan, transaction type, or ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>

                {/* Date Filter */}
                <div className="relative w-full md:w-1/4">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        type="date"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#111827] shadow-lg">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-[#1F2937]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Plan
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Month
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Transaction Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Trx ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Payment Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Created At
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredPayments.map((payment) => (
                            <tr
                                key={payment.id}
                                className="hover:bg-[#1F2937] transition"
                            >
                                {/* ID */}
                                <td className="px-6 py-4 whitespace-nowrap text-white">
                                    {payment.id}
                                </td>

                                {/* Plan */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {payment.plan}
                                </td>

                                {/* Month */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {payment.month}
                                </td>

                                {/* Transaction Type */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {payment.transactionType}
                                </td>

                                {/* Trx ID */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    {payment.transactionId}
                                </td>

                                {/* Amount */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                    ${payment.amount}
                                </td>

                                {/* Payment Status */}
                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            payment.status === "Paid"
                                                ? "bg-green-600/20 text-green-400"
                                                : payment.status === "Pending"
                                                ? "bg-yellow-600/20 text-yellow-400"
                                                : "bg-red-600/20 text-red-400"
                                        }`}
                                    >
                                        {payment.status}
                                    </span>
                                </td>

                                {/* Created At */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                                    {payment.createdAt}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                                    <a
                                        href={`/admin/payments/edit/${payment.id}`}
                                    >
                                        <button className="text-indigo-400 hover:text-indigo-300 font-medium">
                                            Edit
                                        </button>
                                    </a>
                                    <button
                                        onClick={() => handleDelete(payment.id)}
                                        className="text-red-400 hover:text-red-300 font-medium"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredPayments.length === 0 && (
                    <div className="p-6 text-center text-gray-400">
                        No payments found.
                    </div>
                )}
            </div>
        </div>
    );
}
