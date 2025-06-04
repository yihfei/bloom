-- DropForeignKey
ALTER TABLE "Brew" DROP CONSTRAINT "Brew_coffeeBeanId_fkey";

-- DropForeignKey
ALTER TABLE "Brew" DROP CONSTRAINT "Brew_grinderId_fkey";

-- AlterTable
ALTER TABLE "Brew" ALTER COLUMN "coffeeBeanId" DROP NOT NULL,
ALTER COLUMN "grinderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Brew" ADD CONSTRAINT "Brew_coffeeBeanId_fkey" FOREIGN KEY ("coffeeBeanId") REFERENCES "CoffeeBean"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brew" ADD CONSTRAINT "Brew_grinderId_fkey" FOREIGN KEY ("grinderId") REFERENCES "Grinder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
