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
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleToggleCollapse = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="flex h-screen bg-[#111827]">
            {/* Sidebar */}
            <div
                className={`fixed relative z-40 transition-all duration-300 ease-in-out ${
                    isSidebarOpen
                        ? isSidebarCollapsed
                            ? "translate-x-0 w-16"
                            : "translate-x-0 w-64"
                        : "-translate-x-full w-0"
                }`}
            >
                <Sidebar
                    isCollapsed={isSidebarCollapsed}
                    onToggle={handleToggleCollapse}
                />
            </div>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 `}>
                <Navbar
                    onToggleSidebar={handleToggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                />
                <main className="p-6 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
