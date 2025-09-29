"use client";

import { useState } from "react";
import { ArrowLeft, Database, Download } from "lucide-react";

export default function DatabaseBackup() {
    const [format, setFormat] = useState("sql");
    const [loading, setLoading] = useState(false);

    const handleExport = (e: React.FormEvent) => {
        e.preventDefault();
        // setLoading(true);

        // Simulate export process
        // setTimeout(() => {
        //     alert(`Database exported as ${format.toUpperCase()} file.`);
        //     setLoading(false);
        // }, 1500);
    };

    return (
        <div className="flex min-h-screen bg-[#111827]">
            <div className="flex-1">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-white">
                            Database Backup
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Export your database in the desired format.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                </div>

                {/* Content */}
                <div className="max-w-lg mx-auto bg-[#1f2937] rounded-lg p-6 shadow-lg">
                    <form onSubmit={handleExport} className="space-y-6">
                        {/* Format Selection */}
                        <div>
                            <label className="block text-gray-300 text-sm mb-2">
                                Format <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={format}
                                onChange={(e) => setFormat(e.target.value)}
                                className="w-full px-4 py-2 rounded bg-[#111827] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="sql">SQL (.sql)</option>
                                <option value="csv">CSV (.csv)</option>
                                <option value="json">JSON (.json)</option>
                            </select>
                        </div>

                        {/* Export Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex items-center gap-2 px-6 py-2 text-white rounded transition ${
                                    loading
                                        ? "bg-indigo-400 cursor-not-allowed"
                                        : "bg-indigo-600 hover:bg-indigo-700"
                                }`}
                            >
                                <Download className="w-4 h-4" />
                                {loading ? "Exporting..." : "Export"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
