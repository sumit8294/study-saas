import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DomainRequestStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";
        const status = searchParams.get("status") || "";

        // Build where clause
        const where: any = {
            isDeleted: false,
        };

        // Add status filter if provided
        if (
            status &&
            Object.values(DomainRequestStatus).includes(
                status as DomainRequestStatus
            )
        ) {
            where.status = status as DomainRequestStatus;
        }

        // Add search filter if provided
        if (search) {
            where.OR = [
                { domain: { contains: search, mode: "insensitive" } },
                {
                    tenant: {
                        OR: [
                            { name: { contains: search, mode: "insensitive" } },
                            {
                                email: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                        ],
                    },
                },
            ];
        }

        const domainRequests = await prisma.tech_domain_requests.findMany({
            where,
            include: {
                tenant: {
                    select: {
                        name: true,
                        email: true,
                        domain: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        const transformedRequests = domainRequests.map((request) => ({
            id: request.id,
            uuid: request.uuid,
            domain: request.domain,
            tenantName: request.tenant?.name || "Unknown Tenant",
            tenantEmail: request.tenant?.email || "No email",
            tenantDomain: request.tenant?.domain || "No domain",
            status: request.status,
            createdAt: request.createdAt,
            updatedAt: request.updatedAt,
        }));

        return NextResponse.json(transformedRequests);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch domain requests" },
            { status: 500 }
        );
    }
}
