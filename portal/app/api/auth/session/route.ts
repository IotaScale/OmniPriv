import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/partner-portal/auth";
import { ROLE_CAPABILITIES } from "@/lib/partner-portal/permissions";
import { DEFAULT_FEATURE_FLAGS } from "@/lib/partner-portal/feature-flags";
import { dbService } from "@/lib/partner-portal/db-service";

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized. No active session found." }, { status: 401 });
  }

  const profile = await dbService.getPartnerProfile(session.orgId);
  const capabilities = (ROLE_CAPABILITIES as Record<string, string[]>)[session.role] || [];

  return NextResponse.json({
    user: {
      id: session.userId,
      email: session.email,
      name: session.name,
      orgId: session.orgId,
      orgName: session.orgName,
      role: session.role,
    },
    profile: profile || {
      company_name: session.orgName,
      current_tier: "Registered",
      program_status: session.programStatus,
      partner_org_id: session.orgId,
    },
    capabilities,
    featureFlags: DEFAULT_FEATURE_FLAGS,
  });
}
