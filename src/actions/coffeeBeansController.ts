// app/actions/coffeeBeans.ts
"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { CoffeeBean } from "@prisma/client";


export async function createCoffeeBean(formData: FormData) : Promise<void> {
  const name = formData.get("name") as string;
  const quantity = parseInt(formData.get("quantity") as string);
  const roastLevel = formData.get("roastLevel") as string;
  const origin = formData.get("origin") as string;
  const variety = formData.get("variety") as string;
  const processingMethod = formData.get("processingMethod") as string;
  const flavourNotes = (formData.get("flavourNotes") as string)
    .split(",")
    .map((note) => note.trim());
  const roastDate = new Date(formData.get("roastDate") as string);
  const purchasedFrom = formData.get("purchasedFrom") as string;
  const price = parseFloat(formData.get("price") as string);

  await prisma.coffeeBean.create({
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
  redirect("/coffee-beans");
}

export async function readAllCoffeeBeans(): Promise<CoffeeBean[]> {
  return await prisma.coffeeBean.findMany({
    orderBy: { roastDate: "desc" },
  });
}

export async function readCoffeeBean(id: number): Promise<CoffeeBean | null> {
  return await prisma.coffeeBean.findUnique({
    where: { id },
  });
}

export async function updateCoffeeBean(id: number, formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const quantity = parseInt(formData.get("quantity") as string);
  const roastLevel = formData.get("roastLevel") as string;
  const origin = formData.get("origin") as string;
  const variety = formData.get("variety") as string;
  const processingMethod = formData.get("processingMethod") as string;
  const flavourNotes = (formData.get("flavourNotes") as string)
    .split(",")
    .map((note) => note.trim());
  const roastDate = new Date(formData.get("roastDate") as string);
  const purchasedFrom = formData.get("purchasedFrom") as string;
  const price = parseFloat(formData.get("price") as string);

  await prisma.coffeeBean.update({
    where: { id },
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

  redirect("/coffee-beans");
}

export async function deleteCoffeeBean(formData: FormData): Promise<void> {
  const id = parseInt(formData.get("id") as string);
  await prisma.coffeeBean.delete({ where: { id } });
  redirect("/coffee-beans");
}
