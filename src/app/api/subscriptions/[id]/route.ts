import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SubscriptionStatus } from "@prisma/client";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        const subscription = await prisma.tech_subscriptions.findUnique({
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
                approvedByUser: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!subscription) {
            return NextResponse.json(
                { error: "Subscription not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(subscription);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch subscription" },
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
        const { status, autoRenew, endsAt } = await req.json();

        const updatedSubscription = await prisma.tech_subscriptions.update({
            where: { id },
            data: {
                ...(status && { status: status as SubscriptionStatus }),
                ...(autoRenew !== undefined && { autoRenew }),
                ...(endsAt && { endsAt: new Date(endsAt) }),
            },
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
                approvedByUser: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(updatedSubscription);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to update subscription" },
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

        await prisma.tech_subscriptions.update({
            where: { id },
            data: { isDeleted: true },
        });

        return NextResponse.json(
            { message: "Subscription deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to delete subscription" },
            { status: 500 }
        );
    }
}
