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

// GET - Get all elements for a section
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
            return NextResponse.json([]);
        }

        const elementModel = getElementModel(sectionKey);
        if (!elementModel) {
            return NextResponse.json(
                { error: "This section does not support elements" },
                { status: 400 }
            );
        }

        const elements = await elementModel.findMany({
            where: {
                section_id: section.id,
                is_deleted: false,
            },
            orderBy: { order_index: "asc" },
        });

        return NextResponse.json(elements);
    } catch (error) {
        console.error("Error fetching elements:", error);
        return NextResponse.json(
            { error: "Failed to fetch elements" },
            { status: 500 }
        );
    }
}

// POST - Create new element
export async function POST(
    request: NextRequest,
    { params }: { params: { sectionKey: string } }
) {
    try {
        const { sectionKey } = params;
        const body = await request.json();

        const section = await prisma.tech_website_sections.findUnique({
            where: { section_key: sectionKey },
        });

        if (!section) {
            return NextResponse.json(
                { error: "Section not found" },
                { status: 404 }
            );
        }

        const elementModel = getElementModel(sectionKey);
        if (!elementModel) {
            return NextResponse.json(
                { error: "This section does not support elements" },
                { status: 400 }
            );
        }

        // Get max order_index for auto-increment
        const maxOrder = await elementModel.aggregate({
            where: { section_id: section.id, is_deleted: false },
            _max: { order_index: true },
        });

        const element = await elementModel.create({
            data: {
                ...body,
                section_id: section.id,
                order_index: (maxOrder._max.order_index || 0) + 1,
            },
        });

        return NextResponse.json(element, { status: 201 });
    } catch (error) {
        console.error("Error creating element:", error);
        return NextResponse.json(
            { error: "Failed to create element" },
            { status: 500 }
        );
    }
}
