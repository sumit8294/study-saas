import { PrismaClient } from "@prisma/client";
import { seedPlanFeatures } from "../seeds/seedPlanFeatures";
import { seedPlans } from "../seeds/seedPlans";
import { seedUsers } from "../seeds/seedUsers";
import { seedTenants } from "../seeds/seedTenants";

const prisma = new PrismaClient();

async function main() {
    const features = await seedPlanFeatures();
    const plans = await seedPlans(features);
    const users = await seedUsers();
    await seedTenants(users, plans);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
