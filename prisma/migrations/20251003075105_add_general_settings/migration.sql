-- CreateTable
CREATE TABLE "general_settings" (
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

    CONSTRAINT "general_settings_pkey" PRIMARY KEY ("id")
);
