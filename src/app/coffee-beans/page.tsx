import { readAllCoffeeBeans } from "@/actions/coffeeBeansController";
import CoffeeBeanCard from "@/app/components/coffee-beans/CoffeeBeanCard";
import { CoffeeBean } from "@prisma/client";
import { auth } from "@/auth";

export default async function CoffeeBeansPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return <div>you&apos;re not signed in</div>;
  }

  const coffeeBeans: CoffeeBean[] = await readAllCoffeeBeans(userId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {coffeeBeans.map((coffeeBean) => (
        <CoffeeBeanCard
          key={coffeeBean.id}
          id={coffeeBean.id}
          name={coffeeBean.name}
          quantity={coffeeBean.quantity}
          roastLevel={coffeeBean.roastLevel}
          origin={coffeeBean.origin}
          variety={coffeeBean.variety}
          processingMethod={coffeeBean.processingMethod}
          flavourNotes={coffeeBean.flavourNotes}
          roastDate={new Date(coffeeBean.roastDate)}
          purchasedFrom={coffeeBean.purchasedFrom}
          price={coffeeBean.price}
          userId={userId}
        />
      ))}
    </div>
  );
}
