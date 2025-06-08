"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
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
      </NavigationMenuList>
    </NavigationMenu>
  );
}
