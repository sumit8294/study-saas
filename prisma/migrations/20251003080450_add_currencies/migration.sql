-- CreateTable
CREATE TABLE "sms_configurations" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'twilio',
    "accountSid" TEXT NOT NULL,
    "authToken" TEXT NOT NULL,
    "fromNumber" TEXT NOT NULL,
    "serviceSid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sms_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currencies" (
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

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "currencies_code_key" ON "currencies"("code");
