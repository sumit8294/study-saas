"use client";

import React from "react";

type InfoRowProps = {
    label: string;
    value: string | JSX.Element;
};

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
    <div className="flex border-b border-gray-700">
        <div className="w-1/3 bg-[#1f2937] text-gray-300 px-4 py-2 font-medium">
            {label}
        </div>
        <div className="w-2/3 bg-[#111827] text-gray-200 px-4 py-2 break-words">
            {value}
        </div>
    </div>
);

export default function SystemInfoPage() {
    return (
        <div className="min-h-screen">
            <div className="max-w-6xl bg-[#1f2937] border border-gray-700 rounded shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gray-800 text-white text-lg font-semibold px-6 py-4 flex justify-between items-center">
                    <span>System Information</span>
                    <span className="bg-indigo-600 px-3 py-1 rounded text-sm">
                        Next.js v14.0
                    </span>
                </div>

                {/* Info Section */}
                <div className="border-t border-gray-700">
                    <InfoRow label="Framework" value="Next.js 14 + React 18" />
                    <InfoRow label="Language" value="TypeScript" />
                    <InfoRow label="Database" value="PostgreSQL" />
                    <InfoRow label="ORM" value="Prisma" />
                    <InfoRow
                        label="Build Date"
                        value={new Date().toUTCString()}
                    />
                    <InfoRow
                        label="Node.js Version"
                        value={process.version || "v18.18.0"}
                    />
                    <InfoRow
                        label="Server OS"
                        value="Linux Ubuntu 22.04 LTS (Dummy Data)"
                    />
                    <InfoRow
                        label="Deployed Server"
                        value="Vercel Edge Network"
                    />
                    <InfoRow
                        label="Environment Variables Loaded"
                        value="NEXT_PUBLIC_API_URL, DATABASE_URL, NEXTAUTH_SECRET"
                    />
                    <InfoRow
                        label="Database Schema Path"
                        value="/prisma/schema.prisma"
                    />
                    <InfoRow
                        label="Prisma Client Path"
                        value="/node_modules/.prisma/client"
                    />
                    <InfoRow
                        label="Database Connection String"
                        value={
                            <span className="font-mono">
                                postgresql://user:password@localhost:5432/mydb
                            </span>
                        }
                    />
                    <InfoRow
                        label="Tailwind Config Path"
                        value="/tailwind.config.js"
                    />
                    <InfoRow
                        label="Loaded Packages"
                        value="next, react, prisma, tailwindcss, lucide-react, axios"
                    />
                </div>
            </div>
        </div>
    );
}
