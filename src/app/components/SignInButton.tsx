"use client";
import { login } from "@/actions/auth";

export default function SignInButton() {
  return <button onClick={() => login()}>sign in with github</button>;
}
