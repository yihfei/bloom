import { auth } from "@/auth";

import Dashboard from "@/app/dashboard/dashboard";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow h-screen ">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            welcome to <span className="text-amber-600">Bloom</span>
          </h1>
          <p className="text-lg mb-6">
            track your coffee brewing journey and explore new methods
          </p>
          <div className="flex justify-center space-x-4">
            <Button>
              <Link
                href="/api/auth/signin"
              >
                sign in
              </Link>
            </Button>
            <Button className="bg-gray-200 text-gray-800">
              <Link
                href="/about"
              >
                learn more
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const userId = session.user.id;

  return <Dashboard userId={userId} />;
}
