import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DomainRequestStatus } from "@prisma/client";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        const domainRequest = await prisma.tech_domain_requests.findUnique({
            where: { id, isDeleted: false },
            include: {
                tenant: {
                    select: {
                        name: true,
                        email: true,
                        domain: true,
                        id: true,
                    },
                },
            },
        });

        if (!domainRequest) {
            return NextResponse.json(
                { error: "Domain request not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(domainRequest);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch domain request" },
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
        const { status } = await req.json();

        // Validate status
        if (!Object.values(DomainRequestStatus).includes(status)) {
            return NextResponse.json(
                { error: "Invalid status" },
                { status: 400 }
            );
        }

        const updatedRequest = await prisma.tech_domain_requests.update({
            where: { id },
            data: {
                status: status as DomainRequestStatus,
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

        // If approved/connected and tenant exists, create a domain record
        if (
            (status === "APPROVED" || status === "CONNECTED") &&
            updatedRequest.tenantId
        ) {
            const existingDomain = await prisma.tech_domains.findFirst({
                where: {
                    domain: updatedRequest.domain,
                    isDeleted: false,
                },
            });

            if (!existingDomain) {
                await prisma.tech_domains.create({
                    data: {
                        domain: updatedRequest.domain,
                        tenantId: updatedRequest.tenantId,
                        isActive: true,
                        isPrimary: false,
                        verified: status === "CONNECTED",
                    },
                });
            }
        }

        return NextResponse.json(updatedRequest);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to update domain request" },
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

        await prisma.tech_domain_requests.update({
            where: { id },
            data: { isDeleted: true },
        });

        return NextResponse.json(
            { message: "Domain request deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to delete domain request" },
            { status: 500 }
        );
    }
}
