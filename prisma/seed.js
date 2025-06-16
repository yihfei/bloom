import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = "cmbo41e5c0000oyhdrxnscbir";

  // Clear existing records
  await prisma.brew.deleteMany({});
  await prisma.coffeeBean.deleteMany({});
  await prisma.grinder.deleteMany({});

  // Seed CoffeeBeans
  const coffeeBeans = await prisma.coffeeBean.createMany({
    data: [
      {
        name: "Arabica",
        quantity: 500,
        roastLevel: "Medium",
        origin: "Brazil",
        variety: "Bourbon",
        processingMethod: "Washed",
        flavourNotes: ["Chocolate", "Nutty"],
        roastDate: new Date("2025-06-01"),
        purchasedFrom: "Coffee Roasters Inc.",
        price: 12.99,
        userId,
      },
      {
        name: "Robusta",
        quantity: 1000,
        roastLevel: "Dark",
        origin: "Vietnam",
        variety: "Robusta",
        processingMethod: "Natural",
        flavourNotes: ["Earthy", "Bold"],
        roastDate: new Date("2025-06-05"),
        purchasedFrom: "Vietnam Coffee Co.",
        price: 9.99,
        userId,
      },
      {
        name: "Geisha",
        quantity: 250,
        roastLevel: "Light",
        origin: "Panama",
        variety: "Geisha",
        processingMethod: "Honey",
        flavourNotes: ["Floral", "Citrus"],
        roastDate: new Date("2025-06-10"),
        purchasedFrom: "Panama Coffee Collective",
        price: 25.99,
        userId,
      },
    ],
  });

  console.log("CoffeeBeans seeded:", coffeeBeans);

  // Seed Grinders
  const grinders = await prisma.grinder.createMany({
    data: [
      {
        name: "Baratza Encore",
        price: 129.99,
        userId,
      },
      {
        name: "Breville Smart Grinder Pro",
        price: 199.99,
        userId,
      },
      {
        name: "Hario Skerton Pro",
        price: 49.99,
        userId,
      },
    ],
  });

  console.log("Grinders seeded:", grinders);

  // Fetch CoffeeBean IDs after seeding
  const coffeeBeanRecords = await prisma.coffeeBean.findMany();
  const coffeeBeanIds = coffeeBeanRecords.map((bean) => bean.id);

  // Fetch Grinder IDs after seeding
  const grinderRecords = await prisma.grinder.findMany();
  const grinderIds = grinderRecords.map((grinder) => grinder.id);

  // Generate 100 brews within the past year
  const brewsData = Array.from({ length: 100 }, () => {
    const randomCoffeeBeanId = coffeeBeanIds[Math.floor(Math.random() * coffeeBeanIds.length)]; // Random CoffeeBean ID
    const randomGrinderId = grinderIds[Math.floor(Math.random() * grinderIds.length)]; // Random Grinder ID

    // Generate a random date within the past year
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    const randomDate = new Date(oneYearAgo.getTime() + Math.random() * (today.getTime() - oneYearAgo.getTime()));

    return {
      coffeeBeanId: randomCoffeeBeanId,
      coffeeAmount: Math.random() * 30 + 10, // Random coffee amount (10-40g)
      waterAmount: Math.random() * 400 + 200, // Random water amount (200-600ml)
      grinderId: randomGrinderId,
      grindSetting: ["Coarse", "Medium", "Fine"][Math.floor(Math.random() * 3)], // Random grind setting
      brewMethod: ["French Press", "Pour Over", "Espresso"][Math.floor(Math.random() * 3)], // Random brew method
      brewTime: Math.floor(Math.random() * 300) + 30, // Random brew time (30-330 seconds)
      notes: "Generated brew",
      createdAt: randomDate,
      updatedAt: randomDate,
      userId,
    };
  });

  // Seed Brews
  const brews = await prisma.brew.createMany({
    data: brewsData,
  });

  console.log("Brews seeded:", brews);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });