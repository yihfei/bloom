import CoffeeBeanForm from "@/app/components/coffee-beans/CoffeeBeanForm";
import { readCoffeeBean } from "@/actions/coffeeBeansController";
import { CoffeeBean } from "@prisma/client";
import { auth } from "@/auth";

export default async function EditCoffeeBeanPage({
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
    return <div>Error: Coffee bean ID is missing.</div>;
  }

  const coffeeBean: CoffeeBean | null = await readCoffeeBean(idNum, userId);

  if (!coffeeBean) {
    return <div>Error: Coffee bean not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CoffeeBeanForm action="edit" coffeeBean={coffeeBean} userId={userId} />
    </div>
  );
}
