import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get SMS configuration
export async function GET() {
    try {
        let smsConfig = await prisma.tech_sms_configurations.findFirst();

        // If no configuration exists, create default configuration
        if (!smsConfig) {
            smsConfig = await prisma.tech_sms_configurations.create({
                data: {
                    provider: "twilio",
                    accountSid: "",
                    authToken: "",
                    fromNumber: "",
                    serviceSid: "",
                },
            });
        }

        return NextResponse.json(smsConfig);
    } catch (error) {
        console.error("Error fetching SMS configuration:", error);
        return NextResponse.json(
            { error: "Failed to fetch SMS configuration" },
            { status: 500 }
        );
    }
}

// PUT - Update SMS configuration
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        const data = {
            provider: body.provider || "twilio",
            accountSid: body.accountSid,
            authToken: body.authToken,
            fromNumber: body.fromNumber,
            serviceSid: body.serviceSid,
        };

        const smsConfig = await prisma.tech_sms_configurations.upsert({
            where: { id: body.id || "" },
            update: data,
            create: {
                ...data,
                id: undefined, // Let Prisma generate the ID
            },
        });

        // Don't return the auth token in the response
        const { authToken, ...safeConfig } = smsConfig;

        return NextResponse.json(safeConfig);
    } catch (error) {
        console.error("Error updating SMS configuration:", error);
        return NextResponse.json(
            { error: "Failed to update SMS configuration" },
            { status: 500 }
        );
    }
}
