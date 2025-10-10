import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get single currency
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const currency = await prisma.tech_currencies.findUnique({
            where: { id },
        });

        if (!currency) {
            return NextResponse.json(
                { error: "Currency not found" },
                { status: 404 }
            );
        }

        // Format the response
        const formattedCurrency = {
            id: currency.id,
            name: currency.name,
            code: currency.code,
            rate: currency.rate,
            symbol: currency.symbol,
            position: currency.position,
            status: currency.status ? "active" : "inactive",
            note: currency.note,
        };

        return NextResponse.json(formattedCurrency);
    } catch (error) {
        console.error("Error fetching currency:", error);
        return NextResponse.json(
            { error: "Failed to fetch currency" },
            { status: 500 }
        );
    }
}

// PUT - Update currency
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();

        // Check if currency exists
        const existingCurrency = await prisma.tech_currencies.findUnique({
            where: { id },
        });

        if (!existingCurrency) {
            return NextResponse.json(
                { error: "Currency not found" },
                { status: 404 }
            );
        }

        // Check if code is being changed and if it already exists
        if (body.code && body.code !== existingCurrency.code) {
            const codeExists = await prisma.tech_currencies.findUnique({
                where: { code: body.code.toUpperCase() },
            });

            if (codeExists) {
                return NextResponse.json(
                    { error: "Currency code already exists" },
                    { status: 400 }
                );
            }
        }

        const currency = await prisma.tech_currencies.update({
            where: { id },
            data: {
                name: body.name,
                code: body.code?.toUpperCase(),
                rate: body.rate ? parseFloat(body.rate) : undefined,
                symbol: body.symbol,
                position: body.position,
                status: body.status === "active",
                note: body.note,
            },
        });

        return NextResponse.json(currency);
    } catch (error) {
        console.error("Error updating currency:", error);
        return NextResponse.json(
            { error: "Failed to update currency" },
            { status: 500 }
        );
    }
}

// DELETE - Delete currency
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        // Check if currency exists
        const existingCurrency = await prisma.tech_currencies.findUnique({
            where: { id },
        });

        if (!existingCurrency) {
            return NextResponse.json(
                { error: "Currency not found" },
                { status: 404 }
            );
        }

        await prisma.tech_currencies.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Currency deleted successfully" });
    } catch (error) {
        console.error("Error deleting currency:", error);
        return NextResponse.json(
            { error: "Failed to delete currency" },
            { status: 500 }
        );
    }
}
