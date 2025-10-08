import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        const payment = await prisma.tech_payments.findUnique({
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
            },
        });

        if (!payment) {
            return NextResponse.json(
                { error: "Payment not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(payment);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch payment" },
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
        const { paymentStatus, transactionType, amount, month } =
            await req.json();

        const updatedPayment = await prisma.tech_payments.update({
            where: { id },
            data: {
                ...(paymentStatus && {
                    paymentStatus: paymentStatus as PaymentStatus,
                }),
                ...(transactionType && { transactionType }),
                ...(amount && { amount: parseFloat(amount) }),
                ...(month && { month }),
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
            },
        });

        return NextResponse.json(updatedPayment);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to update payment" },
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

        await prisma.tech_payments.update({
            where: { id },
            data: { isDeleted: true },
        });

        return NextResponse.json(
            { message: "Payment deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to delete payment" },
            { status: 500 }
        );
    }
}
