"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { Brew, Grinder, CoffeeBean } from "@prisma/client";

export async function createBrew(formData: FormData): Promise<void> {
  const coffeeBeanId = formData.get("coffeeBeanId") as string;
  const coffeeAmount = formData.get("coffeeAmount") as string;
  const waterAmount = formData.get("waterAmount") as string;
  const grinderId = formData.get("grinderId") as string;
  const grindSetting = formData.get("grindSetting") as string;
  const brewMethod = formData.get("brewMethod") as string;
  const brewTime = formData.get("brewTime") as string;
  const notes = formData.get("notes") as string;

  await prisma.brew.create({
    data: {
      coffeeBeanId: parseInt(coffeeBeanId),
      coffeeAmount: parseFloat(coffeeAmount),
      waterAmount: parseFloat(waterAmount),
      grinderId: parseInt(grinderId),
      grindSetting,
      brewMethod,
      brewTime: parseInt(brewTime),
      notes,
    },
  });
  redirect("/brews");
}

type BrewWithRelations = Brew & {
  grinder: Grinder | null;
  coffeeBean: CoffeeBean | null;
};

export async function readAllBrews(): Promise<BrewWithRelations[]> {
  const beans = await prisma.brew.findMany({
    include: {
      grinder: true,
      coffeeBean: true,
    },
  });
  return beans;
}


export async function readBrew(id: number): Promise<Brew | null> {
  return await prisma.brew.findUnique({
    where: { id },
  });
}

export async function updateBrew(
  id: number,
  formData: FormData
): Promise<void> {
  const coffeeBeanId = formData.get("coffeeBeanId") as string;
  const coffeeAmount = formData.get("coffeeAmount") as string;
  const waterAmount = formData.get("waterAmount") as string;
  const grinderId = formData.get("grinderId") as string;
  const grindSetting = formData.get("grindSetting") as string;
  const brewMethod = formData.get("brewMethod") as string;
  const brewTime = formData.get("brewTime") as string;
  const notes = formData.get("notes") as string;

  await prisma.brew.update({
    where: { id },
    data: {
      coffeeBeanId: parseInt(coffeeBeanId),
      coffeeAmount: parseFloat(coffeeAmount),
      waterAmount: parseFloat(waterAmount),
      grinderId: parseInt(grinderId),
      grindSetting,
      brewMethod,
      brewTime: parseInt(brewTime),
      notes,
    },
  });
  redirect("/brews");
}

export async function deleteBrew(formData: FormData): Promise<void> {
  const id = parseInt(formData.get("id") as string);
  await prisma.brew.delete({ where: { id } });
  redirect("/brews");
}
