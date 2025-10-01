import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        const tenant = await prisma.tech_tenants.findUnique({
            where: { id, isDeleted: false },
            include: {
                plan: true,
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!tenant) {
            return NextResponse.json(
                { error: "Tenant not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(tenant);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch tenant" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const {
            domain,
            name,
            email,
            planId,
            onTrial,
            verified,
            subscribed,
            banned,
        } = await req.json();

        const updatedTenant = await prisma.tech_tenants.update({
            where: { id },
            data: {
                ...(domain && { domain }),
                ...(name && { name }),
                ...(email && { email }),
                ...(planId && { planId: parseInt(planId) }),
                ...(onTrial !== undefined && { onTrial }),
                ...(verified !== undefined && { verified }),
                ...(subscribed !== undefined && { subscribed }),
                ...(banned !== undefined && { banned }),
            },
            include: {
                plan: true,
                owner: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(updatedTenant);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to update tenant" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        // Soft delete by setting isDeleted to true
        await prisma.tech_tenants.update({
            where: { id },
            data: { isDeleted: true },
        });

        return NextResponse.json(
            { message: "Tenant deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to delete tenant" },
            { status: 500 }
        );
    }
}
