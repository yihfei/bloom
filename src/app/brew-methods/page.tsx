import { readAllBrewMethods } from "@/actions/brewMethodsController";
import BrewMethodCard from "@/app/components/brew-methods/BrewMethodCard";
import { BrewMethod } from "@prisma/client";
import { auth } from "@/auth";

export default async function BrewMethodsPage() {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return <div>you&apos;re not signed in</div>;
    }
    const brewMethods: BrewMethod[] = await readAllBrewMethods(userId);
    

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brewMethods.map((brewMethod) => (
                <BrewMethodCard
                    key={brewMethod.id}
                    id={brewMethod.id}
                    name={brewMethod.name}
                    price={brewMethod.price}
                    description={brewMethod.description || "no description provided"}
                    userId={userId}
                />
            ))}
        </div>
    );
}