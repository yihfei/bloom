"use client";
import { logout } from "@/actions/auth";

export default function SignOutButton() {
  return <button onClick={() => logout()}>sign out</button>;
}