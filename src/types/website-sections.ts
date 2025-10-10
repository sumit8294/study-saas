export interface HeroContent {
    heroTagline: string;
    heroTitle: string;
    heroDescription: string;
    demoButtonText: string;
    demoButtonLink: string;
    getStartedButtonText: string;
    getStartedButtonLink: string;
}

export interface WebsiteSection {
    id: number;
    uuid: string;
    section_key: string;
    section_name: string;
    content: HeroContent | any; // Use specific interfaces for different sections
    show_on_landing: boolean;
    status: "DRAFT" | "ACTIVE" | "INACTIVE" | "ARCHIVED";
    order_index: number;
    version: number;
    created_by?: number;
    updated_by?: number;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
}
