import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        const subscriber = await prisma.tech_newsletter_subscribers.findUnique({
            where: { id, isDeleted: false },
            select: {
                id: true,
                uuid: true,
                email: true,
                isActive: true,
                subscribedAt: true,
                source: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!subscriber) {
            return NextResponse.json(
                { error: "Subscriber not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(subscriber);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch subscriber" },
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
        const { isActive } = await req.json();

        const updatedSubscriber =
            await prisma.tech_newsletter_subscribers.update({
                where: { id },
                data: {
                    isActive,
                    ...(isActive === false && { unsubscribedAt: new Date() }),
                },
            });

        return NextResponse.json(updatedSubscriber);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to update subscriber" },
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

        await prisma.tech_newsletter_subscribers.update({
            where: { id },
            data: {
                isDeleted: true,
                isActive: false,
                unsubscribedAt: new Date(),
            },
        });

        return NextResponse.json(
            { message: "Subscriber deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to delete subscriber" },
            { status: 500 }
        );
    }
}
