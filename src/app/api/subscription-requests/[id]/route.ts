import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SubscriptionRequestStatus, SubscriptionStatus } from "@prisma/client";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        const subscriptionRequest =
            await prisma.tech_subscription_requests.findUnique({
                where: { id, isDeleted: false },
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
                    reviewedByUser: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                },
            });

        if (!subscriptionRequest) {
            return NextResponse.json(
                { error: "Subscription request not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(subscriptionRequest);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch subscription request" },
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
        const { status, adminNotes, reviewedBy } = await req.json();

        // Validate status
        if (!Object.values(SubscriptionRequestStatus).includes(status)) {
            return NextResponse.json(
                { error: "Invalid status" },
                { status: 400 }
            );
        }

        const updatedRequest = await prisma.tech_subscription_requests.update({
            where: { id },
            data: {
                status: status as SubscriptionRequestStatus,
                adminNotes,
                reviewedBy: reviewedBy ? parseInt(reviewedBy) : null,
                reviewedAt: new Date(),
            },
            include: {
                tenant: {
                    select: {
                        domain: true,
                        name: true,
                        email: true,
                        id: true,
                    },
                },
                plan: {
                    select: {
                        name: true,
                        amount: true,
                        id: true,
                    },
                },
                reviewedByUser: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        // If approved, create a subscription and update tenant
        if (status === "APPROVED") {
            const startsAt = new Date();
            const endsAt = new Date();
            endsAt.setMonth(endsAt.getMonth() + 1); // 1 month subscription

            // Create subscription
            await prisma.tech_subscriptions.create({
                data: {
                    tenantId: updatedRequest.tenantId,
                    planId: updatedRequest.planId,
                    month: updatedRequest.month,
                    approvedBy: updatedRequest.reviewedBy,
                    startsAt,
                    endsAt,
                    status: SubscriptionStatus.ACTIVE,
                },
            });

            // Update tenant subscription status
            await prisma.tech_tenants.update({
                where: { id: updatedRequest.tenantId },
                data: {
                    subscribed: true,
                    onTrial: false,
                    verified: true,
                },
            });
        }

        return NextResponse.json(updatedRequest);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to update subscription request" },
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

        await prisma.tech_subscription_requests.update({
            where: { id },
            data: { isDeleted: true },
        });

        return NextResponse.json(
            { message: "Subscription request deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to delete subscription request" },
            { status: 500 }
        );
    }
}
