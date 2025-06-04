import BrewForm from "@/app/components/BrewForm";
import { readBrew } from "@/actions/brewsController";
import { readAllCoffeeBeans } from "@/actions/coffeeBeansController";
import { readAllGrinders } from "@/actions/grindersController";
import { Brew, CoffeeBean, Grinder } from "@prisma/client";

export default async function EditBrewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = parseInt(id);

  if (isNaN(idNum)) {
    // this should not happen
    return <div>Error: Brew is missing.</div>;
  }

  const brew: Brew | null = await readBrew(idNum);

  if (!brew) {
    return <div>Error: Brew not found.</div>;
  }

  const grinders: Grinder[] = await readAllGrinders();
  const coffeeBeans: CoffeeBean[] = await readAllCoffeeBeans();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <BrewForm action="edit" brew={brew} grinders={grinders} coffeeBeans={coffeeBeans} />
    </div>
  );
}
