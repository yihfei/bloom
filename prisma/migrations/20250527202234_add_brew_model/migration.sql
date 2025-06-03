-- CreateTable
CREATE TABLE "Brew" (
    "id" SERIAL NOT NULL,
    "coffeeBeanId" INTEGER NOT NULL,
    "coffeeAmount" DOUBLE PRECISION NOT NULL,
    "waterAmount" DOUBLE PRECISION NOT NULL,
    "grinderId" INTEGER,
    "grindSetting" TEXT NOT NULL,
    "brewMethod" TEXT NOT NULL,
    "brewTime" INTEGER NOT NULL,
    "brewDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brew_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Brew" ADD CONSTRAINT "Brew_coffeeBeanId_fkey" FOREIGN KEY ("coffeeBeanId") REFERENCES "CoffeeBean"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brew" ADD CONSTRAINT "Brew_grinderId_fkey" FOREIGN KEY ("grinderId") REFERENCES "Grinder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
