/*
  Warnings:

  - The values [SUB_ADMIN,EMPLOYEE] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "FeeStatus" AS ENUM ('pending', 'paid');

-- CreateEnum
CREATE TYPE "DocStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'SUPPORT', 'TENANT_ADMIN', 'TENANT_SUB_ADMIN', 'TENANT_EMPLOYEE', 'STUDENT', 'AGENT', 'AGENT_STUDENT', 'UNIVERSITY');
ALTER TABLE "tech_users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TABLE "tech_activity_logs" ALTER COLUMN "user_role" TYPE "UserRole_new" USING ("user_role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
COMMIT;

-- CreateTable
CREATE TABLE "tech_tenant_users" (
    "id" SERIAL NOT NULL,
    "tenantId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tech_tenant_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_student_meta" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "salutation" VARCHAR(50),
    "first_name" VARCHAR(255) NOT NULL,
    "middle_name" VARCHAR(255),
    "last_name" VARCHAR(255) NOT NULL,
    "alternate_email" VARCHAR(255),
    "country_code" VARCHAR(10),
    "alternate_phone_number" VARCHAR(20),
    "dob" TIMESTAMP(3),
    "gender" VARCHAR(50),
    "citizenship" VARCHAR(100),
    "address" VARCHAR(500),
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "country" VARCHAR(100),
    "zip_code" VARCHAR(20),
    "emergency_c_name" VARCHAR(255),
    "emergency_c_relation" VARCHAR(100),
    "emergency_c_email" VARCHAR(255),
    "emergency_c_phone" VARCHAR(20),
    "profile" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_student_meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_student_interests" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "preferred_country" VARCHAR(100),
    "level_of_study" VARCHAR(100),
    "discipline" VARCHAR(100),
    "sat_score" INTEGER,
    "act_score" INTEGER,
    "toefl_score" INTEGER,
    "pte_score" INTEGER,
    "duolingo_score" INTEGER,
    "ielts_score" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_student_interests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_agent_student_meta" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "salutation" VARCHAR(50),
    "first_name" VARCHAR(255) NOT NULL,
    "middle_name" VARCHAR(255),
    "last_name" VARCHAR(255) NOT NULL,
    "alternate_email" VARCHAR(255),
    "country_code" VARCHAR(10),
    "alternate_phone_number" VARCHAR(20),
    "dob" TIMESTAMP(3),
    "gender" VARCHAR(50),
    "citizenship" VARCHAR(100),
    "address" VARCHAR(500),
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "country" VARCHAR(100),
    "zip_code" VARCHAR(20),
    "emergency_c_name" VARCHAR(255),
    "emergency_c_relation" VARCHAR(100),
    "emergency_c_email" VARCHAR(255),
    "emergency_c_phone" VARCHAR(20),
    "profile" VARCHAR(500),
    "agent_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_agent_student_meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_agent_student_interests" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "preferred_country" VARCHAR(100),
    "level_of_study" VARCHAR(100),
    "discipline" VARCHAR(100),
    "sat_score" INTEGER,
    "act_score" INTEGER,
    "toefl_score" INTEGER,
    "pte_score" INTEGER,
    "duolingo_score" INTEGER,
    "ielts_score" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_agent_student_interests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_agents" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255),
    "business_name" VARCHAR(255) NOT NULL,
    "business_certificate" VARCHAR(255),
    "agency_logo" VARCHAR(255),
    "pan_card_upload" VARCHAR(255),
    "country" VARCHAR(100) NOT NULL,
    "street_address" VARCHAR(255),
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "postal_code" VARCHAR(20),
    "website_url" VARCHAR(255),
    "instagram" VARCHAR(255),
    "facebook" VARCHAR(255),
    "linkedin" VARCHAR(255),
    "twitter" VARCHAR(255),
    "other" VARCHAR(255),
    "whatsapp_id" VARCHAR(50),
    "skype_id" VARCHAR(50),
    "ifsc_code" VARCHAR(50),
    "bank_account_number" VARCHAR(255),
    "bank_account_name" VARCHAR(50),
    "is_payment_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_admin_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_countries" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER,
    "country" VARCHAR(255) NOT NULL,
    "country_slug" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_states" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER,
    "state" VARCHAR(255) NOT NULL,
    "state_slug" VARCHAR(255) NOT NULL,
    "country_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_cities" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER,
    "city" VARCHAR(255) NOT NULL,
    "state_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_study_levels" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER,
    "study_level" VARCHAR(255) NOT NULL,
    "studylevel_slug" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_study_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_disciplines" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER,
    "discipline" VARCHAR(255) NOT NULL,
    "discipline_slug" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_partner_types" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER,
    "kind_of_partners" VARCHAR(255) NOT NULL,
    "kind_of_partners_slug" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_partner_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_university_types" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER,
    "type_of_university" VARCHAR(255) NOT NULL,
    "type_of_university_slug" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_university_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_intakes" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER,
    "intake" VARCHAR(255) NOT NULL,
    "intake_slug" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_intakes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_universities" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "university" VARCHAR(255) NOT NULL,
    "university_slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "country_id" INTEGER NOT NULL,
    "state_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    "address" TEXT,
    "map_url" TEXT,
    "location_url" TEXT,
    "kind_of_partners_id" INTEGER NOT NULL,
    "type_of_university_id" INTEGER NOT NULL,
    "collaboration" VARCHAR(50) NOT NULL,
    "partner" VARCHAR(10) NOT NULL,
    "logo" VARCHAR(255),
    "image" VARCHAR(255),
    "brocher" VARCHAR(255),
    "video_link" TEXT,
    "tution_url" VARCHAR(255),
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_universities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_university_courses" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "university_id" INTEGER NOT NULL,
    "course" VARCHAR(255) NOT NULL,
    "course_slug" VARCHAR(255) NOT NULL,
    "is_popular" BOOLEAN NOT NULL DEFAULT false,
    "country_id" INTEGER NOT NULL,
    "state_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    "study_level_id" INTEGER NOT NULL,
    "discipline_id" INTEGER NOT NULL,
    "kind_of_partners_id" INTEGER NOT NULL,
    "type_of_university_id" INTEGER NOT NULL,
    "intake_id" INTEGER,
    "gre_score" VARCHAR(255),
    "gmat_score" VARCHAR(255),
    "ielts_score" VARCHAR(255),
    "toefl_score" VARCHAR(255),
    "pte_score" VARCHAR(255),
    "sat_score" VARCHAR(255),
    "act_score" VARCHAR(255),
    "duolingo_score" VARCHAR(255),
    "gpa_score" VARCHAR(255),
    "tution_fees" VARCHAR(255),
    "application_fee" VARCHAR(255),
    "external_evaluation" VARCHAR(255),
    "about_the_course" TEXT,
    "admission_requirements" TEXT,
    "application_deadline" TEXT,
    "tuition_fee" TEXT,
    "image1" TEXT,
    "image2" TEXT,
    "image3" TEXT,
    "image4" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_university_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_applications_status" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "status" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_applications_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_student_applications" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "portal_student_id" VARCHAR(20),
    "application_login" VARCHAR(255),
    "application_password" VARCHAR(255),
    "university_slug" VARCHAR(255) NOT NULL,
    "level_slug" VARCHAR(255) NOT NULL,
    "discipline_slug" VARCHAR(255) NOT NULL,
    "course_slug" VARCHAR(255) NOT NULL,
    "intake_slug" VARCHAR(255) NOT NULL,
    "year" VARCHAR(255) NOT NULL,
    "applied_date" VARCHAR(255) NOT NULL,
    "status_id" INTEGER,
    "application_status_id" INTEGER NOT NULL DEFAULT 1,
    "fee_status" "FeeStatus",
    "assigned_to" INTEGER NOT NULL,
    "sender_id" INTEGER,
    "notification" INTEGER,
    "front_notification" INTEGER,
    "high_school_file" VARCHAR(255),
    "higher_education_file" VARCHAR(255),
    "degree_certificate" VARCHAR(255),
    "passport_file" VARCHAR(255),
    "gre_gmat_file" VARCHAR(255),
    "act_sat_file" VARCHAR(255),
    "english_language_score_file" VARCHAR(255),
    "resume_file" VARCHAR(255),
    "sop_file" VARCHAR(255),
    "lor_file" VARCHAR(255),
    "financial_file" VARCHAR(255),
    "additional_file" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_student_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_agent_student_applications" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "agent_student_id" INTEGER NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "portal_student_id" VARCHAR(20),
    "application_login" VARCHAR(255),
    "application_password" VARCHAR(255),
    "university_slug" VARCHAR(255) NOT NULL,
    "level_slug" VARCHAR(255) NOT NULL,
    "discipline_slug" VARCHAR(255) NOT NULL,
    "course_slug" VARCHAR(255) NOT NULL,
    "intake_slug" VARCHAR(255) NOT NULL,
    "year" VARCHAR(255) NOT NULL,
    "applied_date" VARCHAR(255) NOT NULL,
    "status_id" INTEGER,
    "application_status_id" INTEGER NOT NULL DEFAULT 1,
    "fee_status" "FeeStatus",
    "assigned_to" INTEGER NOT NULL,
    "designated_contact_id" INTEGER NOT NULL,
    "sender_id" INTEGER,
    "notification" INTEGER,
    "front_notification" INTEGER,
    "high_school_file" VARCHAR(255),
    "higher_education_file" VARCHAR(255),
    "degree_certificate" VARCHAR(255),
    "passport_file" VARCHAR(255),
    "gre_gmat_file" VARCHAR(255),
    "act_sat_file" VARCHAR(255),
    "english_language_score_file" VARCHAR(255),
    "resume_file" VARCHAR(255),
    "sop_file" VARCHAR(255),
    "lor_file" VARCHAR(255),
    "financial_file" VARCHAR(255),
    "additional_file" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_agent_student_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_track_student_app_status" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "application_id" INTEGER NOT NULL,
    "applied" TIMESTAMP(3),
    "received" TIMESTAMP(3),
    "incomplete_application" TIMESTAMP(3),
    "documents_pending" TIMESTAMP(3),
    "application_complete" TIMESTAMP(3),
    "application_submitted_to_university" TIMESTAMP(3),
    "fully_admitted" TIMESTAMP(3),
    "conditionally_admitted" TIMESTAMP(3),
    "denied" TIMESTAMP(3),
    "i20_issued" TIMESTAMP(3),
    "i20_received" TIMESTAMP(3),
    "visa_appointment" TIMESTAMP(3),
    "visa_approved" TIMESTAMP(3),
    "visa_denied" TIMESTAMP(3),
    "deferred_admission" TIMESTAMP(3),
    "arrived_on_campus" TIMESTAMP(3),
    "application_withdrawn" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_track_student_app_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_track_agent_app_status" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "agent_student_id" INTEGER NOT NULL,
    "agent_id" INTEGER NOT NULL,
    "application_id" INTEGER NOT NULL,
    "applied" TIMESTAMP(3),
    "received" TIMESTAMP(3),
    "incomplete_application" TIMESTAMP(3),
    "documents_pending" TIMESTAMP(3),
    "application_complete" TIMESTAMP(3),
    "application_submitted_to_university" TIMESTAMP(3),
    "fully_admitted" TIMESTAMP(3),
    "conditionally_admitted" TIMESTAMP(3),
    "denied" TIMESTAMP(3),
    "i20_issued" TIMESTAMP(3),
    "i20_received" TIMESTAMP(3),
    "visa_appointment" TIMESTAMP(3),
    "visa_approved" TIMESTAMP(3),
    "visa_denied" TIMESTAMP(3),
    "deferred_admission" TIMESTAMP(3),
    "arrived_on_campus" TIMESTAMP(3),
    "application_withdrawn" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_track_agent_app_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_student_required_docs" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "study_level" VARCHAR(255) NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "document_key" VARCHAR(255) NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_student_required_docs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_agent_student_required_docs" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "study_level" VARCHAR(255) NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "document_key" VARCHAR(255) NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_agent_student_required_docs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_student_app_required_docs" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "application_id" INTEGER NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "document_key" VARCHAR(255) NOT NULL,
    "link" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_student_app_required_docs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_agent_student_app_required_docs" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "application_id" INTEGER NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "document_key" VARCHAR(255) NOT NULL,
    "link" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_agent_student_app_required_docs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_student_application_docs" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "application_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "document_type_id" INTEGER NOT NULL,
    "file_path" VARCHAR(255) NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "DocStatus" NOT NULL DEFAULT 'Pending',
    "verified_by" INTEGER,
    "verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_student_application_docs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_agent_student_application_docs" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "application_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "document_type_id" INTEGER NOT NULL,
    "file_path" VARCHAR(255) NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "DocStatus" NOT NULL DEFAULT 'Pending',
    "verified_by" INTEGER,
    "verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_agent_student_application_docs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_student_docs" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "document_type_id" INTEGER NOT NULL,
    "file_path" VARCHAR(255) NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "DocStatus" NOT NULL DEFAULT 'Pending',
    "verified_by" INTEGER,
    "verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_student_docs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tech_agent_student_docs" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "document_type_id" INTEGER NOT NULL,
    "file_path" VARCHAR(255) NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "DocStatus" NOT NULL DEFAULT 'Pending',
    "verified_by" INTEGER,
    "verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tech_agent_student_docs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tech_tenant_users_tenantId_idx" ON "tech_tenant_users"("tenantId");

-- CreateIndex
CREATE INDEX "tech_tenant_users_userId_idx" ON "tech_tenant_users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tech_tenant_users_tenantId_userId_key" ON "tech_tenant_users"("tenantId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "tech_student_meta_uuid_key" ON "tech_student_meta"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_student_meta_user_id_key" ON "tech_student_meta"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_student_meta_alternate_email_key" ON "tech_student_meta"("alternate_email");

-- CreateIndex
CREATE INDEX "tech_student_meta_tenant_id_idx" ON "tech_student_meta"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_student_meta_user_id_idx" ON "tech_student_meta"("user_id");

-- CreateIndex
CREATE INDEX "tech_student_meta_alternate_email_idx" ON "tech_student_meta"("alternate_email");

-- CreateIndex
CREATE INDEX "tech_student_meta_alternate_phone_number_idx" ON "tech_student_meta"("alternate_phone_number");

-- CreateIndex
CREATE INDEX "tech_student_meta_citizenship_idx" ON "tech_student_meta"("citizenship");

-- CreateIndex
CREATE INDEX "tech_student_meta_country_idx" ON "tech_student_meta"("country");

-- CreateIndex
CREATE INDEX "tech_student_meta_created_at_idx" ON "tech_student_meta"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_student_meta_tenant_id_user_id_key" ON "tech_student_meta"("tenant_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_student_interests_uuid_key" ON "tech_student_interests"("uuid");

-- CreateIndex
CREATE INDEX "tech_student_interests_tenant_id_idx" ON "tech_student_interests"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_student_interests_student_id_idx" ON "tech_student_interests"("student_id");

-- CreateIndex
CREATE INDEX "tech_student_interests_preferred_country_idx" ON "tech_student_interests"("preferred_country");

-- CreateIndex
CREATE INDEX "tech_student_interests_level_of_study_idx" ON "tech_student_interests"("level_of_study");

-- CreateIndex
CREATE INDEX "tech_student_interests_discipline_idx" ON "tech_student_interests"("discipline");

-- CreateIndex
CREATE INDEX "tech_student_interests_created_at_idx" ON "tech_student_interests"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_student_interests_tenant_id_student_id_key" ON "tech_student_interests"("tenant_id", "student_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_meta_uuid_key" ON "tech_agent_student_meta"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_meta_user_id_key" ON "tech_agent_student_meta"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_meta_alternate_email_key" ON "tech_agent_student_meta"("alternate_email");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_meta_agent_id_key" ON "tech_agent_student_meta"("agent_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_meta_tenant_id_idx" ON "tech_agent_student_meta"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_meta_user_id_idx" ON "tech_agent_student_meta"("user_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_meta_agent_id_idx" ON "tech_agent_student_meta"("agent_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_meta_alternate_email_idx" ON "tech_agent_student_meta"("alternate_email");

-- CreateIndex
CREATE INDEX "tech_agent_student_meta_alternate_phone_number_idx" ON "tech_agent_student_meta"("alternate_phone_number");

-- CreateIndex
CREATE INDEX "tech_agent_student_meta_citizenship_idx" ON "tech_agent_student_meta"("citizenship");

-- CreateIndex
CREATE INDEX "tech_agent_student_meta_country_idx" ON "tech_agent_student_meta"("country");

-- CreateIndex
CREATE INDEX "tech_agent_student_meta_created_at_idx" ON "tech_agent_student_meta"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_meta_tenant_id_user_id_key" ON "tech_agent_student_meta"("tenant_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_interests_uuid_key" ON "tech_agent_student_interests"("uuid");

-- CreateIndex
CREATE INDEX "tech_agent_student_interests_tenant_id_idx" ON "tech_agent_student_interests"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_interests_student_id_idx" ON "tech_agent_student_interests"("student_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_interests_preferred_country_idx" ON "tech_agent_student_interests"("preferred_country");

-- CreateIndex
CREATE INDEX "tech_agent_student_interests_level_of_study_idx" ON "tech_agent_student_interests"("level_of_study");

-- CreateIndex
CREATE INDEX "tech_agent_student_interests_discipline_idx" ON "tech_agent_student_interests"("discipline");

-- CreateIndex
CREATE INDEX "tech_agent_student_interests_created_at_idx" ON "tech_agent_student_interests"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_interests_tenant_id_student_id_key" ON "tech_agent_student_interests"("tenant_id", "student_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agents_uuid_key" ON "tech_agents"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agents_user_id_key" ON "tech_agents"("user_id");

-- CreateIndex
CREATE INDEX "tech_agents_tenant_id_idx" ON "tech_agents"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_agents_user_id_idx" ON "tech_agents"("user_id");

-- CreateIndex
CREATE INDEX "tech_agents_business_name_idx" ON "tech_agents"("business_name");

-- CreateIndex
CREATE INDEX "tech_agents_country_idx" ON "tech_agents"("country");

-- CreateIndex
CREATE INDEX "tech_agents_is_admin_verified_idx" ON "tech_agents"("is_admin_verified");

-- CreateIndex
CREATE INDEX "tech_agents_created_at_idx" ON "tech_agents"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agents_tenant_id_user_id_key" ON "tech_agents"("tenant_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_countries_uuid_key" ON "tech_countries"("uuid");

-- CreateIndex
CREATE INDEX "tech_countries_country_idx" ON "tech_countries"("country");

-- CreateIndex
CREATE INDEX "tech_countries_country_slug_idx" ON "tech_countries"("country_slug");

-- CreateIndex
CREATE INDEX "tech_countries_tenant_id_idx" ON "tech_countries"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_countries_tenant_id_country_slug_key" ON "tech_countries"("tenant_id", "country_slug");

-- CreateIndex
CREATE UNIQUE INDEX "tech_states_uuid_key" ON "tech_states"("uuid");

-- CreateIndex
CREATE INDEX "tech_states_state_idx" ON "tech_states"("state");

-- CreateIndex
CREATE INDEX "tech_states_state_slug_idx" ON "tech_states"("state_slug");

-- CreateIndex
CREATE INDEX "tech_states_country_id_idx" ON "tech_states"("country_id");

-- CreateIndex
CREATE INDEX "tech_states_tenant_id_idx" ON "tech_states"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_states_tenant_id_state_slug_key" ON "tech_states"("tenant_id", "state_slug");

-- CreateIndex
CREATE UNIQUE INDEX "tech_cities_uuid_key" ON "tech_cities"("uuid");

-- CreateIndex
CREATE INDEX "tech_cities_city_idx" ON "tech_cities"("city");

-- CreateIndex
CREATE INDEX "tech_cities_state_id_idx" ON "tech_cities"("state_id");

-- CreateIndex
CREATE INDEX "tech_cities_tenant_id_idx" ON "tech_cities"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_cities_tenant_id_city_state_id_key" ON "tech_cities"("tenant_id", "city", "state_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_study_levels_uuid_key" ON "tech_study_levels"("uuid");

-- CreateIndex
CREATE INDEX "tech_study_levels_study_level_idx" ON "tech_study_levels"("study_level");

-- CreateIndex
CREATE INDEX "tech_study_levels_studylevel_slug_idx" ON "tech_study_levels"("studylevel_slug");

-- CreateIndex
CREATE INDEX "tech_study_levels_tenant_id_idx" ON "tech_study_levels"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_study_levels_tenant_id_studylevel_slug_key" ON "tech_study_levels"("tenant_id", "studylevel_slug");

-- CreateIndex
CREATE UNIQUE INDEX "tech_disciplines_uuid_key" ON "tech_disciplines"("uuid");

-- CreateIndex
CREATE INDEX "tech_disciplines_discipline_idx" ON "tech_disciplines"("discipline");

-- CreateIndex
CREATE INDEX "tech_disciplines_discipline_slug_idx" ON "tech_disciplines"("discipline_slug");

-- CreateIndex
CREATE INDEX "tech_disciplines_tenant_id_idx" ON "tech_disciplines"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_disciplines_tenant_id_discipline_slug_key" ON "tech_disciplines"("tenant_id", "discipline_slug");

-- CreateIndex
CREATE UNIQUE INDEX "tech_partner_types_uuid_key" ON "tech_partner_types"("uuid");

-- CreateIndex
CREATE INDEX "tech_partner_types_kind_of_partners_idx" ON "tech_partner_types"("kind_of_partners");

-- CreateIndex
CREATE INDEX "tech_partner_types_kind_of_partners_slug_idx" ON "tech_partner_types"("kind_of_partners_slug");

-- CreateIndex
CREATE INDEX "tech_partner_types_tenant_id_idx" ON "tech_partner_types"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_partner_types_tenant_id_kind_of_partners_slug_key" ON "tech_partner_types"("tenant_id", "kind_of_partners_slug");

-- CreateIndex
CREATE UNIQUE INDEX "tech_university_types_uuid_key" ON "tech_university_types"("uuid");

-- CreateIndex
CREATE INDEX "tech_university_types_type_of_university_idx" ON "tech_university_types"("type_of_university");

-- CreateIndex
CREATE INDEX "tech_university_types_type_of_university_slug_idx" ON "tech_university_types"("type_of_university_slug");

-- CreateIndex
CREATE INDEX "tech_university_types_tenant_id_idx" ON "tech_university_types"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_university_types_tenant_id_type_of_university_slug_key" ON "tech_university_types"("tenant_id", "type_of_university_slug");

-- CreateIndex
CREATE UNIQUE INDEX "tech_intakes_uuid_key" ON "tech_intakes"("uuid");

-- CreateIndex
CREATE INDEX "tech_intakes_intake_idx" ON "tech_intakes"("intake");

-- CreateIndex
CREATE INDEX "tech_intakes_intake_slug_idx" ON "tech_intakes"("intake_slug");

-- CreateIndex
CREATE INDEX "tech_intakes_tenant_id_idx" ON "tech_intakes"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_intakes_tenant_id_intake_slug_key" ON "tech_intakes"("tenant_id", "intake_slug");

-- CreateIndex
CREATE UNIQUE INDEX "tech_universities_uuid_key" ON "tech_universities"("uuid");

-- CreateIndex
CREATE INDEX "tech_universities_university_idx" ON "tech_universities"("university");

-- CreateIndex
CREATE INDEX "tech_universities_university_slug_idx" ON "tech_universities"("university_slug");

-- CreateIndex
CREATE INDEX "tech_universities_country_id_idx" ON "tech_universities"("country_id");

-- CreateIndex
CREATE INDEX "tech_universities_state_id_idx" ON "tech_universities"("state_id");

-- CreateIndex
CREATE INDEX "tech_universities_city_id_idx" ON "tech_universities"("city_id");

-- CreateIndex
CREATE INDEX "tech_universities_kind_of_partners_id_idx" ON "tech_universities"("kind_of_partners_id");

-- CreateIndex
CREATE INDEX "tech_universities_type_of_university_id_idx" ON "tech_universities"("type_of_university_id");

-- CreateIndex
CREATE INDEX "tech_universities_partner_idx" ON "tech_universities"("partner");

-- CreateIndex
CREATE INDEX "tech_universities_created_at_idx" ON "tech_universities"("created_at");

-- CreateIndex
CREATE INDEX "tech_universities_tenant_id_idx" ON "tech_universities"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_universities_tenant_id_university_slug_key" ON "tech_universities"("tenant_id", "university_slug");

-- CreateIndex
CREATE UNIQUE INDEX "tech_university_courses_uuid_key" ON "tech_university_courses"("uuid");

-- CreateIndex
CREATE INDEX "tech_university_courses_university_id_idx" ON "tech_university_courses"("university_id");

-- CreateIndex
CREATE INDEX "tech_university_courses_course_idx" ON "tech_university_courses"("course");

-- CreateIndex
CREATE INDEX "tech_university_courses_course_slug_idx" ON "tech_university_courses"("course_slug");

-- CreateIndex
CREATE INDEX "tech_university_courses_country_id_idx" ON "tech_university_courses"("country_id");

-- CreateIndex
CREATE INDEX "tech_university_courses_state_id_idx" ON "tech_university_courses"("state_id");

-- CreateIndex
CREATE INDEX "tech_university_courses_city_id_idx" ON "tech_university_courses"("city_id");

-- CreateIndex
CREATE INDEX "tech_university_courses_study_level_id_idx" ON "tech_university_courses"("study_level_id");

-- CreateIndex
CREATE INDEX "tech_university_courses_discipline_id_idx" ON "tech_university_courses"("discipline_id");

-- CreateIndex
CREATE INDEX "tech_university_courses_kind_of_partners_id_idx" ON "tech_university_courses"("kind_of_partners_id");

-- CreateIndex
CREATE INDEX "tech_university_courses_type_of_university_id_idx" ON "tech_university_courses"("type_of_university_id");

-- CreateIndex
CREATE INDEX "tech_university_courses_intake_id_idx" ON "tech_university_courses"("intake_id");

-- CreateIndex
CREATE INDEX "tech_university_courses_is_popular_idx" ON "tech_university_courses"("is_popular");

-- CreateIndex
CREATE INDEX "tech_university_courses_created_at_idx" ON "tech_university_courses"("created_at");

-- CreateIndex
CREATE INDEX "tech_university_courses_tenant_id_idx" ON "tech_university_courses"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_university_courses_tenant_id_course_slug_key" ON "tech_university_courses"("tenant_id", "course_slug");

-- CreateIndex
CREATE UNIQUE INDEX "tech_applications_status_uuid_key" ON "tech_applications_status"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_applications_status_status_key" ON "tech_applications_status"("status");

-- CreateIndex
CREATE INDEX "tech_applications_status_status_idx" ON "tech_applications_status"("status");

-- CreateIndex
CREATE INDEX "tech_applications_status_created_at_idx" ON "tech_applications_status"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_student_applications_uuid_key" ON "tech_student_applications"("uuid");

-- CreateIndex
CREATE INDEX "tech_student_applications_tenant_id_idx" ON "tech_student_applications"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_student_applications_student_id_idx" ON "tech_student_applications"("student_id");

-- CreateIndex
CREATE INDEX "tech_student_applications_course_id_idx" ON "tech_student_applications"("course_id");

-- CreateIndex
CREATE INDEX "tech_student_applications_status_id_idx" ON "tech_student_applications"("status_id");

-- CreateIndex
CREATE INDEX "tech_student_applications_university_slug_idx" ON "tech_student_applications"("university_slug");

-- CreateIndex
CREATE INDEX "tech_student_applications_course_slug_idx" ON "tech_student_applications"("course_slug");

-- CreateIndex
CREATE INDEX "tech_student_applications_application_status_id_idx" ON "tech_student_applications"("application_status_id");

-- CreateIndex
CREATE INDEX "tech_student_applications_fee_status_idx" ON "tech_student_applications"("fee_status");

-- CreateIndex
CREATE INDEX "tech_student_applications_created_at_idx" ON "tech_student_applications"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_applications_uuid_key" ON "tech_agent_student_applications"("uuid");

-- CreateIndex
CREATE INDEX "tech_agent_student_applications_tenant_id_idx" ON "tech_agent_student_applications"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_applications_agent_student_id_idx" ON "tech_agent_student_applications"("agent_student_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_applications_agent_id_idx" ON "tech_agent_student_applications"("agent_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_applications_course_id_idx" ON "tech_agent_student_applications"("course_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_applications_status_id_idx" ON "tech_agent_student_applications"("status_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_applications_university_slug_idx" ON "tech_agent_student_applications"("university_slug");

-- CreateIndex
CREATE INDEX "tech_agent_student_applications_course_slug_idx" ON "tech_agent_student_applications"("course_slug");

-- CreateIndex
CREATE INDEX "tech_agent_student_applications_application_status_id_idx" ON "tech_agent_student_applications"("application_status_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_applications_fee_status_idx" ON "tech_agent_student_applications"("fee_status");

-- CreateIndex
CREATE INDEX "tech_agent_student_applications_assigned_to_idx" ON "tech_agent_student_applications"("assigned_to");

-- CreateIndex
CREATE INDEX "tech_agent_student_applications_created_at_idx" ON "tech_agent_student_applications"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_track_student_app_status_uuid_key" ON "tech_track_student_app_status"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_track_student_app_status_application_id_key" ON "tech_track_student_app_status"("application_id");

-- CreateIndex
CREATE INDEX "tech_track_student_app_status_tenant_id_idx" ON "tech_track_student_app_status"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_track_student_app_status_user_id_idx" ON "tech_track_student_app_status"("user_id");

-- CreateIndex
CREATE INDEX "tech_track_student_app_status_student_id_idx" ON "tech_track_student_app_status"("student_id");

-- CreateIndex
CREATE INDEX "tech_track_student_app_status_application_id_idx" ON "tech_track_student_app_status"("application_id");

-- CreateIndex
CREATE INDEX "tech_track_student_app_status_created_at_idx" ON "tech_track_student_app_status"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_track_student_app_status_tenant_id_application_id_key" ON "tech_track_student_app_status"("tenant_id", "application_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_track_agent_app_status_uuid_key" ON "tech_track_agent_app_status"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_track_agent_app_status_application_id_key" ON "tech_track_agent_app_status"("application_id");

-- CreateIndex
CREATE INDEX "tech_track_agent_app_status_tenant_id_idx" ON "tech_track_agent_app_status"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_track_agent_app_status_user_id_idx" ON "tech_track_agent_app_status"("user_id");

-- CreateIndex
CREATE INDEX "tech_track_agent_app_status_agent_student_id_idx" ON "tech_track_agent_app_status"("agent_student_id");

-- CreateIndex
CREATE INDEX "tech_track_agent_app_status_agent_id_idx" ON "tech_track_agent_app_status"("agent_id");

-- CreateIndex
CREATE INDEX "tech_track_agent_app_status_application_id_idx" ON "tech_track_agent_app_status"("application_id");

-- CreateIndex
CREATE INDEX "tech_track_agent_app_status_created_at_idx" ON "tech_track_agent_app_status"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_track_agent_app_status_tenant_id_application_id_key" ON "tech_track_agent_app_status"("tenant_id", "application_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_student_required_docs_uuid_key" ON "tech_student_required_docs"("uuid");

-- CreateIndex
CREATE INDEX "tech_student_required_docs_tenant_id_idx" ON "tech_student_required_docs"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_student_required_docs_study_level_idx" ON "tech_student_required_docs"("study_level");

-- CreateIndex
CREATE INDEX "tech_student_required_docs_document_key_idx" ON "tech_student_required_docs"("document_key");

-- CreateIndex
CREATE INDEX "tech_student_required_docs_required_idx" ON "tech_student_required_docs"("required");

-- CreateIndex
CREATE INDEX "tech_student_required_docs_created_at_idx" ON "tech_student_required_docs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_student_required_docs_tenant_id_study_level_document_k_key" ON "tech_student_required_docs"("tenant_id", "study_level", "document_key");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_required_docs_uuid_key" ON "tech_agent_student_required_docs"("uuid");

-- CreateIndex
CREATE INDEX "tech_agent_student_required_docs_tenant_id_idx" ON "tech_agent_student_required_docs"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_required_docs_study_level_idx" ON "tech_agent_student_required_docs"("study_level");

-- CreateIndex
CREATE INDEX "tech_agent_student_required_docs_document_key_idx" ON "tech_agent_student_required_docs"("document_key");

-- CreateIndex
CREATE INDEX "tech_agent_student_required_docs_required_idx" ON "tech_agent_student_required_docs"("required");

-- CreateIndex
CREATE INDEX "tech_agent_student_required_docs_created_at_idx" ON "tech_agent_student_required_docs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_required_docs_tenant_id_study_level_docu_key" ON "tech_agent_student_required_docs"("tenant_id", "study_level", "document_key");

-- CreateIndex
CREATE UNIQUE INDEX "tech_student_app_required_docs_uuid_key" ON "tech_student_app_required_docs"("uuid");

-- CreateIndex
CREATE INDEX "tech_student_app_required_docs_tenant_id_idx" ON "tech_student_app_required_docs"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_student_app_required_docs_application_id_idx" ON "tech_student_app_required_docs"("application_id");

-- CreateIndex
CREATE INDEX "tech_student_app_required_docs_document_key_idx" ON "tech_student_app_required_docs"("document_key");

-- CreateIndex
CREATE INDEX "tech_student_app_required_docs_required_idx" ON "tech_student_app_required_docs"("required");

-- CreateIndex
CREATE INDEX "tech_student_app_required_docs_created_at_idx" ON "tech_student_app_required_docs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_student_app_required_docs_tenant_id_application_id_doc_key" ON "tech_student_app_required_docs"("tenant_id", "application_id", "document_key");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_app_required_docs_uuid_key" ON "tech_agent_student_app_required_docs"("uuid");

-- CreateIndex
CREATE INDEX "tech_agent_student_app_required_docs_tenant_id_idx" ON "tech_agent_student_app_required_docs"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_app_required_docs_application_id_idx" ON "tech_agent_student_app_required_docs"("application_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_app_required_docs_document_key_idx" ON "tech_agent_student_app_required_docs"("document_key");

-- CreateIndex
CREATE INDEX "tech_agent_student_app_required_docs_required_idx" ON "tech_agent_student_app_required_docs"("required");

-- CreateIndex
CREATE INDEX "tech_agent_student_app_required_docs_created_at_idx" ON "tech_agent_student_app_required_docs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_app_required_docs_tenant_id_application__key" ON "tech_agent_student_app_required_docs"("tenant_id", "application_id", "document_key");

-- CreateIndex
CREATE UNIQUE INDEX "tech_student_application_docs_uuid_key" ON "tech_student_application_docs"("uuid");

-- CreateIndex
CREATE INDEX "tech_student_application_docs_tenant_id_idx" ON "tech_student_application_docs"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_student_application_docs_application_id_idx" ON "tech_student_application_docs"("application_id");

-- CreateIndex
CREATE INDEX "tech_student_application_docs_user_id_idx" ON "tech_student_application_docs"("user_id");

-- CreateIndex
CREATE INDEX "tech_student_application_docs_document_type_id_idx" ON "tech_student_application_docs"("document_type_id");

-- CreateIndex
CREATE INDEX "tech_student_application_docs_status_idx" ON "tech_student_application_docs"("status");

-- CreateIndex
CREATE INDEX "tech_student_application_docs_verified_by_idx" ON "tech_student_application_docs"("verified_by");

-- CreateIndex
CREATE INDEX "tech_student_application_docs_uploaded_at_idx" ON "tech_student_application_docs"("uploaded_at");

-- CreateIndex
CREATE INDEX "tech_student_application_docs_created_at_idx" ON "tech_student_application_docs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_student_application_docs_tenant_id_application_id_docu_key" ON "tech_student_application_docs"("tenant_id", "application_id", "document_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_application_docs_uuid_key" ON "tech_agent_student_application_docs"("uuid");

-- CreateIndex
CREATE INDEX "tech_agent_student_application_docs_tenant_id_idx" ON "tech_agent_student_application_docs"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_application_docs_application_id_idx" ON "tech_agent_student_application_docs"("application_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_application_docs_user_id_idx" ON "tech_agent_student_application_docs"("user_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_application_docs_document_type_id_idx" ON "tech_agent_student_application_docs"("document_type_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_application_docs_status_idx" ON "tech_agent_student_application_docs"("status");

-- CreateIndex
CREATE INDEX "tech_agent_student_application_docs_verified_by_idx" ON "tech_agent_student_application_docs"("verified_by");

-- CreateIndex
CREATE INDEX "tech_agent_student_application_docs_uploaded_at_idx" ON "tech_agent_student_application_docs"("uploaded_at");

-- CreateIndex
CREATE INDEX "tech_agent_student_application_docs_created_at_idx" ON "tech_agent_student_application_docs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_application_docs_tenant_id_application_i_key" ON "tech_agent_student_application_docs"("tenant_id", "application_id", "document_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_student_docs_uuid_key" ON "tech_student_docs"("uuid");

-- CreateIndex
CREATE INDEX "tech_student_docs_tenant_id_idx" ON "tech_student_docs"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_student_docs_user_id_idx" ON "tech_student_docs"("user_id");

-- CreateIndex
CREATE INDEX "tech_student_docs_document_type_id_idx" ON "tech_student_docs"("document_type_id");

-- CreateIndex
CREATE INDEX "tech_student_docs_status_idx" ON "tech_student_docs"("status");

-- CreateIndex
CREATE INDEX "tech_student_docs_verified_by_idx" ON "tech_student_docs"("verified_by");

-- CreateIndex
CREATE INDEX "tech_student_docs_uploaded_at_idx" ON "tech_student_docs"("uploaded_at");

-- CreateIndex
CREATE INDEX "tech_student_docs_created_at_idx" ON "tech_student_docs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_student_docs_tenant_id_user_id_document_type_id_key" ON "tech_student_docs"("tenant_id", "user_id", "document_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_docs_uuid_key" ON "tech_agent_student_docs"("uuid");

-- CreateIndex
CREATE INDEX "tech_agent_student_docs_tenant_id_idx" ON "tech_agent_student_docs"("tenant_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_docs_user_id_idx" ON "tech_agent_student_docs"("user_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_docs_document_type_id_idx" ON "tech_agent_student_docs"("document_type_id");

-- CreateIndex
CREATE INDEX "tech_agent_student_docs_status_idx" ON "tech_agent_student_docs"("status");

-- CreateIndex
CREATE INDEX "tech_agent_student_docs_verified_by_idx" ON "tech_agent_student_docs"("verified_by");

-- CreateIndex
CREATE INDEX "tech_agent_student_docs_uploaded_at_idx" ON "tech_agent_student_docs"("uploaded_at");

-- CreateIndex
CREATE INDEX "tech_agent_student_docs_created_at_idx" ON "tech_agent_student_docs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tech_agent_student_docs_tenant_id_user_id_document_type_id_key" ON "tech_agent_student_docs"("tenant_id", "user_id", "document_type_id");

-- AddForeignKey
ALTER TABLE "tech_tenant_users" ADD CONSTRAINT "tech_tenant_users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tech_tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_tenant_users" ADD CONSTRAINT "tech_tenant_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tech_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_student_meta" ADD CONSTRAINT "tech_student_meta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tech_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_student_interests" ADD CONSTRAINT "tech_student_interests_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "tech_student_meta"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_meta" ADD CONSTRAINT "tech_agent_student_meta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tech_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_meta" ADD CONSTRAINT "tech_agent_student_meta_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "tech_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_interests" ADD CONSTRAINT "tech_agent_student_interests_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "tech_agent_student_meta"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agents" ADD CONSTRAINT "tech_agents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tech_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_countries" ADD CONSTRAINT "tech_countries_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tech_tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_states" ADD CONSTRAINT "tech_states_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tech_tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_states" ADD CONSTRAINT "tech_states_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "tech_countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_cities" ADD CONSTRAINT "tech_cities_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tech_tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_cities" ADD CONSTRAINT "tech_cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "tech_states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_study_levels" ADD CONSTRAINT "tech_study_levels_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tech_tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_disciplines" ADD CONSTRAINT "tech_disciplines_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tech_tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_partner_types" ADD CONSTRAINT "tech_partner_types_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tech_tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_university_types" ADD CONSTRAINT "tech_university_types_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tech_tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_intakes" ADD CONSTRAINT "tech_intakes_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tech_tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_universities" ADD CONSTRAINT "tech_universities_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tech_tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_universities" ADD CONSTRAINT "tech_universities_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "tech_countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_universities" ADD CONSTRAINT "tech_universities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "tech_states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_universities" ADD CONSTRAINT "tech_universities_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "tech_cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_universities" ADD CONSTRAINT "tech_universities_kind_of_partners_id_fkey" FOREIGN KEY ("kind_of_partners_id") REFERENCES "tech_partner_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_universities" ADD CONSTRAINT "tech_universities_type_of_university_id_fkey" FOREIGN KEY ("type_of_university_id") REFERENCES "tech_university_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_university_courses" ADD CONSTRAINT "tech_university_courses_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tech_tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_university_courses" ADD CONSTRAINT "tech_university_courses_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "tech_universities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_university_courses" ADD CONSTRAINT "tech_university_courses_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "tech_countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_university_courses" ADD CONSTRAINT "tech_university_courses_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "tech_states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_university_courses" ADD CONSTRAINT "tech_university_courses_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "tech_cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_university_courses" ADD CONSTRAINT "tech_university_courses_study_level_id_fkey" FOREIGN KEY ("study_level_id") REFERENCES "tech_study_levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_university_courses" ADD CONSTRAINT "tech_university_courses_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "tech_disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_university_courses" ADD CONSTRAINT "tech_university_courses_kind_of_partners_id_fkey" FOREIGN KEY ("kind_of_partners_id") REFERENCES "tech_partner_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_university_courses" ADD CONSTRAINT "tech_university_courses_type_of_university_id_fkey" FOREIGN KEY ("type_of_university_id") REFERENCES "tech_university_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_university_courses" ADD CONSTRAINT "tech_university_courses_intake_id_fkey" FOREIGN KEY ("intake_id") REFERENCES "tech_intakes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_student_applications" ADD CONSTRAINT "tech_student_applications_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "tech_student_meta"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_student_applications" ADD CONSTRAINT "tech_student_applications_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "tech_university_courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_student_applications" ADD CONSTRAINT "tech_student_applications_application_status_id_fkey" FOREIGN KEY ("application_status_id") REFERENCES "tech_applications_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_student_applications" ADD CONSTRAINT "tech_student_applications_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "tech_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_applications" ADD CONSTRAINT "tech_agent_student_applications_agent_student_id_fkey" FOREIGN KEY ("agent_student_id") REFERENCES "tech_agent_student_meta"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_applications" ADD CONSTRAINT "tech_agent_student_applications_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "tech_agents"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_applications" ADD CONSTRAINT "tech_agent_student_applications_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "tech_university_courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_applications" ADD CONSTRAINT "tech_agent_student_applications_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "tech_applications_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_applications" ADD CONSTRAINT "tech_agent_student_applications_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "tech_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_track_student_app_status" ADD CONSTRAINT "tech_track_student_app_status_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tech_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_track_student_app_status" ADD CONSTRAINT "tech_track_student_app_status_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "tech_student_applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_track_agent_app_status" ADD CONSTRAINT "tech_track_agent_app_status_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tech_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_track_agent_app_status" ADD CONSTRAINT "tech_track_agent_app_status_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "tech_agents"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_track_agent_app_status" ADD CONSTRAINT "tech_track_agent_app_status_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "tech_agent_student_applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_student_app_required_docs" ADD CONSTRAINT "tech_student_app_required_docs_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "tech_student_applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_app_required_docs" ADD CONSTRAINT "tech_agent_student_app_required_docs_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "tech_agent_student_applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_student_application_docs" ADD CONSTRAINT "tech_student_application_docs_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "tech_student_applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_student_application_docs" ADD CONSTRAINT "tech_student_application_docs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tech_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_student_application_docs" ADD CONSTRAINT "tech_student_application_docs_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "tech_student_app_required_docs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_student_application_docs" ADD CONSTRAINT "tech_student_application_docs_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "tech_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_application_docs" ADD CONSTRAINT "tech_agent_student_application_docs_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "tech_agent_student_applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_application_docs" ADD CONSTRAINT "tech_agent_student_application_docs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tech_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_application_docs" ADD CONSTRAINT "tech_agent_student_application_docs_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "tech_agent_student_app_required_docs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_application_docs" ADD CONSTRAINT "tech_agent_student_application_docs_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "tech_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_student_docs" ADD CONSTRAINT "tech_student_docs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tech_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_student_docs" ADD CONSTRAINT "tech_student_docs_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "tech_student_required_docs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_student_docs" ADD CONSTRAINT "tech_student_docs_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "tech_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_docs" ADD CONSTRAINT "tech_agent_student_docs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tech_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_docs" ADD CONSTRAINT "tech_agent_student_docs_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "tech_agent_student_required_docs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_agent_student_docs" ADD CONSTRAINT "tech_agent_student_docs_verified_by_fkey" FOREIGN KEY ("verified_by") REFERENCES "tech_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
