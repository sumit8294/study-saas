import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";

export const metadata = {
    title: "Admin Panel",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-[#111827]">
            <div className="w-64 flex-shrink-0">
                {" "}
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="p-6 flex-1 w-full overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
