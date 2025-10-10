import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PageType, PageStatus } from "@prisma/client";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        const page = await prisma.tech_pages.findUnique({
            where: { id, isDeleted: false },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!page) {
            return NextResponse.json(
                { error: "Page not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(page);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch page" },
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
        const {
            title,
            slug,
            content,
            type,
            status,
            metaTitle,
            metaDescription,
            metaKeywords,
            featuredImage,
        } = await req.json();

        // Check if slug already exists (excluding current page)
        if (slug) {
            const existingPage = await prisma.tech_pages.findFirst({
                where: {
                    slug: slug.toLowerCase(),
                    id: { not: id },
                    isDeleted: false,
                },
            });

            if (existingPage) {
                return NextResponse.json(
                    { error: "A page with this slug already exists" },
                    { status: 400 }
                );
            }
        }

        const updateData: any = {
            ...(title && { title }),
            ...(slug && { slug: slug.toLowerCase() }),
            ...(content && { content }),
            ...(type && { type: type as PageType }),
            ...(status && { status: status as PageStatus }),
            ...(metaTitle !== undefined && { metaTitle }),
            ...(metaDescription !== undefined && { metaDescription }),
            ...(metaKeywords !== undefined && { metaKeywords }),
            ...(featuredImage !== undefined && { featuredImage }),
        };

        // Set publishedAt when status changes to ACTIVE
        if (status === PageStatus.ACTIVE) {
            const currentPage = await prisma.tech_pages.findUnique({
                where: { id },
                select: { publishedAt: true },
            });
            if (!currentPage?.publishedAt) {
                updateData.publishedAt = new Date();
            }
        }

        const updatedPage = await prisma.tech_pages.update({
            where: { id },
            data: updateData,
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(updatedPage);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to update page" },
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

        await prisma.tech_pages.update({
            where: { id },
            data: { isDeleted: true },
        });

        return NextResponse.json(
            { message: "Page deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to delete page" },
            { status: 500 }
        );
    }
}
