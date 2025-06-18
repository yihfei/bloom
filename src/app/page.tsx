import { auth } from "@/auth";

import Dashboard from "@/app/dashboard/dashboard";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user|| !session.user.id) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Please sign in to access your dashboard.</p>
      </div>
    );
  }
  const userId = session.user.id;

  return (
    <Dashboard userId={userId}/>
  )
        
}
