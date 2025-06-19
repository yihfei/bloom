"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

export default function Navbar({ action }: { action: "logout" | "login" }) {
  const pathname = usePathname();

  if (action === "login") {
    return (
      <div className="flex p-1 justify-end items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <SignInButton />
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    );
  }
  return (
    <div className="flex p-1 justify-between items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/brews">brews</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/coffee-beans">coffee beans</Link>
          </NavigationMenuLink>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/grinders">grinders</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/brew-methods">brew methods</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {pathname === "/brews" && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/brews/create">add brew</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
          {pathname === "/grinders" && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/grinders/create">add grinder</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
          {pathname === "/coffee-beans" && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/coffee-beans/create">add coffee beans</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
          {pathname === "/brew-methods" && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/brew-methods/create">add brew method</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/">home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <SignOutButton />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
