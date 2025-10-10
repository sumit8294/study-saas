import { prisma } from "./prisma";

// Page type classification
export function isElementOnlyPage(sectionKey: string): boolean {
    const elementOnlyPages = ["explorers", "brands"];
    return elementOnlyPages.includes(sectionKey);
}

export function hasElements(sectionKey: string): boolean {
    const pagesWithElements = [
        "why_us",
        "features",
        "all_features",
        "software_overview",
        "testimonial",
        "explorers",
        "brands",
    ];
    return pagesWithElements.includes(sectionKey);
}

export function isSimpleFormPage(sectionKey: string): boolean {
    const simpleFormPages = [
        "hero",
        "about_us",
        "business_start",
        "cta",
        "custom_html",
        "newsletter",
        "pricing_plan",
    ];
    return simpleFormPages.includes(sectionKey);
}

export async function getElementsBySection(
    sectionKey: string,
    sectionId: number
) {
    const modelMap: Record<string, any> = {
        why_us: prisma.tech_why_us_elements,
        features: prisma.tech_feature_elements,
        explorers: prisma.tech_explorer_elements,
        all_features: prisma.tech_all_feature_elements,
        software_overview: prisma.tech_software_elements,
        testimonial: prisma.tech_testimonial_elements,
        brands: prisma.tech_brand_elements,
    };

    const model = modelMap[sectionKey];
    if (!model) return [];

    return await model.findMany({
        where: {
            section_id: sectionId,
            is_deleted: false,
        },
        orderBy: { order_index: "asc" },
    });
}

export async function getElementById(sectionKey: string, elementId: number) {
    const modelMap: Record<string, any> = {
        why_us: prisma.tech_why_us_elements,
        features: prisma.tech_feature_elements,
        explorers: prisma.tech_explorer_elements,
        all_features: prisma.tech_all_feature_elements,
        software_overview: prisma.tech_software_elements,
        testimonial: prisma.tech_testimonial_elements,
        brands: prisma.tech_brand_elements,
    };

    const model = modelMap[sectionKey];
    if (!model) return null;

    return await model.findFirst({
        where: {
            id: elementId,
            is_deleted: false,
        },
    });
}

export async function createElement(
    sectionKey: string,
    sectionId: number,
    data: any
) {
    const modelMap: Record<string, any> = {
        why_us: prisma.tech_why_us_elements,
        features: prisma.tech_feature_elements,
        explorers: prisma.tech_explorer_elements,
        all_features: prisma.tech_all_feature_elements,
        software_overview: prisma.tech_software_elements,
        testimonial: prisma.tech_testimonial_elements,
        brands: prisma.tech_brand_elements,
    };

    const model = modelMap[sectionKey];
    if (!model) throw new Error("Invalid section type");

    // Get max order_index for auto-increment
    const maxOrder = await model.aggregate({
        where: { section_id: sectionId, is_deleted: false },
        _max: { order_index: true },
    });

    return await model.create({
        data: {
            ...data,
            section_id: sectionId,
            order_index: (maxOrder._max.order_index || 0) + 1,
        },
    });
}

export async function updateElement(
    sectionKey: string,
    elementId: number,
    data: any
) {
    const modelMap: Record<string, any> = {
        why_us: prisma.tech_why_us_elements,
        features: prisma.tech_feature_elements,
        explorers: prisma.tech_explorer_elements,
        all_features: prisma.tech_all_feature_elements,
        software_overview: prisma.tech_software_elements,
        testimonial: prisma.tech_testimonial_elements,
        brands: prisma.tech_brand_elements,
    };

    const model = modelMap[sectionKey];
    if (!model) throw new Error("Invalid section type");

    return await model.update({
        where: { id: elementId },
        data: data,
    });
}

export async function deleteElement(sectionKey: string, elementId: number) {
    const modelMap: Record<string, any> = {
        why_us: prisma.tech_why_us_elements,
        features: prisma.tech_feature_elements,
        explorers: prisma.tech_explorer_elements,
        all_features: prisma.tech_all_feature_elements,
        software_overview: prisma.tech_software_elements,
        testimonial: prisma.tech_testimonial_elements,
        brands: prisma.tech_brand_elements,
    };

    const model = modelMap[sectionKey];
    if (!model) throw new Error("Invalid section type");

    // Soft delete
    await model.update({
        where: { id: elementId },
        data: { is_deleted: true },
    });

    return true;
}

export function getSectionName(sectionKey: string): string {
    const names: Record<string, string> = {
        hero: "Hero ",
        about_us: "About Us ",
        why_us: "Why Us",
        business_start: "Business Start ",
        features: "Features ",
        explorers: "Explorers ",
        all_features: "All Features ",
        cta: "CTA ",
        software_overview: "Software Overview ",
        pricing_plan: "Pricing Plan ",
        testimonial: "Testimonial ",
        brands: "Brands ",
        newsletter: "Newsletter ",
        custom_html: "Custom HTML ",
    };
    return names[sectionKey] || sectionKey;
}

export function getDefaultOrder(sectionKey: string): number {
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
