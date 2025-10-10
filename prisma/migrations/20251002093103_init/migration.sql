-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'SUB_ADMIN', 'EMPLOYEE');

-- CreateTable
CREATE TABLE "tech_users" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "ios_user_id" VARCHAR(255),
    "name" VARCHAR(255),
    "email" VARCHAR(128),
    "device_type" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255),
    "country_code" VARCHAR(11),
    "mobile" VARCHAR(20),
    "otp" VARCHAR(128),
    "terms_of_use" BOOLEAN NOT NULL DEFAULT false,
    "verification_token" TEXT,
    "firebase_device_token" TEXT,
    "password" VARCHAR(255),
    "role" "UserRole" NOT NULL,
    "register_by" BIGINT,
    "employee_code" VARCHAR(255),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tech_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_tenants" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "planId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "onTrial" BOOLEAN NOT NULL DEFAULT true,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "subscribed" BOOLEAN NOT NULL DEFAULT false,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_plan_features" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_plan_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_plans" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "limitClients" INTEGER NOT NULL,
    "limitSuppliers" INTEGER NOT NULL,
    "limitEmployees" INTEGER NOT NULL,
    "limitDomains" INTEGER NOT NULL,
    "limitInvoices" INTEGER NOT NULL,
    "limitPurchases" INTEGER NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlanFeatures" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PlanFeatures_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "tech_users_uuid_key" ON "tech_users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_users_email_key" ON "tech_users"("email");

-- CreateIndex
CREATE INDEX "tech_users_ios_user_id_idx" ON "tech_users"("ios_user_id");

-- CreateIndex
CREATE INDEX "tech_users_mobile_idx" ON "tech_users"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "tech_tenants_domain_key" ON "tech_tenants"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "tech_tenants_email_key" ON "tech_tenants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tech_plan_features_name_key" ON "tech_plan_features"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tech_plans_name_key" ON "tech_plans"("name");

-- CreateIndex
CREATE INDEX "_PlanFeatures_B_index" ON "_PlanFeatures"("B");

-- AddForeignKey
ALTER TABLE "tech_tenants" ADD CONSTRAINT "tech_tenants_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "tech_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_tenants" ADD CONSTRAINT "tech_tenants_planId_fkey" FOREIGN KEY ("planId") REFERENCES "tech_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlanFeatures" ADD CONSTRAINT "_PlanFeatures_A_fkey" FOREIGN KEY ("A") REFERENCES "tech_plan_features"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlanFeatures" ADD CONSTRAINT "_PlanFeatures_B_fkey" FOREIGN KEY ("B") REFERENCES "tech_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
