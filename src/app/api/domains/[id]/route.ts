import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        const domain = await prisma.tech_domains.findUnique({
            where: { id, isDeleted: false },
            include: {
                tenant: {
                    select: {
                        name: true,
                        email: true,
                        domain: true,
                    },
                },
            },
        });

        if (!domain) {
            return NextResponse.json(
                { error: "Domain not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(domain);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch domain" },
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
        const { isActive, isPrimary, verified } = await req.json();

        const updatedDomain = await prisma.tech_domains.update({
            where: { id },
            data: {
                ...(isActive !== undefined && { isActive }),
                ...(isPrimary !== undefined && { isPrimary }),
                ...(verified !== undefined && { verified }),
            },
            include: {
                tenant: {
                    select: {
                        name: true,
                        email: true,
                        domain: true,
                    },
                },
            },
        });

        return NextResponse.json(updatedDomain);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to update domain" },
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

        await prisma.tech_domains.update({
            where: { id },
            data: { isDeleted: true },
        });

        return NextResponse.json(
            { message: "Domain deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to delete domain" },
            { status: 500 }
        );
    }
}
