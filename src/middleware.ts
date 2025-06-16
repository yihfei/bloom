import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/brews", "/grinders", "/coffee-beans"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  // Get the session token from cookies
  // dont use auth() here as it requires a server context (prisma client, etc.)
  const sessionToken = request.cookies.get("authjs.session-token");

  if (isProtected && !sessionToken) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  // If the user is authenticated, allow the request to proceed
  return NextResponse.next();
}