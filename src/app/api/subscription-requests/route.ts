import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SubscriptionRequestStatus } from "@prisma/client";

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
            Object.values(SubscriptionRequestStatus).includes(
                status as SubscriptionRequestStatus
            )
        ) {
            where.status = status as SubscriptionRequestStatus;
        }

        // Add search filter if provided
        if (search) {
            where.OR = [
                { transactionId: { contains: search, mode: "insensitive" } },
                {
                    tenant: {
                        OR: [
                            {
                                domain: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                            { name: { contains: search, mode: "insensitive" } },
                        ],
                    },
                },
                {
                    plan: {
                        name: { contains: search, mode: "insensitive" },
                    },
                },
            ];
        }

        const subscriptionRequests =
            await prisma.tech_subscription_requests.findMany({
                where,
                include: {
                    tenant: {
                        select: {
                            domain: true,
                            name: true,
                            email: true,
                        },
                    },
                    plan: {
                        select: {
                            name: true,
                            amount: true,
                        },
                    },
                    reviewedByUser: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: { requestedAt: "desc" },
            });

        const transformedRequests = subscriptionRequests.map((request) => ({
            id: request.id,
            uuid: request.uuid,
            tenantDomain: request.tenant.domain,
            tenantName: request.tenant.name,
            transactionId: request.transactionId,
            documentPath: request.documentPath,
            planName: request.plan.name,
            planPrice: request.plan.amount,
            month: request.month,
            status: request.status,
            requestedAt: request.requestedAt,
            reviewedBy: request.reviewedByUser?.name || "N/A",
            adminNotes: request.adminNotes,
        }));

        return NextResponse.json(transformedRequests);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch subscription requests" },
            { status: 500 }
        );
    }
}
