"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { BrewMethod } from "@prisma/client";

export async function createBrewMethod(
  formData: FormData,
  userId: string
): Promise<void> {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);

  await prisma.brewMethod.create({
    data: {
      name,
      price,
      userId,
    },
  });
  redirect("/brew-methods");
}

export async function readAllBrewMethods(userId: string): Promise<BrewMethod[]> {
  return await prisma.brewMethod.findMany({
    orderBy: { name: "asc" },
    where: { userId },
  });
}

export async function readBrewMethod(
  id: number,
  userId: string
): Promise<BrewMethod | null> {
  return await prisma.brewMethod.findUnique({
    where: { id, userId },
  });
}

export async function updateBrewMethod(
  id: number,
  formData: FormData,
  userId: string
): Promise<void> {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);

  await prisma.brewMethod.update({
    where: { id, userId },
    data: {
      name,
      price,
    },
  });
  redirect("/brew-methods");
}

export async function deleteBrewMethod(formData: FormData): Promise<void> {
  const id = parseInt(formData.get("id") as string);
  const userId = formData.get("userId") as string;
  await prisma.brewMethod.delete({
    where: { id, userId },
  });
  redirect("/brew-methods");
}
