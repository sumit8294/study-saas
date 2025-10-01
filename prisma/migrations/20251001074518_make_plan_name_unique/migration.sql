/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `tech_plans` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tech_plans_name_key" ON "public"."tech_plans"("name");
