import { PrismaClient } from "@prisma/client";
import { seedPlanFeatures } from "../seeds/seedPlanFeatures";
import { seedPlans } from "../seeds/seedPlans";
import { seedUsers } from "../seeds/seedUsers";
import { seedTenants } from "../seeds/seedTenants";
import { seedPayments } from "../seeds/seedPayments";
import { seedDomainRequests } from "../seeds/seedDomainRequests";
import { seedDomains } from "../seeds/seedDomains";
import { seedSubscriptionRequests } from "../seeds/seedSubscriptionRequests";
import { seedSubscriptions } from "../seeds/seedSubscriptions";
import { seedNewsletterSubscribers } from "./seedNewsletterSubscribers";
import { seedNewsletterCampaigns } from "./seedNewsletterCampaigns";
import { seedPages } from "./seedPages";
import { seedWebsiteSectionsWithElements } from "../seeds/seedWebsiteSectionsWithElements";
import { seedActivityLogs } from "./seedActivityLogs";
import { seedGeneralSettings } from "./seedGeneralSettings";
import { seedCurrencies } from "./seedCurrencies";
import { seedPaymentSettings } from "./seedPaymentSettings";
import { seedPermissions } from "./seedPermissions";
import { seedRoles } from "./seedRoles";
import { seedRolePermissions } from "./seedRolePermissions";

const prisma = new PrismaClient();

async function main() {
    /* ============== 
    
    Core data (required for relationships) 
    
    =============
    */
    const features = await seedPlanFeatures(prisma);
    const plans = await seedPlans(prisma, features);
    const users = await seedUsers(prisma);
    /* RBAC System (Add these lines) */
    await seedPermissions(prisma);
    await seedRoles(prisma);
    await seedRolePermissions(prisma);
    /* 
    ================ 
    
    General Settings 
    
    =============== */
    await seedGeneralSettings(prisma);
    /* ================= Currencies ==================  */
    await seedCurrencies(prisma);
    /* Payment Settings (Add this line) */
    await seedPaymentSettings(prisma);
    /* ============== Business data =============*/
    await seedTenants(prisma, users, plans);
    await seedPayments(prisma);
    await seedDomainRequests(prisma);
    await seedDomains(prisma);
    await seedSubscriptionRequests(prisma);
    await seedSubscriptions(prisma);
    /* ============== Content management ============= */
    await seedPages(prisma);
    await seedWebsiteSectionsWithElements(prisma);
    /* ================ Marketing =================*/
    await seedNewsletterSubscribers(prisma);
    await seedNewsletterCampaigns(prisma);
    /* ===================== Activity logs (add this at the end) =================== */
    await seedActivityLogs(prisma);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
