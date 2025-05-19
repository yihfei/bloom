// app/actions/coffeeBeans.ts
"use server";

import prisma from "@/lib/prisma";


export async function getAllCoffeeBeans() {
  return await prisma.coffeeBean.findMany({
    orderBy: { roastDate: "desc" },
  });
}

export async function createCoffeeBean(formData: FormData) {
  const name = formData.get("name") as string;
  const quantity = parseInt(formData.get("quantity") as string);
  const roastLevel = formData.get("roastLevel") as string;
  const origin = formData.get("origin") as string;
  const variety = formData.get("variety") as string;
  const processingMethod = formData.get("processingMethod") as string;
  const flavourNotes = (formData.get("flavourNotes") as string).split(",").map(note => note.trim());
  const roastDate = new Date(formData.get("roastDate") as string);
  const purchasedFrom = formData.get("purchasedFrom") as string;
  const price = parseFloat(formData.get("price") as string);

  return await prisma.coffeeBean.create({
    data: {
      name,
      quantity,
      roastLevel,
      origin,
      variety,
      processingMethod,
      flavourNotes,
      roastDate,
      purchasedFrom,
      price,
    },
  });
}

export async function deleteCoffeeBean(id: number) {
  await prisma.coffeeBean.delete({ where: { id } });
}
