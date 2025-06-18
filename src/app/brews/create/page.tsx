import BrewForm from "@/app/components/brews/BrewForm";
import { readAllCoffeeBeans } from "@/actions/coffeeBeansController";
import { readAllGrinders } from "@/actions/grindersController";
import { readAllBrewMethods } from "@/actions/brewMethodsController";
import { CoffeeBean, Grinder, BrewMethod } from "@prisma/client";
import { auth } from "@/auth";

export default async function CreatebrewPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return <div>You are not signed in.</div>;
  }
  const grinders: Grinder[] = await readAllGrinders(userId);
  const coffeeBeans: CoffeeBean[] = await readAllCoffeeBeans(userId);
  const brewMethods: BrewMethod[] = await readAllBrewMethods(userId);
  return (
    <div className="max-w-2xl mx-auto p-4">
      <BrewForm
        action="create"
        grinders={grinders}
        coffeeBeans={coffeeBeans}
        brewMethods={brewMethods}
        userId={userId}
      />{" "}
    </div>
  );
}
