-- CreateEnum
CREATE TYPE "SubscriptionRequestStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED', 'SUSPENDED', 'PENDING_RENEWAL');

-- CreateTable
CREATE TABLE "tech_subscription_requests" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenantId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "transactionId" TEXT,
    "documentPath" TEXT,
    "month" TEXT NOT NULL,
    "status" "SubscriptionRequestStatus" NOT NULL DEFAULT 'PENDING',
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reviewedBy" INTEGER,
    "reviewedAt" TIMESTAMP(3),
    "adminNotes" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_subscription_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_subscriptions" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenantId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "approvedBy" INTEGER,
    "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "autoRenew" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tech_subscription_requests_uuid_key" ON "tech_subscription_requests"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_subscription_requests_transactionId_key" ON "tech_subscription_requests"("transactionId");

-- CreateIndex
CREATE INDEX "tech_subscription_requests_transactionId_idx" ON "tech_subscription_requests"("transactionId");

-- CreateIndex
CREATE INDEX "tech_subscription_requests_status_idx" ON "tech_subscription_requests"("status");

-- CreateIndex
CREATE INDEX "tech_subscription_requests_requestedAt_idx" ON "tech_subscription_requests"("requestedAt");

-- CreateIndex
CREATE INDEX "tech_subscription_requests_month_idx" ON "tech_subscription_requests"("month");

-- CreateIndex
CREATE UNIQUE INDEX "tech_subscriptions_uuid_key" ON "tech_subscriptions"("uuid");

-- CreateIndex
CREATE INDEX "tech_subscriptions_month_idx" ON "tech_subscriptions"("month");

-- CreateIndex
CREATE INDEX "tech_subscriptions_status_idx" ON "tech_subscriptions"("status");

-- CreateIndex
CREATE INDEX "tech_subscriptions_startsAt_idx" ON "tech_subscriptions"("startsAt");

-- CreateIndex
CREATE INDEX "tech_subscriptions_endsAt_idx" ON "tech_subscriptions"("endsAt");

-- CreateIndex
CREATE UNIQUE INDEX "tech_subscriptions_tenantId_month_key" ON "tech_subscriptions"("tenantId", "month");

-- AddForeignKey
ALTER TABLE "tech_subscription_requests" ADD CONSTRAINT "tech_subscription_requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tech_tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_subscription_requests" ADD CONSTRAINT "tech_subscription_requests_planId_fkey" FOREIGN KEY ("planId") REFERENCES "tech_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_subscription_requests" ADD CONSTRAINT "tech_subscription_requests_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "tech_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_subscriptions" ADD CONSTRAINT "tech_subscriptions_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tech_tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_subscriptions" ADD CONSTRAINT "tech_subscriptions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "tech_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_subscriptions" ADD CONSTRAINT "tech_subscriptions_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "tech_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
