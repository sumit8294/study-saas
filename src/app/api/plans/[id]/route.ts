import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        const plan = await prisma.tech_plans.findUnique({
            where: { id, isDeleted: false },
            include: {
                pricingFeatures: {
                    where: {
                        isDeleted: false,
                    },
                    select: {
                        id: true,
                        name: true,
                    },
                },
                _count: {
                    select: {
                        tenants: {
                            where: {
                                isDeleted: false,
                            },
                        },
                    },
                },
            },
        });

        if (!plan) {
            return NextResponse.json(
                { error: "Plan not found" },
                { status: 404 }
            );
        }

        const transformedPlan = {
            id: plan.id,
            image: plan.image || "/site/no-image.png",
            name: plan.name,
            amount: plan.amount,
            currency: "USD",
            description: plan.description || "No description available",
            limitClients: plan.limitClients,
            limitSuppliers: plan.limitSuppliers,
            limitEmployees: plan.limitEmployees,
            limitDomains: plan.limitDomains,
            limitInvoices: plan.limitInvoices,
            limitPurchases: plan.limitPurchases,
            features: plan.pricingFeatures,
            tenantCount: plan._count.tenants,
            createdAt: plan.createdAt,
        };

        return NextResponse.json(transformedPlan);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch plan" },
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
        const {
            name,
            amount,
            description,
            limitClients,
            limitSuppliers,
            limitEmployees,
            limitDomains,
            limitInvoices,
            limitPurchases,
            image,
            featureIds,
        } = await req.json();

        const updatedPlan = await prisma.tech_plans.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(amount && { amount: parseFloat(amount) }),
                ...(description !== undefined && { description }),
                ...(limitClients && { limitClients: parseInt(limitClients) }),
                ...(limitSuppliers && {
                    limitSuppliers: parseInt(limitSuppliers),
                }),
                ...(limitEmployees && {
                    limitEmployees: parseInt(limitEmployees),
                }),
                ...(limitDomains && { limitDomains: parseInt(limitDomains) }),
                ...(limitInvoices && {
                    limitInvoices: parseInt(limitInvoices),
                }),
                ...(limitPurchases && {
                    limitPurchases: parseInt(limitPurchases),
                }),
                ...(image !== undefined && { image }),
                ...(featureIds && {
                    pricingFeatures: {
                        set: featureIds.map((id: number) => ({ id })),
                    },
                }),
            },
            include: {
                pricingFeatures: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json(updatedPlan);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to update plan" },
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

        // Soft delete by setting isDeleted to true
        await prisma.tech_plans.update({
            where: { id },
            data: { isDeleted: true },
        });

        return NextResponse.json(
            { message: "Plan deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to delete plan" },
            { status: 500 }
        );
    }
}
