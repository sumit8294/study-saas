import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        // Build where clause
        const where: any = {
            isDeleted: false,
        };

        // Add search filter if provided
        if (search) {
            where.email = {
                contains: search,
                mode: "insensitive",
            };
        }

        const [subscribers, totalCount] = await Promise.all([
            prisma.tech_newsletter_subscribers.findMany({
                where,
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
                orderBy: { subscribedAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.tech_newsletter_subscribers.count({ where }),
        ]);

        const transformedSubscribers = subscribers.map((subscriber) => ({
            id: subscriber.id,
            uuid: subscriber.uuid,
            email: subscriber.email,
            isActive: subscriber.isActive,
            subscribedAt: subscriber.subscribedAt,
            source: subscriber.source || "Unknown",
            createdAt: subscriber.createdAt,
            updatedAt: subscriber.updatedAt,
        }));

        return NextResponse.json({
            subscribers: transformedSubscribers,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalCount,
                hasNext: page < Math.ceil(totalCount / limit),
                hasPrev: page > 1,
            },
        });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch subscribers" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { email, source } = await req.json();

        // Validate email
        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Valid email is required" },
                { status: 400 }
            );
        }

        const subscriber = await prisma.tech_newsletter_subscribers.create({
            data: {
                email,
                source: source || "admin",
                isActive: true,
            },
        });

        return NextResponse.json(subscriber, { status: 201 });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to create subscriber" },
            { status: 500 }
        );
    }
}
