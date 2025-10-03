-- CreateEnum
CREATE TYPE "DomainRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CONNECTED');

-- CreateTable
CREATE TABLE "tech_domain_requests" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "status" "DomainRequestStatus" NOT NULL DEFAULT 'PENDING',
    "tenantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_domain_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_domains" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "tenantId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_domains_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tech_domain_requests_uuid_key" ON "tech_domain_requests"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_domain_requests_domain_key" ON "tech_domain_requests"("domain");

-- CreateIndex
CREATE INDEX "tech_domain_requests_domain_idx" ON "tech_domain_requests"("domain");

-- CreateIndex
CREATE INDEX "tech_domain_requests_status_idx" ON "tech_domain_requests"("status");

-- CreateIndex
CREATE INDEX "tech_domain_requests_createdAt_idx" ON "tech_domain_requests"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "tech_domains_uuid_key" ON "tech_domains"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_domains_domain_key" ON "tech_domains"("domain");

-- CreateIndex
CREATE INDEX "tech_domains_domain_idx" ON "tech_domains"("domain");

-- CreateIndex
CREATE INDEX "tech_domains_isActive_idx" ON "tech_domains"("isActive");

-- CreateIndex
CREATE INDEX "tech_domains_createdAt_idx" ON "tech_domains"("createdAt");

-- AddForeignKey
ALTER TABLE "tech_domain_requests" ADD CONSTRAINT "tech_domain_requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tech_tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_domains" ADD CONSTRAINT "tech_domains_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tech_tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
