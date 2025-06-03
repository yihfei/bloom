/*
  Warnings:

  - You are about to drop the column `brewDate` on the `Brew` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Brew" DROP COLUMN "brewDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
