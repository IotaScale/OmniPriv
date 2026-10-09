import { NextRequest, NextResponse } from "next/server";

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || "https://portal.omnipriv.com";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Redirect legacy portal, channel-admin, and auth paths to dedicated portal domain
  if (
    pathname.startsWith("/partner-portal") ||
    pathname.startsWith("/channel-admin") ||
    pathname.startsWith("/portal-admin") ||
    pathname === "/sign-in" ||
    pathname === "/sign-up"
  ) {
    const destination = new URL(`${PORTAL_URL}${pathname}${search}`);
    return NextResponse.redirect(destination, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/partner-portal/:path*",
    "/channel-admin/:path*",
    "/portal-admin/:path*",
    "/sign-in",
    "/sign-up",
  ],
};

