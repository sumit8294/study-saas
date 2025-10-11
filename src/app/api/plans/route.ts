import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const plans = await prisma.tech_plans.findMany({
            where: {
                isDeleted: false,
            },
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
            orderBy: { id: "asc" },
        });

        // Transform the data to match your frontend interface
        const transformedPlans = plans.map((plan) => ({
            id: plan.id,
            image: plan.image || "/site/no-image.png",
            name: plan.name,
            amount: plan.amount,
            currency: "USD", // Default currency
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
        }));

        return NextResponse.json(transformedPlans);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch plans" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
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

        const plan = await prisma.tech_plans.create({
            data: {
                name,
                amount: parseFloat(amount),
                description,
                limitClients: parseInt(limitClients),
                limitSuppliers: parseInt(limitSuppliers),
                limitEmployees: parseInt(limitEmployees),
                limitDomains: parseInt(limitDomains),
                limitInvoices: parseInt(limitInvoices),
                limitPurchases: parseInt(limitPurchases),
                image,
                pricingFeatures: featureIds
                    ? {
                          connect: featureIds.map((id: number) => ({ id })),
                      }
                    : undefined,
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

        return NextResponse.json(plan, { status: 201 });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to create plan" },
            { status: 500 }
        );
    }
}
