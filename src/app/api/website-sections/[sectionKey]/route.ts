import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper function to get model by section key
function getElementModel(sectionKey: string) {
    const modelMap: Record<string, any> = {
        why_us: prisma.tech_why_us_elements,
        features: prisma.tech_feature_elements,
        explorers: prisma.tech_explorer_elements,
        all_features: prisma.tech_all_feature_elements,
        software_overview: prisma.tech_software_elements,
        testimonial: prisma.tech_testimonial_elements,
        brands: prisma.tech_brand_elements,
    };
    return modelMap[sectionKey];
}

// GET - Get section data
export async function GET(
    request: NextRequest,
    { params }: { params: { sectionKey: string } }
) {
    try {
        const { sectionKey } = params;

        const section = await prisma.tech_website_sections.findUnique({
            where: { section_key: sectionKey },
        });

        if (!section) {
            return NextResponse.json({
                section: null,
                message: "Section not found, will be created on first update",
            });
        }

        return NextResponse.json({
            section: {
                id: section.id,
                content: section.content,
                show_on_landing: section.show_on_landing,
                status: section.status,
            },
        });
    } catch (error) {
        console.error("Error fetching section:", error);
        return NextResponse.json(
            { error: "Failed to fetch section" },
            { status: 500 }
        );
    }
}

// PUT - Update section content
export async function PUT(
    request: NextRequest,
    { params }: { params: { sectionKey: string } }
) {
    try {
        const { sectionKey } = params;
        const body = await request.json();

        const section = await prisma.tech_website_sections.upsert({
            where: { section_key: sectionKey },
            update: {
                content: body.content,
                show_on_landing: body.showOnLanding,
                status: body.status,
                version: { increment: 1 },
            },
            create: {
                section_key: sectionKey,
                section_name: getSectionName(sectionKey),
                content: body.content,
                show_on_landing: body.showOnLanding ?? true,
                status: "ACTIVE",
                order_index: getDefaultOrder(sectionKey),
            },
        });

        return NextResponse.json(section);
    } catch (error) {
        console.error("Error updating section:", error);
        return NextResponse.json(
            { error: "Failed to update section" },
            { status: 500 }
        );
    }
}

// Helper functions
function getSectionName(sectionKey: string): string {
    const names: Record<string, string> = {
        hero: "Hero",
        about_us: "About Us",
        why_us: "Why Us",
        business_start: "Business Start",
        features: "Features",
        explorers: "Explorers",
        all_features: "All Features",
        cta: "CTA Section",
        software_overview: "Software Overview",
        pricing_plan: "Pricing Plan",
        testimonial: "Testimonial",
        brands: "Brands",
        newsletter: "Newsletter",
        custom_html: "Custom HTML",
    };
    return names[sectionKey] || sectionKey;
}

function getDefaultOrder(sectionKey: string): number {
    const orders: Record<string, number> = {
        hero: 1,
        about_us: 2,
        why_us: 3,
        business_start: 4,
        features: 5,
        explorers: 6,
        all_features: 7,
        cta: 8,
        software_overview: 9,
        pricing_plan: 10,
        testimonial: 11,
        brands: 12,
        newsletter: 13,
        custom_html: 14,
    };
    return orders[sectionKey] || 99;
}
