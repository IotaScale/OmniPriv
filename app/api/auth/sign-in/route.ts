import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  getSafeReturnUrl,
} from "@/lib/partner-portal/auth";
import { verifyUserCredentials } from "@/lib/partner-portal/db-auth";
import { logAuditEvent } from "@/lib/partner-portal/audit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, username, password, returnUrl, loginType } = body;

    const identifier = email || username;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Username or email and password are required." },
        { status: 400 }
      );
    }

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      "127.0.0.1";

    const user = await verifyUserCredentials(String(identifier), String(password), clientIp);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    if (user.isLocked) {
      return NextResponse.json(
        {
          error: "Account is temporarily locked due to multiple failed login attempts. Please contact security operations or try again in 15 minutes.",
          code: "ACCOUNT_LOCKED",
        },
        { status: 423 }
      );
    }

    // Role-specific authorization checks based on entry gateway
    if (loginType === "channel_admin") {
      if (user.role !== "Channel Admin" && user.role !== "Partner Manager") {
        logAuditEvent({
          actor_user_id: user.id,
          actor_name: user.name,
          actor_role: user.role,
          actor_org_id: user.orgId,
          action: "channel.auth.denied_admin_role_required",
          target_type: "ChannelAdminGateway",
          target_id: user.id,
          details: `Rejected Channel Admin console login: User '${user.username}' has role '${user.role}' without internal Channel Admin permission.`,
          ip_address: clientIp,
        });

        return NextResponse.json(
          {
            error: "Access Denied: Your account does not have Channel Administration permissions.",
            code: "CHANNEL_ADMIN_FORBIDDEN",
          },
          { status: 403 }
        );
      }
    } else {
      // Standard Partner Portal entry flow checks
      if (user.role !== "Channel Admin" && user.partnerMembershipStatus === "none") {
        logAuditEvent({
          actor_user_id: user.id,
          actor_name: user.name,
          actor_role: user.role,
          actor_org_id: user.orgId,
          action: "channel.auth.denied_no_membership",
          target_type: "PartnerUser",
          target_id: user.id,
          details: `Login rejected: Account belongs to organization '${user.orgName}' without channel partner membership.`,
          ip_address: clientIp,
        });
        return NextResponse.json(
          {
            error: "Partner Portal access is not available for this account. Your organization is a PAM customer tenant.",
            code: "NO_PARTNER_MEMBERSHIP",
          },
          { status: 403 }
        );
      }

      if (user.programStatus === "suspended" || user.partnerMembershipStatus === "suspended") {
        logAuditEvent({
          actor_user_id: user.id,
          actor_name: user.name,
          actor_role: user.role,
          actor_org_id: user.orgId,
          action: "channel.auth.denied_suspended",
          target_type: "PartnerProfile",
          target_id: user.orgId,
          details: `Login rejected: Partner organization '${user.orgName}' is suspended.`,
          ip_address: clientIp,
        });
        return NextResponse.json(
          {
            error: "Your partner organization account has been suspended. Please contact your assigned OmniPriv Partner Manager for assistance.",
            code: "ORG_SUSPENDED",
          },
          { status: 403 }
        );
      }

      if (user.programStatus === "pending") {
        logAuditEvent({
          actor_user_id: user.id,
          actor_name: user.name,
          actor_role: user.role,
          actor_org_id: user.orgId,
          action: "channel.auth.denied_pending",
          target_type: "PartnerProfile",
          target_id: user.orgId,
          details: `Login rejected: Partner organization '${user.orgName}' is pending channel activation review.`,
          ip_address: clientIp,
        });
        return NextResponse.json(
          {
            error: "Your partner organization application is currently pending OmniPriv Channel Admin review. You will receive an invitation email once activated.",
            code: "ORG_PENDING",
          },
          { status: 403 }
        );
      }
    }

    // Generate authenticated session token
    const token = createSessionToken(user);
    const defaultReturn = loginType === "channel_admin" ? "/channel-admin" : "/partner-portal";
    const safeReturn = returnUrl ? getSafeReturnUrl(returnUrl) : defaultReturn;

    logAuditEvent({
      actor_user_id: user.id,
      actor_name: user.name,
      actor_role: user.role,
      actor_org_id: user.orgId,
      action: "channel.auth.login_success",
      target_type: "OmniPrivSession",
      target_id: user.id,
      details: `Successful sign-in for ${user.email} (${user.role}) in org ${user.orgName}. Gateway: ${loginType || "partner"}.`,
      ip_address: clientIp,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        orgId: user.orgId,
        orgName: user.orgName,
        role: user.role,
      },
      returnUrl: safeReturn,
    });

    // Set secure HttpOnly session cookie
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400, // 24 hours
    });

    return response;
  } catch (err: any) {
    console.error("Sign-in route error:", err.message);
    return NextResponse.json(
      { error: "An unexpected error occurred during authentication." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const returnUrl = request.nextUrl.searchParams.get("returnUrl") || "/partner-portal";
  return NextResponse.redirect(new URL(`/sign-in?returnUrl=${encodeURIComponent(returnUrl)}`, request.url));
}
