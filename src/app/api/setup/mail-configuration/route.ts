import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get mail configuration
export async function GET() {
    try {
        let mailConfig = await prisma.tech_mail_configurations.findFirst();

        // If no configuration exists, create default configuration
        if (!mailConfig) {
            mailConfig = await prisma.tech_mail_configurations.create({
                data: {
                    mailer: "smtp",
                    host: "",
                    port: "587",
                    username: "",
                    password: "",
                    encryption: "tls",
                    fromAddress: "",
                    fromName: "",
                },
            });
        }

        return NextResponse.json(mailConfig);
    } catch (error) {
        console.error("Error fetching mail configuration:", error);
        return NextResponse.json(
            { error: "Failed to fetch mail configuration" },
            { status: 500 }
        );
    }
}

// PUT - Update mail configuration
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        const data = {
            mailer: body.mailMailer,
            host: body.mailHost,
            port: body.mailPort,
            username: body.mailUsername,
            password: body.mailPassword,
            encryption: body.mailEncryption,
            fromAddress: body.mailFromAddress,
            fromName: body.mailFromName,
        };

        const mailConfig = await prisma.tech_mail_configurations.upsert({
            where: { id: body.id || "" },
            update: data,
            create: {
                ...data,
                id: undefined, // Let Prisma generate the ID
            },
        });

        return NextResponse.json(mailConfig);
    } catch (error) {
        console.error("Error updating mail configuration:", error);
        return NextResponse.json(
            { error: "Failed to update mail configuration" },
            { status: 500 }
        );
    }
}
