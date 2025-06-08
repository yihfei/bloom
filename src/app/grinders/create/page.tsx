import GrinderForm from "@/app/components/grinders/GrinderForm";
import { auth } from "@/auth";

export default async function CreateGrinderPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return <div>You are not signed in.</div>;
  }
  return (
    <div className="max-w-2xl mx-auto p-4">
      <GrinderForm action="create" userId={userId}/>
    </div>
  );
}
