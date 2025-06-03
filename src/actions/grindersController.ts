"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { Grinder } from "@prisma/client";

export async function createGrinder(formData: FormData) : Promise<void> {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);

  await prisma.grinder.create({
    data: {
      name,
      price,
    },
  });
  redirect("/grinders");
}

export async function readAllGrinders(): Promise<Grinder[]> {
  return await prisma.grinder.findMany({
    orderBy: { name: "asc" },
  });
}

export async function readGrinder(id: number): Promise<Grinder | null> {
  return await prisma.grinder.findUnique({
    where: { id },
  });
}

export async function updateGrinder(id: number, formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);

  await prisma.grinder.update({
    where: { id },
    data: {
      name,
      price,
    },
  });
  redirect("/grinders");
}

export async function deleteGrinder(formData: FormData): Promise<void> {
  const id = parseInt(formData.get("id") as string);
  await prisma.grinder.delete({
    where: { id },
  });
  redirect("/grinders");
}