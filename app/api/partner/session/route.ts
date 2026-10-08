import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/partner-portal/auth";
import { dbService } from "@/lib/partner-portal/db-service";
import { ROLE_CAPABILITIES } from "@/lib/partner-portal/permissions";
import { DEFAULT_FEATURE_FLAGS } from "@/lib/partner-portal/feature-flags";

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized: Active session required." },
      { status: 401 }
    );
  }

  // Derive trusted orgId and role strictly from server-side session
  const { orgId, role, userId, name, email } = session;

  try {
    const profile = await dbService.getPartnerProfile(orgId);
    const metrics = await dbService.getPartnerDashboardMetrics(orgId);

    return NextResponse.json({
      user: {
        id: userId,
        name: name,
        email: email,
        role: role,
        orgId: orgId,
      },
      profile: profile || {
        company_name: session.orgName || "Partner Workspace",
        current_tier: "Registered",
        program_status: session.programStatus || "active",
        partner_org_id: orgId,
        onboarding_completed: true,
      },
      metrics,
      capabilities: (ROLE_CAPABILITIES as Record<string, string[]>)[role] || [],
      featureFlags: DEFAULT_FEATURE_FLAGS,
    });
  } catch (err: any) {
    console.error("Session introspection error:", err);
    return NextResponse.json(
      { error: "Failed to load partner session data from database." },
      { status: 500 }
    );
  }
}
