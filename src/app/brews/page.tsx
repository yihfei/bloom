import { readAllBrews } from "@/actions/brewsController";
import BrewCard from "@/app/components/brews/BrewCard";
import { Brew, Grinder, CoffeeBean, BrewMethod } from "@prisma/client";
import { auth } from "@/auth";

type BrewsWithRelations = Brew & {
  coffeeBean: CoffeeBean | null;
  grinder: Grinder | null;
  brewMethod: BrewMethod | null;
};

export default async function BrewsPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return <div>you&apos;re not signed in</div>;
  }
  const brews: BrewsWithRelations[] = await readAllBrews(userId);
  brews.reverse(); // Reverse the order to show the most recent brews first
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {brews.map((brew, index) => (
        <BrewCard
          key={brew.id}
          id={brew.id}
          coffeeBeanName={brew.coffeeBean?.name || "none"}
          coffeeAmount={brew.coffeeAmount}
          waterAmount={brew.waterAmount}
          grinderName={brew.grinder?.name || "none"}
          brewMethod={brew.brewMethod?.name || "none"}
          grindSetting={brew.grindSetting}
          brewTime={brew.brewTime}
          notes={brew.notes}
          createdAt={new Date(brew.createdAt)}
          userId={userId}
          brewNumber={brews.length - index}
        />
      ))}
    </div>
  );
}
