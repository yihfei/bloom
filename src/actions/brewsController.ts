"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { Brew, Grinder, CoffeeBean, BrewMethod } from "@prisma/client";

export async function createBrew(
  formData: FormData,
  userId: string
): Promise<void> {
  const coffeeBeanId = formData.get("coffeeBeanId") as string;
  const coffeeAmount = formData.get("coffeeAmount") as string;
  const waterAmount = formData.get("waterAmount") as string;
  const grinderId = formData.get("grinderId") as string;
  const grindSetting = formData.get("grindSetting") as string;
  const brewMethodId = formData.get("brewMethodId") as string;
  const brewTime = formData.get("brewTime") as string;
  const notes = formData.get("notes") as string;

  await prisma.brew.create({
    data: {
      coffeeBeanId: parseInt(coffeeBeanId),
      coffeeAmount: parseFloat(coffeeAmount),
      waterAmount: parseFloat(waterAmount),
      grinderId: parseInt(grinderId),
      grindSetting,
      brewMethodId: parseInt(brewMethodId),
      brewTime: parseInt(brewTime),
      notes,
      userId,
    },
  });
  redirect("/brews");
}

type BrewWithRelations = Brew & {
  grinder: Grinder | null;
  coffeeBean: CoffeeBean | null;
  brewMethod: BrewMethod | null;
};

export async function readAllBrews(
  userId: string
): Promise<BrewWithRelations[]> {
  const brews = await prisma.brew.findMany({
    where: { userId },
    include: {
      grinder: true,
      coffeeBean: true,
      brewMethod: true,
    },
  });
  return brews;
}

export async function readBrew(
  id: number,
  userId: string
): Promise<Brew | null> {
  return await prisma.brew.findUnique({
    where: { id, userId },
  });
}

export async function updateBrew(
  id: number,
  formData: FormData,
  userId: string
): Promise<void> {
  const coffeeBeanId = formData.get("coffeeBeanId") as string;
  const coffeeAmount = formData.get("coffeeAmount") as string;
  const waterAmount = formData.get("waterAmount") as string;
  const grinderId = formData.get("grinderId") as string;
  const grindSetting = formData.get("grindSetting") as string;
  const brewMethodId = formData.get("brewMethodId") as string;
  const brewTime = formData.get("brewTime") as string;
  const notes = formData.get("notes") as string;

  await prisma.brew.update({
    where: { id, userId },
    data: {
      coffeeBeanId: parseInt(coffeeBeanId),
      coffeeAmount: parseFloat(coffeeAmount),
      waterAmount: parseFloat(waterAmount),
      grinderId: parseInt(grinderId),
      grindSetting,
      brewMethodId: parseInt(brewMethodId),
      brewTime: parseInt(brewTime),
      notes,
    },
  });
  redirect("/brews");
}

export async function deleteBrew(formData: FormData): Promise<void> {
  const id = parseInt(formData.get("id") as string);
  const userId = formData.get("userId") as string;

  await prisma.brew.delete({ where: { id, userId } });
  redirect("/brews");
}

export async function getNumberOfBrews(userId: string): Promise<number> {
  const brews = await readAllBrews(userId);
  const numberOfBrews = brews.length;
  return Math.round(numberOfBrews);
}

export async function getAverageBrewPrice(userId: string): Promise<number> {
  const brews = await readAllBrews(userId);

  // Map to track the number of brews for each coffee bean and grinder
  const coffeeBeanUsage: Record<string, number> = {};
  const grinderUsage: Record<string, number> = {};
  const brewMethodUsage: Record<string, number> = {};

  brews.forEach((brew) => {
    if (brew.coffeeBean?.id) {
      coffeeBeanUsage[brew.coffeeBean.id] =
        (coffeeBeanUsage[brew.coffeeBean.id] || 0) + 1;
    }
    if (brew.grinder?.id) {
      grinderUsage[brew.grinder.id] = (grinderUsage[brew.grinder.id] || 0) + 1;
    }
    if (brew.brewMethod?.id) {
      brewMethodUsage[brew.brewMethod.id] =
        (brewMethodUsage[brew.brewMethod.id] || 0) + 1;
    }
  });

 

  // Calculate the total cost for coffee beans
  const coffeeBeanCost = Object.entries(coffeeBeanUsage).reduce(
    (total, [beanId, usage]) => {
      const coffeeBean = brews.find(
        (brew) => brew.coffeeBean?.id === parseInt(beanId)
      )?.coffeeBean;
      if (coffeeBean) {
        const avgCost = coffeeBean.price / usage; // Divide cost by usage
        console.log(
          `Coffee Bean ID: ${beanId}, Usage: ${usage}, Avg Cost: ${avgCost}`)
        total += avgCost; // Divide cost by usage
      } 
      return total;
    },
    0
  );

  // Calculate the total cost for grinders
  const grinderCost = Object.entries(grinderUsage).reduce(
    (total, [grinderId, usage]) => {
      const grinder = brews.find(
        (brew) => brew.grinder?.id === parseInt(grinderId)
      )?.grinder;
      if (grinder) {
        const avgCost = grinder.price / usage; // Divide cost by usage
        
        total += avgCost; // Divide cost by usage
      }
      return total;
    },
    0
  );

  // Calculate the total cost for brew methods
  const brewMethodCost = Object.entries(brewMethodUsage).reduce(
    (total, [brewMethodId, usage]) => {
      const brewMethod = brews.find(
        (brew) => brew.brewMethod?.id === parseInt(brewMethodId)
      )?.brewMethod;
      if (brewMethod) {
        const avgCost = brewMethod.price / usage; // Divide cost by usage
        
        total += avgCost; // Divide cost by usage
      }
      return total;
    },
    0
  );

  console.log('Coffee Bean Cost:', coffeeBeanCost);
  console.log('Grinder Cost:', grinderCost);
  console.log('Brew Method Cost:', brewMethodCost);

  // Sum up the costs
  const totalPrice = coffeeBeanCost + grinderCost + brewMethodCost;
  if (totalPrice == 0) {
    return 0;
  }
  return parseFloat((totalPrice / brews.length).toFixed(2));// Round to two decimal places
}

export async function getTotalTimeSpentBrewing(
  userId: string
): Promise<string> {
  const brews = await readAllBrews(userId);
  const totalTime = brews.reduce((sum, brew) => sum + (brew.brewTime || 0), 0);
  
  // convert seconds to hours, minutes, and seconds
  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);
  const seconds = totalTime % 60;
  if (hours === 0 && minutes === 0) {
    return `${seconds}s`;
  } else if (hours === 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${hours}h ${minutes}m ${seconds}s`;
  }


}

export async function getAllBrewDates(
  userId: string
): Promise<{ date: Date; placeholder: number }[]> {
  const brews = await readAllBrews(userId);
  const dates = brews.map((brew) => ({
    date: new Date(brew.createdAt),
    placeholder: 1,
  }));
  return dates;
}

// This function retrieves the number of brews made by a user on each day.
export async function getNumberOfBrewsByDay(
  userId: string
): Promise<{ date: string; brewCount: number }[]> {
  const brews = await readAllBrews(userId);
  const dates = brews
    .map((brew) => ({
      date: new Date(brew.createdAt).toISOString().split("T")[0], // Format date to YYYY-MM-DD
      count: 1, // Each brew counts as one
    }))
    .reduce((acc, brew) => {
      const brewDate = brew.date;
      if (!acc[brewDate]) {
        acc[brewDate] = { date: brewDate, count: 0 };
      }
      acc[brewDate].count += brew.count;
      return acc;
    }, {} as Record<string, { date: string; count: number }>);
  return Object.values(dates).map(({ date, count }) => ({
    date,
    brewCount: count,
  }));
}
