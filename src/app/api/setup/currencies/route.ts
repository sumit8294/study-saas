import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get all currencies
export async function GET() {
    try {
        const currencies = await prisma.tech_currencies.findMany({
            orderBy: { createdAt: "desc" },
        });

        // Format the response to match the frontend expectations
        const formattedCurrencies = currencies.map((currency) => ({
            id: currency.id,
            name: currency.name,
            code: currency.code,
            rate: currency.rate,
            symbol: currency.symbol,
            position: currency.position as "left" | "right",
            preview:
                currency.position === "left"
                    ? `${currency.symbol}0.00`
                    : `0.00${currency.symbol}`,
            status: currency.status ? "Active" : "Inactive",
            note: currency.note,
        }));

        return NextResponse.json(formattedCurrencies);
    } catch (error) {
        console.error("Error fetching currencies:", error);
        return NextResponse.json(
            { error: "Failed to fetch currencies" },
            { status: 500 }
        );
    }
}

// POST - Create new currency
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Check if currency code already exists
        const existingCurrency = await prisma.tech_currencies.findUnique({
            where: { code: body.code },
        });

        if (existingCurrency) {
            return NextResponse.json(
                { error: "Currency code already exists" },
                { status: 400 }
            );
        }

        const currency = await prisma.tech_currencies.create({
            data: {
                name: body.name,
                code: body.code.toUpperCase(),
                rate: parseFloat(body.rate),
                symbol: body.symbol,
                position: body.position,
                status: body.status === "active",
                note: body.note,
            },
        });

        return NextResponse.json(currency, { status: 201 });
    } catch (error) {
        console.error("Error creating currency:", error);
        return NextResponse.json(
            { error: "Failed to create currency" },
            { status: 500 }
        );
    }
}
