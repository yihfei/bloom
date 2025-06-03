-- CreateTable
CREATE TABLE "CoffeeBean" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "roastLevel" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "variety" TEXT NOT NULL,
    "processingMethod" TEXT NOT NULL,
    "flavourNotes" TEXT[],
    "roastDate" TIMESTAMP(3) NOT NULL,
    "purchasedFrom" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CoffeeBean_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grinder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Grinder_pkey" PRIMARY KEY ("id")
);
