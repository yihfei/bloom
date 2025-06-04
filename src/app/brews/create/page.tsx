import BrewForm from "@/app/components/brews/BrewForm";
import { readAllCoffeeBeans } from "@/actions/coffeeBeansController";
import { readAllGrinders } from "@/actions/grindersController";
import { CoffeeBean, Grinder } from "@prisma/client";

export default async function CreatebrewPage() {
  const grinders: Grinder[] = await readAllGrinders();
  const coffeeBeans: CoffeeBean[] = await readAllCoffeeBeans();
  return (
    <div className="max-w-2xl mx-auto p-4">
      <BrewForm action="create" grinders={grinders} coffeeBeans={coffeeBeans} />{" "}
    </div>
  );
}
