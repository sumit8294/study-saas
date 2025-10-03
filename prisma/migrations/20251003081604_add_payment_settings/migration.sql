-- CreateTable
CREATE TABLE "payment_settings" (
    "id" TEXT NOT NULL,
    "manualPayment" JSONB,
    "stripe" JSONB,
    "paypal" JSONB,
    "paystack" JSONB,
    "razorpay" JSONB,
    "currencyExchange" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_settings_pkey" PRIMARY KEY ("id")
);
