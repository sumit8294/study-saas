-- CreateEnum
CREATE TYPE "LogAction" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'EXPORT', 'IMPORT', 'BACKUP', 'RESTORE', 'APPROVE', 'REJECT', 'SUSPEND', 'ACTIVATE', 'RESET_PASSWORD', 'CHANGE_ROLE', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'SUBSCRIPTION_CREATED', 'SUBSCRIPTION_EXPIRED', 'DOMAIN_CONNECTED', 'DOMAIN_REJECTED');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('USER', 'TENANT', 'PLAN', 'PAYMENT', 'DOMAIN_REQUEST', 'DOMAIN', 'SUBSCRIPTION_REQUEST', 'SUBSCRIPTION', 'NEWSLETTER_SUBSCRIBER', 'NEWSLETTER_CAMPAIGN', 'PAGE', 'WEBSITE_SECTION', 'FEATURE_ELEMENT', 'WHY_US_ELEMENT', 'EXPLORER_ELEMENT', 'ALL_FEATURE_ELEMENT', 'SOFTWARE_ELEMENT', 'TESTIMONIAL_ELEMENT', 'BRAND_ELEMENT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "LogSeverity" AS ENUM ('DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL');

-- CreateEnum
CREATE TYPE "LogStatus" AS ENUM ('SUCCESS', 'FAILED', 'PENDING');

-- CreateTable
CREATE TABLE "activity_logs" (
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

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activity_logs_uuid_key" ON "activity_logs"("uuid");

-- CreateIndex
CREATE INDEX "activity_logs_user_id_idx" ON "activity_logs"("user_id");

-- CreateIndex
CREATE INDEX "activity_logs_action_idx" ON "activity_logs"("action");

-- CreateIndex
CREATE INDEX "activity_logs_entity_type_idx" ON "activity_logs"("entity_type");

-- CreateIndex
CREATE INDEX "activity_logs_entity_id_idx" ON "activity_logs"("entity_id");

-- CreateIndex
CREATE INDEX "activity_logs_severity_idx" ON "activity_logs"("severity");

-- CreateIndex
CREATE INDEX "activity_logs_created_at_idx" ON "activity_logs"("created_at");

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tech_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
