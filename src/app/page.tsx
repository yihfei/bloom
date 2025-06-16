import { auth } from "@/auth";
// import SignInButton from "@/app/components/SignInButton";
// import SignOutButton from "@/app/components/SignOutButton";
// import Image from "next/image";
import Dashboard from "@/app/dashboard/Dashboard";

export default async function Home() {
  const session = await auth();

  if (!session) {
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
