"use client";
import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return (
    <Button asChild>
      <button onClick={() => logout()}>sign out</button>
    </Button>
  );
}
