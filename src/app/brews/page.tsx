import { readAllBrews } from "@/actions/brewsController";
import BrewCard from "@/app/components/brews/BrewCard";
import { Brew, Grinder, CoffeeBean } from "@prisma/client";
import { auth } from "@/auth";

type BrewsWithRelations = Brew & {
  coffeeBean: CoffeeBean | null;
  grinder: Grinder | null;
};

export default async function BrewsPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return <div>you&apos;re not signed in</div>;
  }
  const brews: BrewsWithRelations[] = await readAllBrews(userId);

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
          userId={userId}
        />
      ))}
    </div>
  );
}
