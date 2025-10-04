"use client";

import { useState } from "react";
import Hero from "@/components/sections/Hero";
import FeatureSection from "@/components/sections/FeatureSection";
import CTASection from "@/components/sections/CTASection";
import GridSection from "@/components/sections/GridSection";
import PriceSection from "@/components/sections/PriceSection";
import StatsSection from "@/components/sections/StatsSection";
import BlogSection from "@/components/sections/BlogSection";
import PartnersSection from "@/components/sections/PartnersSection";
import ContactSection from "@/components/sections/ContactSection";
import NewsLetterSection from "@/components/sections/NewsLetterSection";
import Footer from "@/components/ui/Footer";
import StudentPortalSection from "@/components/sections/StudentPortalSection";
import UniversityPortalSection from "@/components/sections/UniversityPortalSection";
import AgentPortalSection from "@/components/sections/AgentPortalSection";
import ProductsSection from "@/components/sections/ProductsSection";

export default function Page() {
    return (
        <>
            <Hero />
            {/* <PartnersSection /> */}
            <FeatureSection />
            {/* <PortalShowcase /> */}
            <ProductsSection />
            {/* <StatsSection /> */}
            <CTASection />
            <GridSection />
            <PriceSection />
            <BlogSection />
            {/* <ContactSection /> */}
            <NewsLetterSection />

            {/* <StudentPortalSection />
            <UniversityPortalSection />
            <AgentPortalSection /> */}

            <Footer />
        </>
    );
}
