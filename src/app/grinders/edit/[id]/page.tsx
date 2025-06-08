import GrinderForm from "@/app/components/grinders/GrinderForm";
import { readGrinder } from "@/actions/grindersController";
import { Grinder } from "@prisma/client";
import { auth } from "@/auth";

export default async function EditGrinderPage({
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
    return <div>Error: Grinder ID is missing.</div>;
  }

  const grinder: Grinder | null = await readGrinder(idNum, userId);

  if (!grinder) {
    return <div>Error: Grinder not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <GrinderForm action="edit" grinder={grinder} userId={userId} />
    </div>
  );
}
