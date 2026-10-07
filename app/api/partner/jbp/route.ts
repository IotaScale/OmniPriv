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

  if (!hasCapability(role, "channel.jbp.manage_own")) {
    return NextResponse.json({ error: "Unauthorized: Missing JBP capability." }, { status: 403 });
  }

  try {
    const plan = await dbService.getPartnerJBP(orgId);
    return NextResponse.json({ plan });
  } catch (err: any) {
    console.error("Failed to query JBP:", err);
    return NextResponse.json({ error: "Failed to retrieve Joint Business Plan." }, { status: 500 });
  }
}
