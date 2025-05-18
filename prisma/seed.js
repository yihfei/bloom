// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Resetting coffeeBean table');
  await prisma.coffeeBean.deleteMany({});

  console.log('Seeding database with CoffeeBean entries...');

  await prisma.coffeeBean.createMany({
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
      // Add more seed data as you want
    ],
  });

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
