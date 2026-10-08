import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/partner-portal/auth";
import { dbService } from "@/lib/partner-portal/db-service";
import { hasCapability } from "@/lib/partner-portal/permissions";

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized: Active session required." }, { status: 401 });
  }

  const { orgId, role } = session;

  if (!hasCapability(role, "channel.mdf.manage_own")) {
    return NextResponse.json({ error: "Unauthorized: Missing MDF capability." }, { status: 403 });
  }

  try {
    const activities = await dbService.getPartnerMDF(orgId);
    return NextResponse.json({ activities, total: activities.length });
  } catch (err: any) {
    console.error("Failed to query MDF activities:", err);
    return NextResponse.json({ error: "Failed to retrieve MDF activities." }, { status: 500 });
  }
}
