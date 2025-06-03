import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Resetting tables...');
  await prisma.brew.deleteMany({});
  await prisma.coffeeBean.deleteMany({});
  await prisma.grinder.deleteMany({});

  console.log('Seeding coffeeBeans...');

  const coffeeBeans = await prisma.coffeeBean.createMany({
    data: [
      {
        name: 'Ethiopian Yirgacheffe',
        quantity: 12.5,
        roastLevel: 'Medium',
        origin: 'Ethiopia',
        variety: 'Arabica',
        processingMethod: 'Washed',
        flavourNotes: ['Floral', 'Citrus', 'Honey'],
        roastDate: new Date('2025-05-01'),
        purchasedFrom: 'Local Roaster',
        price: 18.99,
      },
      {
        name: 'Colombian Supremo',
        quantity: 20,
        roastLevel: 'Dark',
        origin: 'Colombia',
        variety: 'Arabica',
        processingMethod: 'Natural',
        flavourNotes: ['Chocolate', 'Nutty', 'Caramel'],
        roastDate: new Date('2025-05-10'),
        purchasedFrom: 'Coffee Importers Inc.',
        price: 15.5,
      },
      {
        name: 'Kenyan AA',
        quantity: 10,
        roastLevel: 'Light',
        origin: 'Kenya',
        variety: 'SL28',
        processingMethod: 'Washed',
        flavourNotes: ['Berry', 'Winey', 'Citrus'],
        roastDate: new Date('2025-05-14'),
        purchasedFrom: 'Kenya Direct',
        price: 19.25,
      },
      {
        name: 'Guatemalan Antigua',
        quantity: 8,
        roastLevel: 'Medium-Dark',
        origin: 'Guatemala',
        variety: 'Bourbon',
        processingMethod: 'Washed',
        flavourNotes: ['Spice', 'Chocolate', 'Smoky'],
        roastDate: new Date('2025-05-05'),
        purchasedFrom: 'Roaster Bros',
        price: 16.75,
      },
    ],
  });

  console.log('Seeding grinders...');

  const grinders = await prisma.grinder.createMany({
    data: [
      {
        name: 'Baratza Encore',
        price: 139.0,
      },
      {
        name: 'Breville Smart Grinder Pro',
        price: 199.95,
      },
      {
        name: 'Hario Skerton Pro',
        price: 49.99,
      },
      {
        name: 'Eureka Mignon Specialita',
        price: 799.0,
      },
    ],
  });

  // Fetch CoffeeBean and Grinder records (to get IDs)
  const beans = await prisma.coffeeBean.findMany();
  const grindersList = await prisma.grinder.findMany();

  console.log('Seeding brews...');

  // Create some Brew entries linked to the beans and grinders
  await prisma.brew.createMany({
    data: [
      {
        coffeeBeanId: beans[0].id,
        coffeeAmount: 18,
        waterAmount: 300,
        grinderId: grindersList[0].id,
        grindSetting: 'Medium-Fine',
        brewMethod: 'V60',
        brewTime: 180,
        notes: 'Clean and floral',
      },
      {
        coffeeBeanId: beans[1].id,
        coffeeAmount: 20,
        waterAmount: 320,
        grinderId: grindersList[1].id,
        grindSetting: 'Fine',
        brewMethod: 'Espresso',
        brewTime: 30,
        notes: 'Strong and chocolatey',
      },
      {
        coffeeBeanId: beans[2].id,
        coffeeAmount: 15,
        waterAmount: 250,
        grinderId: grindersList[2].id,
        grindSetting: 'Coarse',
        brewMethod: 'French Press',
        brewTime: 240,
        notes: 'Fruity and rich',
      },
      {
        coffeeBeanId: beans[3].id,
        coffeeAmount: 17,
        waterAmount: 310,
        grinderId: grindersList[3].id,
        grindSetting: 'Medium',
        brewMethod: 'Aeropress',
        brewTime: 120,
        notes: 'Spicy with body',
      },
    ],
  });

  const brews = await prisma.brew.findMany();
  brews.forEach(brew => console.log(brew));

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
