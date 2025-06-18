import BrewMethodForm from "@/app/components/brew-methods/BrewMethodForm";
import { readBrewMethod } from "@/actions/brewMethodsController";
import { BrewMethod } from "@prisma/client";
import { auth } from "@/auth";

export default async function EditBrewMethodPage({
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
    return <div>Error: Brew Method ID is missing.</div>;
  }

  const brewMethod: BrewMethod | null = await readBrewMethod(idNum, userId);

  if (!brewMethod) {
    return <div>Error: Brew Method not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <BrewMethodForm action="edit" brewMethod={brewMethod} userId={userId} />
    </div>
  );
}