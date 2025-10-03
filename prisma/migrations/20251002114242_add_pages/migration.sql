-- CreateEnum
CREATE TYPE "PageType" AS ENUM ('INFORMATION', 'NEED_HELP', 'LEGAL', 'CUSTOM');

-- CreateEnum
CREATE TYPE "PageStatus" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateTable
CREATE TABLE "tech_pages" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "type" "PageType" NOT NULL DEFAULT 'INFORMATION',
    "status" "PageStatus" NOT NULL DEFAULT 'ACTIVE',
    "metaTitle" VARCHAR(255),
    "metaDescription" VARCHAR(500),
    "metaKeywords" VARCHAR(500),
    "featuredImage" TEXT,
    "authorId" INTEGER,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tech_pages_uuid_key" ON "tech_pages"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_pages_slug_key" ON "tech_pages"("slug");

-- CreateIndex
CREATE INDEX "tech_pages_slug_idx" ON "tech_pages"("slug");

-- CreateIndex
CREATE INDEX "tech_pages_type_idx" ON "tech_pages"("type");

-- CreateIndex
CREATE INDEX "tech_pages_status_idx" ON "tech_pages"("status");

-- CreateIndex
CREATE INDEX "tech_pages_createdAt_idx" ON "tech_pages"("createdAt");

-- AddForeignKey
ALTER TABLE "tech_pages" ADD CONSTRAINT "tech_pages_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "tech_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
