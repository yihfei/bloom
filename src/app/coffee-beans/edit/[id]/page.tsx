import CoffeeBeanForm from "@/app/components/CoffeeBeanForm";
import { readCoffeeBean } from "@/actions/coffeeBeansController";


export default async function EditCoffeeBeanPage({ params }: Props) {
    const id = parseInt(params.id);
    console.log("Coffee bean ID:", id);

    const coffeeBean = await readCoffeeBean(parseInt(id));

    console.log("Coffee bean data:", coffeeBean);
    

    if (!id) {
        return <div>Error: Coffee bean ID is missing.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <CoffeeBeanForm action="edit" coffeeBean={coffeeBean}/>
        </div>
    );
}