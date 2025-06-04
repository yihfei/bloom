import CoffeeBeanForm from "@/app/components/coffee-beans/CoffeeBeanForm";
import { readCoffeeBean } from "@/actions/coffeeBeansController";
import { CoffeeBean } from "@prisma/client";

export default async function EditCoffeeBeanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = parseInt(id);

  if (isNaN(idNum)) {
    return <div>Error: Coffee bean ID is missing.</div>;
  }

  const coffeeBean: CoffeeBean | null = await readCoffeeBean(idNum);

  if (!coffeeBean) {
    return <div>Error: Coffee bean not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CoffeeBeanForm action="edit" coffeeBean={coffeeBean} />
    </div>
  );
}
