import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";

        // Build where clause
        const where: any = {
            isDeleted: false,
        };

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

        const domains = await prisma.tech_domains.findMany({
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

        const transformedDomains = domains.map((domain) => ({
            id: domain.id,
            uuid: domain.uuid,
            domain: domain.domain,
            tenantName: domain.tenant.name,
            tenantEmail: domain.tenant.email,
            tenantDomain: domain.tenant.domain,
            isActive: domain.isActive,
            isPrimary: domain.isPrimary,
            verified: domain.verified,
            createdAt: domain.createdAt,
            updatedAt: domain.updatedAt,
        }));

        return NextResponse.json(transformedDomains);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch domains" },
            { status: 500 }
        );
    }
}
