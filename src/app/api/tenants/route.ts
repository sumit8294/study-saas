import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";

        const tenants = await prisma.tech_tenants.findMany({
            where: {
                isDeleted: false,
                OR: [
                    { domain: { contains: search, mode: "insensitive" } },
                    { name: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                ],
            },
            include: {
                plan: true,
                owner: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Transform the data to match your frontend interface
        const transformedTenants = tenants.map((tenant) => ({
            id: tenant.id,
            domain: tenant.domain,
            name: tenant.name,
            email: tenant.email,
            plan: tenant.plan.name,
            onTrial: tenant.onTrial,
            isVerified: tenant.verified,
            isSubscribed: tenant.subscribed,
            banned: tenant.banned,
            ownerName: tenant.owner.name,
            createdAt: tenant.createdAt,
        }));

        return NextResponse.json(transformedTenants);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch tenants" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const {
            domain,
            name,
            email,
            planId,
            ownerId,
            onTrial = true,
        } = await req.json();

        const tenant = await prisma.tech_tenants.create({
            data: {
                domain,
                name,
                email,
                planId: parseInt(planId),
                ownerId: parseInt(ownerId),
                onTrial,
                verified: false,
                subscribed: false,
                banned: false,
            },
            include: {
                plan: true,
                owner: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(tenant, { status: 201 });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to create tenant" },
            { status: 500 }
        );
    }
}
