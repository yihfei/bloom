import { readAllBrews } from "@/actions/brewsController";
import BrewCard from "@/app/components/brews/BrewCard";
import { Brew, Grinder, CoffeeBean } from "@prisma/client";

type BrewsWithRelations = Brew & {
  coffeeBean: CoffeeBean | null;
  grinder: Grinder | null;
};

export default async function BrewsPage() {
  const brews: BrewsWithRelations[] = await readAllBrews();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {brews.map((brew) => (
        <BrewCard
          key={brew.id}
          id={brew.id}
          coffeeBeanName={brew.coffeeBean?.name || "none"}
          coffeeAmount={brew.coffeeAmount}
          waterAmount={brew.waterAmount}
          grinderName={brew.grinder?.name || "none"}
          brewMethod={brew.brewMethod}
          grindSetting={brew.grindSetting}
          brewTime={brew.brewTime}
          notes={brew.notes}
          createdAt={new Date(brew.createdAt)}
        />
      ))}
    </div>
  );
}
