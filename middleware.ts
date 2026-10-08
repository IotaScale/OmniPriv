import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest, getSafeReturnUrl } from "@/lib/partner-portal/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Private Partner Portal UI Routes
  if (pathname.startsWith("/partner-portal")) {
    const session = getSessionFromRequest(request);

    if (!session) {
      const returnUrl = encodeURIComponent(pathname + request.nextUrl.search);
      const loginUrl = new URL(`/sign-in?returnUrl=${returnUrl}`, request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (session.partnerMembershipStatus === "none") {
      const deniedUrl = new URL("/sign-in?error=no_partner_membership", request.url);
      return NextResponse.redirect(deniedUrl);
    }

    if (session.programStatus === "suspended" || session.partnerMembershipStatus === "suspended") {
      const suspendedUrl = new URL("/sign-in?error=org_suspended", request.url);
      return NextResponse.redirect(suspendedUrl);
    }

    return NextResponse.next();
  }

  // Whitelist Dedicated Admin Login pages
  if (pathname === "/portal-admin/login" || pathname === "/channel-admin/login") {
    return NextResponse.next();
  }

  // Protect Internal Channel Admin UI Routes
  if (pathname.startsWith("/channel-admin") || pathname.startsWith("/portal-admin")) {
    const session = getSessionFromRequest(request);

    if (!session) {
      const returnUrl = encodeURIComponent(pathname + request.nextUrl.search);
      const loginUrl = new URL(`/channel-admin/login?returnUrl=${returnUrl}`, request.url);
      return NextResponse.redirect(loginUrl);
    }

    // For non-admin sessions, allow page to render the in-app 403 state; APIs remain strictly 403-blocked below
    return NextResponse.next();

    return NextResponse.next();
  }

  // Protect Partner API Routes
  if (pathname.startsWith("/api/partner")) {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in to access partner resources." },
        { status: 401 }
      );
    }

    if (session.partnerMembershipStatus === "none") {
      return NextResponse.json(
        { error: "Forbidden: Partner Portal membership not available for this account." },
        { status: 403 }
      );
    }

    return NextResponse.next();
  }

  // Protect Channel Admin API Routes
  if (pathname.startsWith("/api/channel-admin")) {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in with OmniPriv internal credentials." },
        { status: 401 }
      );
    }

    if (session.role !== "Channel Admin" && session.role !== "Partner Manager") {
      return NextResponse.json(
        { error: "Forbidden: Channel Admin credentials required." },
        { status: 403 }
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/partner-portal/:path*",
    "/channel-admin/:path*",
    "/portal-admin/:path*",
    "/api/partner/:path*",
    "/api/channel-admin/:path*",
  ],
};
