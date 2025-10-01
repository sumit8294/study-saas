import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const features = await prisma.tech_plan_features.findMany({
        include: { plans: true }, // include linked plans
    });
    return NextResponse.json(features);
}

export async function POST(req: NextRequest) {
    const { name, planIds } = await req.json();
    const feature = await prisma.tech_plan_features.create({
        data: {
            name,
            plans: { connect: planIds.map((id: number) => ({ id })) }, // link plans
        },
    });
    return NextResponse.json(feature, { status: 201 });
}
