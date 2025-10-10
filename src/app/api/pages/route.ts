import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PageType, PageStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        // Build where clause
        const where: any = {
            isDeleted: false,
        };

        // Add search filter if provided
        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { slug: { contains: search, mode: "insensitive" } },
                { type: { contains: search, mode: "insensitive" } },
            ];
        }

        const [pages, totalCount] = await Promise.all([
            prisma.tech_pages.findMany({
                where,
                include: {
                    author: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.tech_pages.count({ where }),
        ]);

        const transformedPages = pages.map((page) => ({
            id: page.id,
            uuid: page.uuid,
            title: page.title,
            name: page.title, // For compatibility with your UI
            slug: page.slug,
            type: page.type,
            status: page.status,
            content: page.content,
            metaTitle: page.metaTitle,
            metaDescription: page.metaDescription,
            metaKeywords: page.metaKeywords,
            featuredImage: page.featuredImage,
            author: page.author?.name || "Unknown",
            publishedAt: page.publishedAt,
            createdAt: page.createdAt,
            updatedAt: page.updatedAt,
        }));

        return NextResponse.json({
            pages: transformedPages,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalCount,
                hasNext: page < Math.ceil(totalCount / limit),
                hasPrev: page > 1,
            },
        });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to fetch pages" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
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

        // Validate required fields
        if (!title || !slug || !content) {
            return NextResponse.json(
                { error: "Title, slug, and content are required" },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const existingPage = await prisma.tech_pages.findFirst({
            where: {
                slug: slug.toLowerCase(),
                isDeleted: false,
            },
        });

        if (existingPage) {
            return NextResponse.json(
                { error: "A page with this slug already exists" },
                { status: 400 }
            );
        }

        const page = await prisma.tech_pages.create({
            data: {
                title,
                slug: slug.toLowerCase(),
                content,
                type: type || PageType.INFORMATION,
                status: status || PageStatus.DRAFT,
                metaTitle,
                metaDescription,
                metaKeywords,
                featuredImage,
                authorId: 1, // This should come from your auth context
                ...(status === PageStatus.ACTIVE && {
                    publishedAt: new Date(),
                }),
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(page, { status: 201 });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { error: "Failed to create page" },
            { status: 500 }
        );
    }
}
