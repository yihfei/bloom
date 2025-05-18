// app/actions/coffeeBeans.ts
"use server";

import prisma from "@/lib/prisma";




export async function getAllCoffeeBeans() {
  return await prisma.coffeeBean.findMany({
    orderBy: { roastDate: "desc" },
  });
}

export async function deleteCoffeeBean(id: number) {
  await prisma.coffeeBean.delete({ where: { id } });
}
