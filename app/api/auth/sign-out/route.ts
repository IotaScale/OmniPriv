import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, getSessionFromRequest } from "@/lib/partner-portal/auth";
import { logAuditEvent } from "@/lib/partner-portal/audit";

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);

  if (session) {
    logAuditEvent({
      actor_user_id: session.userId,
      actor_name: session.name,
      actor_role: session.role,
      actor_org_id: session.orgId,
      action: "channel.auth.logout",
      target_type: "PartnerSession",
      target_id: session.userId,
      details: `User ${session.email} signed out from Partner Portal.`,
      ip_address: "client-auth",
    });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
