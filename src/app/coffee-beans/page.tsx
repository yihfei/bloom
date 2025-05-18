import { getAllCoffeeBeans } from "@/actions/coffeeBeansController";
import CoffeeBeanCard from "@/app/components/coffeeBeanCard";

export default async function CoffeeBeansPage() {
    const coffeeBeans = await getAllCoffeeBeans();

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
                />
            ))}
        </div>
    )
}