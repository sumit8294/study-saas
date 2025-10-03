/*
  Warnings:

  - You are about to drop the `activity_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `all_feature_elements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `brand_elements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `currencies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `explorer_elements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feature_elements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `general_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mail_configurations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_settings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sms_configurations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `software_elements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `testimonial_elements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `website_sections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `why_us_elements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."activity_logs" DROP CONSTRAINT "activity_logs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."all_feature_elements" DROP CONSTRAINT "all_feature_elements_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."brand_elements" DROP CONSTRAINT "brand_elements_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."explorer_elements" DROP CONSTRAINT "explorer_elements_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."feature_elements" DROP CONSTRAINT "feature_elements_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."role_permissions" DROP CONSTRAINT "role_permissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."role_permissions" DROP CONSTRAINT "role_permissions_roleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."software_elements" DROP CONSTRAINT "software_elements_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tech_users" DROP CONSTRAINT "tech_users_roleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."testimonial_elements" DROP CONSTRAINT "testimonial_elements_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."website_sections" DROP CONSTRAINT "website_sections_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."website_sections" DROP CONSTRAINT "website_sections_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."why_us_elements" DROP CONSTRAINT "why_us_elements_section_id_fkey";

-- DropTable
DROP TABLE "public"."activity_logs";

-- DropTable
DROP TABLE "public"."all_feature_elements";

-- DropTable
DROP TABLE "public"."brand_elements";

-- DropTable
DROP TABLE "public"."currencies";

-- DropTable
DROP TABLE "public"."explorer_elements";

-- DropTable
DROP TABLE "public"."feature_elements";

-- DropTable
DROP TABLE "public"."general_settings";

-- DropTable
DROP TABLE "public"."mail_configurations";

-- DropTable
DROP TABLE "public"."payment_settings";

-- DropTable
DROP TABLE "public"."permissions";

-- DropTable
DROP TABLE "public"."role_permissions";

-- DropTable
DROP TABLE "public"."roles";

-- DropTable
DROP TABLE "public"."sms_configurations";

-- DropTable
DROP TABLE "public"."software_elements";

-- DropTable
DROP TABLE "public"."testimonial_elements";

-- DropTable
DROP TABLE "public"."website_sections";

-- DropTable
DROP TABLE "public"."why_us_elements";

-- CreateTable
CREATE TABLE "tech_website_sections" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "section_key" TEXT NOT NULL,
    "section_name" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "show_on_landing" BOOLEAN NOT NULL DEFAULT true,
    "status" "SectionStatus" NOT NULL DEFAULT 'ACTIVE',
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_website_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_feature_elements" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "section_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "status" "ElementStatus" NOT NULL DEFAULT 'ACTIVE',
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_feature_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_why_us_elements" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "section_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "status" "ElementStatus" NOT NULL DEFAULT 'ACTIVE',
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_why_us_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_explorer_elements" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "section_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "status" "ElementStatus" NOT NULL DEFAULT 'ACTIVE',
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_explorer_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_all_feature_elements" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "section_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "status" "ElementStatus" NOT NULL DEFAULT 'ACTIVE',
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_all_feature_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_software_elements" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "section_id" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "status" "ElementStatus" NOT NULL DEFAULT 'ACTIVE',
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_software_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_testimonial_elements" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "section_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "rating" INTEGER,
    "company" TEXT,
    "status" "ElementStatus" NOT NULL DEFAULT 'ACTIVE',
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_testimonial_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_brand_elements" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "section_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "website_url" TEXT,
    "status" "ElementStatus" NOT NULL DEFAULT 'ACTIVE',
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_brand_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_activity_logs" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_id" INTEGER,
    "user_name" TEXT,
    "user_email" TEXT,
    "user_role" "UserRole",
    "action" "LogAction" NOT NULL,
    "entity_type" "EntityType" NOT NULL,
    "entity_id" INTEGER,
    "entity_name" TEXT,
    "description" TEXT NOT NULL,
    "old_values" JSONB,
    "new_values" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "location" TEXT,
    "severity" "LogSeverity" NOT NULL DEFAULT 'INFO',
    "status" "LogStatus" NOT NULL DEFAULT 'SUCCESS',
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_general_settings" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyTagline" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT,
    "yearlyPlanDiscount" DOUBLE PRECISION,
    "trialDayCount" INTEGER NOT NULL,
    "defaultLanguage" TEXT NOT NULL DEFAULT 'en',
    "defaultCurrency" TEXT NOT NULL DEFAULT 'USD',
    "copyrightText" TEXT NOT NULL,
    "facebookLink" TEXT,
    "instagramLink" TEXT,
    "twitterLink" TEXT,
    "linkedinLink" TEXT,
    "whiteLogo" TEXT,
    "blackLogo" TEXT,
    "smallLogo" TEXT,
    "favicon" TEXT,
    "emailOtpVerification" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tech_general_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_mail_configurations" (
    "id" TEXT NOT NULL,
    "mailer" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "encryption" TEXT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "fromName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tech_mail_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_sms_configurations" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'twilio',
    "accountSid" TEXT NOT NULL,
    "authToken" TEXT NOT NULL,
    "fromNumber" TEXT NOT NULL,
    "serviceSid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tech_sms_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_currencies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "symbol" TEXT NOT NULL,
    "position" TEXT NOT NULL DEFAULT 'left',
    "status" BOOLEAN NOT NULL DEFAULT true,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tech_currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_payment_settings" (
    "id" TEXT NOT NULL,
    "manualPayment" JSONB,
    "stripe" JSONB,
    "paypal" JSONB,
    "paystack" JSONB,
    "razorpay" JSONB,
    "currencyExchange" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tech_payment_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tech_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tech_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_role_permissions" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tech_role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tech_website_sections_uuid_key" ON "tech_website_sections"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_website_sections_section_key_key" ON "tech_website_sections"("section_key");

-- CreateIndex
CREATE INDEX "tech_website_sections_section_key_idx" ON "tech_website_sections"("section_key");

-- CreateIndex
CREATE INDEX "tech_website_sections_status_idx" ON "tech_website_sections"("status");

-- CreateIndex
CREATE INDEX "tech_website_sections_show_on_landing_idx" ON "tech_website_sections"("show_on_landing");

-- CreateIndex
CREATE INDEX "tech_website_sections_order_index_idx" ON "tech_website_sections"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "tech_feature_elements_uuid_key" ON "tech_feature_elements"("uuid");

-- CreateIndex
CREATE INDEX "tech_feature_elements_section_id_idx" ON "tech_feature_elements"("section_id");

-- CreateIndex
CREATE INDEX "tech_feature_elements_status_idx" ON "tech_feature_elements"("status");

-- CreateIndex
CREATE INDEX "tech_feature_elements_order_index_idx" ON "tech_feature_elements"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "tech_why_us_elements_uuid_key" ON "tech_why_us_elements"("uuid");

-- CreateIndex
CREATE INDEX "tech_why_us_elements_section_id_idx" ON "tech_why_us_elements"("section_id");

-- CreateIndex
CREATE INDEX "tech_why_us_elements_status_idx" ON "tech_why_us_elements"("status");

-- CreateIndex
CREATE INDEX "tech_why_us_elements_order_index_idx" ON "tech_why_us_elements"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "tech_explorer_elements_uuid_key" ON "tech_explorer_elements"("uuid");

-- CreateIndex
CREATE INDEX "tech_explorer_elements_section_id_idx" ON "tech_explorer_elements"("section_id");

-- CreateIndex
CREATE INDEX "tech_explorer_elements_status_idx" ON "tech_explorer_elements"("status");

-- CreateIndex
CREATE INDEX "tech_explorer_elements_order_index_idx" ON "tech_explorer_elements"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "tech_all_feature_elements_uuid_key" ON "tech_all_feature_elements"("uuid");

-- CreateIndex
CREATE INDEX "tech_all_feature_elements_section_id_idx" ON "tech_all_feature_elements"("section_id");

-- CreateIndex
CREATE INDEX "tech_all_feature_elements_status_idx" ON "tech_all_feature_elements"("status");

-- CreateIndex
CREATE INDEX "tech_all_feature_elements_order_index_idx" ON "tech_all_feature_elements"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "tech_software_elements_uuid_key" ON "tech_software_elements"("uuid");

-- CreateIndex
CREATE INDEX "tech_software_elements_section_id_idx" ON "tech_software_elements"("section_id");

-- CreateIndex
CREATE INDEX "tech_software_elements_status_idx" ON "tech_software_elements"("status");

-- CreateIndex
CREATE INDEX "tech_software_elements_order_index_idx" ON "tech_software_elements"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "tech_testimonial_elements_uuid_key" ON "tech_testimonial_elements"("uuid");

-- CreateIndex
CREATE INDEX "tech_testimonial_elements_section_id_idx" ON "tech_testimonial_elements"("section_id");

-- CreateIndex
CREATE INDEX "tech_testimonial_elements_status_idx" ON "tech_testimonial_elements"("status");

-- CreateIndex
CREATE INDEX "tech_testimonial_elements_order_index_idx" ON "tech_testimonial_elements"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "tech_brand_elements_uuid_key" ON "tech_brand_elements"("uuid");

-- CreateIndex
CREATE INDEX "tech_brand_elements_section_id_idx" ON "tech_brand_elements"("section_id");

-- CreateIndex
CREATE INDEX "tech_brand_elements_status_idx" ON "tech_brand_elements"("status");

-- CreateIndex
CREATE INDEX "tech_brand_elements_order_index_idx" ON "tech_brand_elements"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "tech_activity_logs_uuid_key" ON "tech_activity_logs"("uuid");

-- CreateIndex
CREATE INDEX "tech_activity_logs_user_id_idx" ON "tech_activity_logs"("user_id");

-- CreateIndex
CREATE INDEX "tech_activity_logs_action_idx" ON "tech_activity_logs"("action");

-- CreateIndex
CREATE INDEX "tech_activity_logs_entity_type_idx" ON "tech_activity_logs"("entity_type");

-- CreateIndex
CREATE INDEX "tech_activity_logs_entity_id_idx" ON "tech_activity_logs"("entity_id");

-- CreateIndex
CREATE INDEX "tech_activity_logs_severity_idx" ON "tech_activity_logs"("severity");

-- CreateIndex
CREATE INDEX "tech_activity_logs_created_at_idx" ON "tech_activity_logs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_currencies_code_key" ON "tech_currencies"("code");

-- CreateIndex
CREATE UNIQUE INDEX "tech_roles_name_key" ON "tech_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tech_permissions_name_key" ON "tech_permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tech_role_permissions_roleId_permissionId_key" ON "tech_role_permissions"("roleId", "permissionId");

-- AddForeignKey
ALTER TABLE "tech_users" ADD CONSTRAINT "tech_users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "tech_roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_website_sections" ADD CONSTRAINT "tech_website_sections_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "tech_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_website_sections" ADD CONSTRAINT "tech_website_sections_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "tech_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_feature_elements" ADD CONSTRAINT "tech_feature_elements_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "tech_website_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_why_us_elements" ADD CONSTRAINT "tech_why_us_elements_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "tech_website_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_explorer_elements" ADD CONSTRAINT "tech_explorer_elements_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "tech_website_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_all_feature_elements" ADD CONSTRAINT "tech_all_feature_elements_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "tech_website_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_software_elements" ADD CONSTRAINT "tech_software_elements_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "tech_website_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_testimonial_elements" ADD CONSTRAINT "tech_testimonial_elements_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "tech_website_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_brand_elements" ADD CONSTRAINT "tech_brand_elements_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "tech_website_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_activity_logs" ADD CONSTRAINT "tech_activity_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tech_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_role_permissions" ADD CONSTRAINT "tech_role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "tech_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_role_permissions" ADD CONSTRAINT "tech_role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "tech_permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
