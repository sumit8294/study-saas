import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id);
    const { name, planIds } = await req.json();

    const updated = await prisma.tech_plan_features.update({
        where: { id },
        data: {
            name,
            plans: { set: planIds.map((id: number) => ({ id })) }, // replace linked plans
        },
    });

    return NextResponse.json(updated);
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id);
    await prisma.tech_plan_features.delete({ where: { id } });
    return NextResponse.json(
        { message: "Deleted successfully" },
        { status: 200 }
    );
}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id);
    const feature = await prisma.tech_plan_features.findUnique({
        where: { id },
        include: { plans: true },
    });
    return NextResponse.json(feature);
}
