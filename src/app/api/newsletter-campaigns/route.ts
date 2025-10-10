import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CampaignStatus, CampaignAudience } from "@prisma/client";

type RecipientData = {
    campaignId: number;
    subscriberId?: number;
    email: string;
};

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const [campaigns, totalCount] = await Promise.all([
            prisma.tech_newsletter_campaigns.findMany({
                where: {
                    isDeleted: false,
                },
                include: {
                    sentByUser: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.tech_newsletter_campaigns.count({
                where: { isDeleted: false },
            }),
        ]);

        const transformedCampaigns = campaigns.map((campaign) => ({
            id: campaign.id,
            uuid: campaign.uuid,
            subject: campaign.subject,
            sentTo: campaign.sentTo,
            greeting: campaign.greeting,
            body: campaign.body,
            status: campaign.status,
            sentBy: campaign.sentByUser?.name || "System",
            sentAt: campaign.sentAt,
            scheduledAt: campaign.scheduledAt,
            recipientCount: campaign.recipientCount,
            openCount: campaign.openCount,
            clickCount: campaign.clickCount,
            createdAt: campaign.createdAt,
            updatedAt: campaign.updatedAt,
        }));

        return NextResponse.json({
            campaigns: transformedCampaigns,
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
            { error: "Failed to fetch campaigns" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { subject, sentTo, greeting, body, scheduledAt } =
            await req.json();

        // Validate required fields
        if (!subject || !sentTo || !greeting || !body) {
            return NextResponse.json(
                { error: "All required fields must be filled" },
                { status: 400 }
            );
        }

        // Get active subscribers count based on audience
        let recipientCount = 0;
        if (sentTo === "ALL_SUBSCRIBERS") {
            recipientCount = await prisma.tech_newsletter_subscribers.count({
                where: { isActive: true, isDeleted: false },
            });
        } else if (sentTo === "TENANTS") {
            recipientCount = await prisma.tech_tenants.count({
                where: { isDeleted: false },
            });
        }

        // Create campaign
        const campaign = await prisma.tech_newsletter_campaigns.create({
            data: {
                subject,
                sentTo: sentTo as CampaignAudience,
                greeting,
                body,
                status: scheduledAt
                    ? CampaignStatus.SCHEDULED
                    : CampaignStatus.DRAFT,
                scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
                recipientCount,
                sentBy: 1, // This should come from your auth context
            },
            include: {
                sentByUser: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        // If it's not scheduled, create recipient records immediately
        if (!scheduledAt) {
            let recipients: RecipientData[] = [];

            if (sentTo === "ALL_SUBSCRIBERS") {
                const subscribers =
                    await prisma.tech_newsletter_subscribers.findMany({
                        where: { isActive: true, isDeleted: false },
                        select: { id: true, email: true },
                    });
                recipients = subscribers.map((subscriber) => ({
                    campaignId: campaign.id,
                    subscriberId: subscriber.id,
                    email: subscriber.email,
                }));
            } else if (sentTo === "TENANTS") {
                const tenants = await prisma.tech_tenants.findMany({
                    where: { isDeleted: false },
                    select: { id: true, email: true },
                });
                recipients = tenants.map((tenant) => ({
                    campaignId: campaign.id,
                    email: tenant.email,
                }));
            }

            if (recipients.length > 0) {
                await prisma.tech_campaign_recipients.createMany({
                    data: recipients,
                });
            }
        }

        return NextResponse.json(campaign, { status: 201 });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to create campaign" },
            { status: 500 }
        );
    }
}
