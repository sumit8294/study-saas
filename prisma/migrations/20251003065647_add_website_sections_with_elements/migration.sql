-- CreateEnum
CREATE TYPE "SectionStatus" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ElementStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "website_sections" (
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

    CONSTRAINT "website_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feature_elements" (
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

    CONSTRAINT "feature_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "why_us_elements" (
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

    CONSTRAINT "why_us_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "explorer_elements" (
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

    CONSTRAINT "explorer_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "all_feature_elements" (
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

    CONSTRAINT "all_feature_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "software_elements" (
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

    CONSTRAINT "software_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonial_elements" (
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

    CONSTRAINT "testimonial_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand_elements" (
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

    CONSTRAINT "brand_elements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "website_sections_uuid_key" ON "website_sections"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "website_sections_section_key_key" ON "website_sections"("section_key");

-- CreateIndex
CREATE INDEX "website_sections_section_key_idx" ON "website_sections"("section_key");

-- CreateIndex
CREATE INDEX "website_sections_status_idx" ON "website_sections"("status");

-- CreateIndex
CREATE INDEX "website_sections_show_on_landing_idx" ON "website_sections"("show_on_landing");

-- CreateIndex
CREATE INDEX "website_sections_order_index_idx" ON "website_sections"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "feature_elements_uuid_key" ON "feature_elements"("uuid");

-- CreateIndex
CREATE INDEX "feature_elements_section_id_idx" ON "feature_elements"("section_id");

-- CreateIndex
CREATE INDEX "feature_elements_status_idx" ON "feature_elements"("status");

-- CreateIndex
CREATE INDEX "feature_elements_order_index_idx" ON "feature_elements"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "why_us_elements_uuid_key" ON "why_us_elements"("uuid");

-- CreateIndex
CREATE INDEX "why_us_elements_section_id_idx" ON "why_us_elements"("section_id");

-- CreateIndex
CREATE INDEX "why_us_elements_status_idx" ON "why_us_elements"("status");

-- CreateIndex
CREATE INDEX "why_us_elements_order_index_idx" ON "why_us_elements"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "explorer_elements_uuid_key" ON "explorer_elements"("uuid");

-- CreateIndex
CREATE INDEX "explorer_elements_section_id_idx" ON "explorer_elements"("section_id");

-- CreateIndex
CREATE INDEX "explorer_elements_status_idx" ON "explorer_elements"("status");

-- CreateIndex
CREATE INDEX "explorer_elements_order_index_idx" ON "explorer_elements"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "all_feature_elements_uuid_key" ON "all_feature_elements"("uuid");

-- CreateIndex
CREATE INDEX "all_feature_elements_section_id_idx" ON "all_feature_elements"("section_id");

-- CreateIndex
CREATE INDEX "all_feature_elements_status_idx" ON "all_feature_elements"("status");

-- CreateIndex
CREATE INDEX "all_feature_elements_order_index_idx" ON "all_feature_elements"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "software_elements_uuid_key" ON "software_elements"("uuid");

-- CreateIndex
CREATE INDEX "software_elements_section_id_idx" ON "software_elements"("section_id");

-- CreateIndex
CREATE INDEX "software_elements_status_idx" ON "software_elements"("status");

-- CreateIndex
CREATE INDEX "software_elements_order_index_idx" ON "software_elements"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "testimonial_elements_uuid_key" ON "testimonial_elements"("uuid");

-- CreateIndex
CREATE INDEX "testimonial_elements_section_id_idx" ON "testimonial_elements"("section_id");

-- CreateIndex
CREATE INDEX "testimonial_elements_status_idx" ON "testimonial_elements"("status");

-- CreateIndex
CREATE INDEX "testimonial_elements_order_index_idx" ON "testimonial_elements"("order_index");

-- CreateIndex
CREATE UNIQUE INDEX "brand_elements_uuid_key" ON "brand_elements"("uuid");

-- CreateIndex
CREATE INDEX "brand_elements_section_id_idx" ON "brand_elements"("section_id");

-- CreateIndex
CREATE INDEX "brand_elements_status_idx" ON "brand_elements"("status");

-- CreateIndex
CREATE INDEX "brand_elements_order_index_idx" ON "brand_elements"("order_index");

-- AddForeignKey
ALTER TABLE "website_sections" ADD CONSTRAINT "website_sections_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "tech_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "website_sections" ADD CONSTRAINT "website_sections_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "tech_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feature_elements" ADD CONSTRAINT "feature_elements_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "website_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "why_us_elements" ADD CONSTRAINT "why_us_elements_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "website_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "explorer_elements" ADD CONSTRAINT "explorer_elements_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "website_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "all_feature_elements" ADD CONSTRAINT "all_feature_elements_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "website_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software_elements" ADD CONSTRAINT "software_elements_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "website_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonial_elements" ADD CONSTRAINT "testimonial_elements_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "website_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand_elements" ADD CONSTRAINT "brand_elements_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "website_sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
