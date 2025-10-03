-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'CANCELLED');

-- CreateTable
CREATE TABLE "tech_payments" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenantId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "transactionType" TEXT NOT NULL,
    "trxId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tech_payments_uuid_key" ON "tech_payments"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_payments_trxId_key" ON "tech_payments"("trxId");

-- CreateIndex
CREATE INDEX "tech_payments_trxId_idx" ON "tech_payments"("trxId");

-- CreateIndex
CREATE INDEX "tech_payments_paymentStatus_idx" ON "tech_payments"("paymentStatus");

-- CreateIndex
CREATE INDEX "tech_payments_createdAt_idx" ON "tech_payments"("createdAt");

-- AddForeignKey
ALTER TABLE "tech_payments" ADD CONSTRAINT "tech_payments_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tech_tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_payments" ADD CONSTRAINT "tech_payments_planId_fkey" FOREIGN KEY ("planId") REFERENCES "tech_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
