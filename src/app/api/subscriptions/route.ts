import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SubscriptionStatus } from "@prisma/client";

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
            Object.values(SubscriptionStatus).includes(
                status as SubscriptionStatus
            )
        ) {
            where.status = status as SubscriptionStatus;
        }

        // Add search filter if provided
        if (search) {
            where.OR = [
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
                { month: { contains: search, mode: "insensitive" } },
            ];
        }

        const subscriptions = await prisma.tech_subscriptions.findMany({
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
                        description: true,
                    },
                },
                approvedByUser: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        const transformedSubscriptions = subscriptions.map((subscription) => ({
            id: subscription.id,
            uuid: subscription.uuid,
            tenantDomain: subscription.tenant.domain,
            tenantName: subscription.tenant.name,
            tenantEmail: subscription.tenant.email,
            planName: subscription.plan.name,
            planPrice: subscription.plan.amount,
            month: subscription.month,
            status: subscription.status,
            approvedBy: subscription.approvedByUser?.name || "System",
            startsAt: subscription.startsAt,
            endsAt: subscription.endsAt,
            createdAt: subscription.createdAt,
            autoRenew: subscription.autoRenew,
        }));

        return NextResponse.json(transformedSubscriptions);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch subscriptions" },
            { status: 500 }
        );
    }
}
