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

// GET - Get single element
export async function GET(
    request: NextRequest,
    { params }: { params: { sectionKey: string; elementId: string } }
) {
    try {
        const { sectionKey, elementId } = params;

        const elementModel = getElementModel(sectionKey);
        if (!elementModel) {
            return NextResponse.json(
                { error: "This section does not support elements" },
                { status: 400 }
            );
        }

        const element = await elementModel.findFirst({
            where: {
                id: parseInt(elementId),
                is_deleted: false,
            },
        });

        if (!element) {
            return NextResponse.json(
                { error: "Element not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(element);
    } catch (error) {
        console.error("Error fetching element:", error);
        return NextResponse.json(
            { error: "Failed to fetch element" },
            { status: 500 }
        );
    }
}

// PUT - Update element
export async function PUT(
    request: NextRequest,
    { params }: { params: { sectionKey: string; elementId: string } }
) {
    try {
        const { sectionKey, elementId } = params;
        const body = await request.json();

        const elementModel = getElementModel(sectionKey);
        if (!elementModel) {
            return NextResponse.json(
                { error: "This section does not support elements" },
                { status: 400 }
            );
        }

        const element = await elementModel.update({
            where: { id: parseInt(elementId) },
            data: body,
        });

        return NextResponse.json(element);
    } catch (error) {
        console.error("Error updating element:", error);
        return NextResponse.json(
            { error: "Failed to update element" },
            { status: 500 }
        );
    }
}

// DELETE - Delete element (soft delete)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { sectionKey: string; elementId: string } }
) {
    try {
        const { sectionKey, elementId } = params;

        const elementModel = getElementModel(sectionKey);
        if (!elementModel) {
            return NextResponse.json(
                { error: "This section does not support elements" },
                { status: 400 }
            );
        }

        // Soft delete
        await elementModel.update({
            where: { id: parseInt(elementId) },
            data: { is_deleted: true },
        });

        return NextResponse.json({ message: "Element deleted successfully" });
    } catch (error) {
        console.error("Error deleting element:", error);
        return NextResponse.json(
            { error: "Failed to delete element" },
            { status: 500 }
        );
    }
}
