import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/brews", "grinders", "coffee-beans"]
;

export default async function middleware(request: NextRequest) {
    const session = await auth();
    
    const { pathname } = request.nextUrl;

    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
    
    if (isProtected && !session) {
        return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }
    // If the user is authenticated, allow the request to proceed
    return NextResponse.next();
}