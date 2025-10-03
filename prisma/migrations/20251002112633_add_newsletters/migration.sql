-- CreateEnum
CREATE TYPE "CampaignAudience" AS ENUM ('ALL_SUBSCRIBERS', 'ACTIVE_SUBSCRIBERS', 'TENANTS', 'SPECIFIC_USERS');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'SENDING', 'SENT', 'CANCELLED', 'FAILED');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'SENT', 'DELIVERED', 'OPENED', 'CLICKED', 'BOUNCED', 'FAILED');

-- CreateTable
CREATE TABLE "tech_newsletter_subscribers" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP(3),
    "source" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_newsletter_subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_newsletter_campaigns" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "sentTo" "CampaignAudience" NOT NULL DEFAULT 'ALL_SUBSCRIBERS',
    "greeting" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "status" "CampaignStatus" NOT NULL DEFAULT 'DRAFT',
    "sentBy" INTEGER,
    "sentAt" TIMESTAMP(3),
    "scheduledAt" TIMESTAMP(3),
    "recipientCount" INTEGER,
    "openCount" INTEGER NOT NULL DEFAULT 0,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_newsletter_campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_campaign_recipients" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "subscriberId" INTEGER,
    "email" VARCHAR(255) NOT NULL,
    "status" "DeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "openedAt" TIMESTAMP(3),
    "clickedAt" TIMESTAMP(3),
    "bounceReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_campaign_recipients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tech_newsletter_subscribers_uuid_key" ON "tech_newsletter_subscribers"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_newsletter_subscribers_email_key" ON "tech_newsletter_subscribers"("email");

-- CreateIndex
CREATE INDEX "tech_newsletter_subscribers_email_idx" ON "tech_newsletter_subscribers"("email");

-- CreateIndex
CREATE INDEX "tech_newsletter_subscribers_isActive_idx" ON "tech_newsletter_subscribers"("isActive");

-- CreateIndex
CREATE INDEX "tech_newsletter_subscribers_subscribedAt_idx" ON "tech_newsletter_subscribers"("subscribedAt");

-- CreateIndex
CREATE UNIQUE INDEX "tech_newsletter_campaigns_uuid_key" ON "tech_newsletter_campaigns"("uuid");

-- CreateIndex
CREATE INDEX "tech_newsletter_campaigns_status_idx" ON "tech_newsletter_campaigns"("status");

-- CreateIndex
CREATE INDEX "tech_newsletter_campaigns_sentAt_idx" ON "tech_newsletter_campaigns"("sentAt");

-- CreateIndex
CREATE INDEX "tech_newsletter_campaigns_scheduledAt_idx" ON "tech_newsletter_campaigns"("scheduledAt");

-- CreateIndex
CREATE INDEX "tech_newsletter_campaigns_createdAt_idx" ON "tech_newsletter_campaigns"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "tech_campaign_recipients_uuid_key" ON "tech_campaign_recipients"("uuid");

-- CreateIndex
CREATE INDEX "tech_campaign_recipients_campaignId_idx" ON "tech_campaign_recipients"("campaignId");

-- CreateIndex
CREATE INDEX "tech_campaign_recipients_subscriberId_idx" ON "tech_campaign_recipients"("subscriberId");

-- CreateIndex
CREATE INDEX "tech_campaign_recipients_email_idx" ON "tech_campaign_recipients"("email");

-- CreateIndex
CREATE INDEX "tech_campaign_recipients_status_idx" ON "tech_campaign_recipients"("status");

-- CreateIndex
CREATE UNIQUE INDEX "tech_campaign_recipients_campaignId_email_key" ON "tech_campaign_recipients"("campaignId", "email");

-- AddForeignKey
ALTER TABLE "tech_newsletter_campaigns" ADD CONSTRAINT "tech_newsletter_campaigns_sentBy_fkey" FOREIGN KEY ("sentBy") REFERENCES "tech_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_campaign_recipients" ADD CONSTRAINT "tech_campaign_recipients_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "tech_newsletter_campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_campaign_recipients" ADD CONSTRAINT "tech_campaign_recipients_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "tech_newsletter_subscribers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
