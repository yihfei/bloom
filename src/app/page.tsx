import { auth } from "@/auth";
import SignInButton from "@/app/components/SignInButton";
import SignOutButton from "@/app/components/SignOutButton";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  console.log("session", session);

  if (session?.user) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <p>you are signed in</p>
        <p>user: {session.user.name}</p>
        <p>email: {session.user.email}</p>
        {session.user.image && (
          <div>
            <Image
              src={session.user.image}
              width={48}
              height={48}
              alt={session.user.name ?? "Avatar"}
              style={{ borderRadius: "50%" }}
            ></Image>
            <SignOutButton />
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>you are not signed in</p>
      <SignInButton />
    </div>
  );
}
