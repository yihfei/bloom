"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { Grinder } from "@prisma/client";

export async function createGrinder(
  formData: FormData,
  userId: string
): Promise<void> {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);

  await prisma.grinder.create({
    data: {
      name,
      price,
      userId,
    },
  });
  redirect("/grinders");
}

export async function readAllGrinders(userId: string): Promise<Grinder[]> {
  return await prisma.grinder.findMany({
    orderBy: { name: "asc" },
    where: { userId },
  });
}

export async function readGrinder(
  id: number,
  userId: string
): Promise<Grinder | null> {
  return await prisma.grinder.findUnique({
    where: { id, userId },
  });
}

export async function updateGrinder(
  id: number,
  formData: FormData,
  userId: string
): Promise<void> {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);

  await prisma.grinder.update({
    where: { id, userId },
    data: {
      name,
      price,
    },
  });
  redirect("/grinders");
}

export async function deleteGrinder(formData: FormData): Promise<void> {
  const id = parseInt(formData.get("id") as string);
  const userId = formData.get("userId") as string;
  await prisma.grinder.delete({
    where: { id, userId },
  });
  redirect("/grinders");
}
