"use client";

import { useState } from "react";

export default function UpdateApplication() {
    const [isUpToDate, setIsUpToDate] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleCheckForUpdate = () => {
        setLoading(true);
        // Simulate checking for updates
        setTimeout(() => {
            setIsUpToDate(true); // you can make it false to test the "update available" UI
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="flex min-h-screen bg-[#111827] ">
            <div className="flex-1">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-white">
                            Update Application
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Manage Application Updates.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col items-center">
                    {isUpToDate ? (
                        <div className="w-full bg-green-600 text-white text-center py-3 rounded mb-6">
                            Your application is up to date
                        </div>
                    ) : (
                        <div className="w-full bg-yellow-500 text-white text-center py-3 rounded mb-6">
                            A new update is available!
                        </div>
                    )}

                    <button
                        onClick={handleCheckForUpdate}
                        disabled={loading}
                        className={`px-6 py-2 text-lg font-medium text-white rounded transition-colors duration-300 ${
                            loading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                        {loading ? "Checking..." : "Check for Update"}
                    </button>
                </div>
            </div>
        </div>
    );
}
