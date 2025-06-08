import CoffeeBeanForm from "@/app/components/coffee-beans/CoffeeBeanForm";
import { auth } from "@/auth";

export default async function CreateCoffeeBeanPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return <div>You are not signed in.</div>;
  }
  return (
    <div className="max-w-2xl mx-auto p-4">
      <CoffeeBeanForm action="create" userId={userId} />
    </div>
  );
}
