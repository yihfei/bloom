"use client";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export default function SignInButton() {
  return (
    <Button asChild>
      <button onClick={() => login()}>sign in</button>
    </Button>
  );
}
