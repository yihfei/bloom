import GrinderForm from "@/app/components/grinders/GrinderForm";
import { readGrinder } from "@/actions/grindersController";
import { Grinder } from "@prisma/client";

export default async function EditGrinderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = parseInt(id);

  if (isNaN(idNum)) {
    return <div>Error: Grinder ID is missing.</div>;
  }

  const grinder: Grinder | null = await readGrinder(idNum);

  if (!grinder) {
    return <div>Error: Grinder not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <GrinderForm action="edit" grinder={grinder} />
    </div>
  );
}
