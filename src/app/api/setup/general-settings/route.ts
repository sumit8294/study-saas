import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get general settings
export async function GET() {
    try {
        let settings = await prisma.tech_general_settings.findFirst();

        // If no settings exist, create default settings
        if (!settings) {
            settings = await prisma.tech_general_settings.create({
                data: {
                    companyName: "",
                    companyTagline: "",
                    emailAddress: "",
                    phoneNumber: "",
                    address: "",
                    yearlyPlanDiscount: 0,
                    trialDayCount: 14,
                    defaultLanguage: "en",
                    defaultCurrency: "USD",
                    copyrightText: "",
                    facebookLink: "",
                    instagramLink: "",
                    twitterLink: "",
                    linkedinLink: "",
                    whiteLogo: "",
                    blackLogo: "",
                    smallLogo: "",
                    favicon: "",
                    emailOtpVerification: false,
                },
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Error fetching general settings:", error);
        return NextResponse.json(
            { error: "Failed to fetch general settings" },
            { status: 500 }
        );
    }
}

// PUT - Update general settings
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        // Convert string values to appropriate types
        const data = {
            companyName: body.companyName,
            companyTagline: body.companyTagline,
            emailAddress: body.email,
            phoneNumber: body.phone,
            address: body.address,
            yearlyPlanDiscount: body.yearlyPlanDiscount
                ? parseFloat(body.yearlyPlanDiscount)
                : 0,
            trialDayCount: parseInt(body.trialDayCount) || 14,
            defaultLanguage: body.defaultLanguage || "en",
            defaultCurrency: body.defaultCurrency,
            copyrightText: body.copyrightText,
            facebookLink: body.facebookLink,
            instagramLink: body.instagramLink,
            twitterLink: body.twitterLink,
            linkedinLink: body.linkedinLink,
            emailOtpVerification: body.emailOtpVerification,
            whiteLogo: body.whiteLogo,
            blackLogo: body.blackLogo,
            smallLogo: body.smallLogo,
            favicon: body.favicon,
        };

        const settings = await prisma.tech_general_settings.upsert({
            where: { id: body.id || "" },
            update: data,
            create: {
                ...data,
                id: undefined, // Let Prisma generate the ID
            },
        });

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Error updating general settings:", error);
        return NextResponse.json(
            { error: "Failed to update general settings" },
            { status: 500 }
        );
    }
}
