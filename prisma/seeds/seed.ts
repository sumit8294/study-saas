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
    // const features = await seedPlanFeatures();
    // const plans = await seedPlans(features);
    // const users = await seedUsers();
    /* RBAC System (Add these lines) */
    // await seedPermissions(prisma);
    // await seedRoles(prisma);
    // await seedRolePermissions(prisma);
    /* 
    ================ 
    
    General Settings 
    
    =============== */
    // await seedGeneralSettings(prisma);
    /* ================= Currencies ==================  */
    // await seedCurrencies(prisma);
    /* Payment Settings (Add this line) */
    // await seedPaymentSettings(prisma);
    /* ============== Business data =============*/
    // await seedTenants(users, plans);
    // await seedPayments();
    // await seedDomainRequests();
    // await seedDomains();
    // await seedSubscriptionRequests();
    // await seedSubscriptions();
    /* ============== Content management ============= */
    // await seedPages();
    // await seedWebsiteSectionsWithElements();
    /* ================ Marketing =================*/
    // await seedNewsletterSubscribers();
    // await seedNewsletterCampaigns();
    /* ===================== Activity logs (add this at the end) =================== */
    // await seedActivityLogs();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
