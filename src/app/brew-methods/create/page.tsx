import BrewMethodForm from "@/app/components/brew-methods/BrewMethodForm";
import { auth } from "@/auth";

export default async function CreateBrewMethodPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return <div>You are not signed in.</div>;
  }
  return (
    <div className="max-w-2xl mx-auto p-4">
      <BrewMethodForm action="create" userId={userId} />
    </div>
  );
}