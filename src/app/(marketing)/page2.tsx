import Hero from "@/components/sections/Hero";
import Hero2 from "@/components/sections/Hero2";
import AgentPortalSection from "@/components/sections/AgentPortalSection";
import StudentPortalSection from "@/components/sections/StudentPortalSection";
import UniversityPortalSection from "@/components/sections/UniversityPortalSection";
import PricingSection from "@/components/sections/PricingSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import Footer from "@/components/ui/Footer";

export default function LandingPage() {
    return (
        <main className="flex flex-col min-h-screen">
            {/* <Hero /> */}
            <Hero />
            <AgentPortalSection />
            <StudentPortalSection />
            <UniversityPortalSection />
            <PricingSection />
            <WhyChooseUsSection />
            <Footer />

            {/* Add Features, Pricing, CTA later */}
        </main>
    );
}
