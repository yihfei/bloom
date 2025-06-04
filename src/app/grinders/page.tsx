import { readAllGrinders } from "@/actions/grindersController"
import GrinderCard from "@/app/components/grinders/GrinderCard"
import { Grinder } from "@prisma/client"

export default async function GrindersPage() {
    const grinders: Grinder[] = await readAllGrinders();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grinders.map((grinder) => (
                <GrinderCard
                    key={grinder.id}
                    id={grinder.id}
                    name={grinder.name}
                    price={grinder.price}
                />
            ))}
           
        </div>
    )
}