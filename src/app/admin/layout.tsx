"use client";

import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-[#111827]">
            {/* Sidebar */}
            <div
                className={`fixed lg:relative z-40 transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-64 w-0"
                }`}
            >
                <Sidebar />
            </div>

            {/* Main Content */}
            <div
                className={`transition-all duration-300 flex-1 ${
                    isSidebarOpen ? "lg:ml-0" : "lg:ml-0"
                }`}
            >
                <Navbar
                    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    isSidebarOpen={isSidebarOpen}
                />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
