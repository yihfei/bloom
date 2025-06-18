import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanUpDatabase() {
  // Delete rows from specific tables
  await prisma.brew.deleteMany({});
  await prisma.coffeeBean.deleteMany({});
  await prisma.grinder.deleteMany({});
  console.log("Deleted rows from brew, coffeeBean, and grinder tables.");
}

cleanUpDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });