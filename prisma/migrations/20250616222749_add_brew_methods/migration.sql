/*
  Warnings:

  - You are about to drop the column `brewMethod` on the `Brew` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Brew" DROP COLUMN "brewMethod",
ADD COLUMN     "brewMethodId" INTEGER;

-- CreateTable
CREATE TABLE "BrewMethod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BrewMethod_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoffeeBean" ADD CONSTRAINT "CoffeeBean_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grinder" ADD CONSTRAINT "Grinder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrewMethod" ADD CONSTRAINT "BrewMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brew" ADD CONSTRAINT "Brew_brewMethodId_fkey" FOREIGN KEY ("brewMethodId") REFERENCES "BrewMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brew" ADD CONSTRAINT "Brew_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
