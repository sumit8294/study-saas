import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get all permissions grouped by category
export async function GET() {
    try {
        const permissions = await prisma.tech_permissions.findMany({
            orderBy: [{ category: "asc" }, { name: "asc" }],
        });

        // Group permissions by category
        const groupedPermissions = permissions.reduce((acc, permission) => {
            const category = permission.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(permission);
            return acc;
        }, {} as Record<string, typeof permissions>);

        return NextResponse.json(groupedPermissions);
    } catch (error) {
        console.error("Error fetching permissions:", error);
        return NextResponse.json(
            { error: "Failed to fetch permissions" },
            { status: 500 }
        );
    }
}
