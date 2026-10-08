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

  if (!hasCapability(role, "channel.renewal.read_linked")) {
    return NextResponse.json({ error: "Unauthorized: Missing renewal read capability." }, { status: 403 });
  }

  try {
    const renewals = await dbService.getPartnerRenewals(orgId);
    return NextResponse.json({ renewals, total: renewals.length });
  } catch (err: any) {
    console.error("Failed to query renewals:", err);
    return NextResponse.json({ error: "Failed to retrieve renewals from database." }, { status: 500 });
  }
}
