import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";
        const status = searchParams.get("status") || "";
        const date = searchParams.get("date") || "";

        // Build where clause
        const where: any = {
            isDeleted: false,
        };

        // Add status filter if provided
        if (
            status &&
            Object.values(PaymentStatus).includes(status as PaymentStatus)
        ) {
            where.paymentStatus = status as PaymentStatus;
        }

        // Add date filter if provided
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);

            where.createdAt = {
                gte: startDate,
                lt: endDate,
            };
        }

        // Add search filter if provided
        if (search) {
            where.OR = [
                { trxId: { contains: search, mode: "insensitive" } },
                { transactionType: { contains: search, mode: "insensitive" } },
                {
                    tenant: {
                        OR: [
                            {
                                domain: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                            { name: { contains: search, mode: "insensitive" } },
                        ],
                    },
                },
                {
                    plan: {
                        name: { contains: search, mode: "insensitive" },
                    },
                },
            ];
        }

        const payments = await prisma.tech_payments.findMany({
            where,
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
            },
            orderBy: { createdAt: "desc" },
        });

        const transformedPayments = payments.map((payment) => ({
            id: payment.id,
            uuid: payment.uuid,
            tenantDomain: payment.tenant.domain,
            tenantName: payment.tenant.name,
            planName: payment.plan.name,
            planAmount: payment.plan.amount,
            month: payment.month,
            transactionType: payment.transactionType,
            trxId: payment.trxId,
            amount: payment.amount,
            paymentStatus: payment.paymentStatus,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
        }));

        return NextResponse.json(transformedPayments);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch payments" },
            { status: 500 }
        );
    }
}
