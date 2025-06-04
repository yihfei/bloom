/*
  Warnings:

  - Made the column `grinderId` on table `Brew` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notes` on table `Brew` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Brew" DROP CONSTRAINT "Brew_grinderId_fkey";

-- AlterTable
ALTER TABLE "Brew" ALTER COLUMN "grinderId" SET NOT NULL,
ALTER COLUMN "notes" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Brew" ADD CONSTRAINT "Brew_grinderId_fkey" FOREIGN KEY ("grinderId") REFERENCES "Grinder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
