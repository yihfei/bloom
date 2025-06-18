import BrewForm from "@/app/components/brews/BrewForm";
import { readBrew } from "@/actions/brewsController";
import { readAllCoffeeBeans } from "@/actions/coffeeBeansController";
import { readAllGrinders } from "@/actions/grindersController";
import { readAllBrewMethods } from "@/actions/brewMethodsController";
import { Brew, CoffeeBean, Grinder } from "@prisma/client";
import { auth } from "@/auth";

export default async function EditBrewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return <div>You are not signed in.</div>;
  }

  const { id } = await params;
  const idNum = parseInt(id);

  if (isNaN(idNum)) {
    // this should not happen
    return <div>Error: Brew is missing.</div>;
  }

  const brew: Brew | null = await readBrew(idNum, userId);

  if (!brew) {
    return <div>Error: Brew not found.</div>;
  }

  const grinders: Grinder[] = await readAllGrinders(userId);
  const coffeeBeans: CoffeeBean[] = await readAllCoffeeBeans(userId);
  const brewMethods: BrewMethod[]  = await readAllBrewMethods(userId);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <BrewForm
        action="edit"
        brew={brew}
        grinders={grinders}
        coffeeBeans={coffeeBeans}
        brewMethods={brewMethods}
        userId={userId}
      />
    </div>
  );
}
