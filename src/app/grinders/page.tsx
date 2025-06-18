import { readAllGrinders } from "@/actions/grindersController"
import GrinderCard from "@/app/components/grinders/GrinderCard"
import { Grinder } from "@prisma/client"
import { auth } from "@/auth"

export default async function GrindersPage() {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return <div>you&apos;re not signed in</div>;
    }
    const grinders: Grinder[] = await readAllGrinders(userId);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grinders.map((grinder) => (
                <GrinderCard
                    key={grinder.id}
                    id={grinder.id}
                    name={grinder.name}
                    price={grinder.price}
                    userId={userId}
                    description={grinder.description || "no description provided"}
                />
            ))}
           
        </div>
    )
}