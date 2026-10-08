import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/partner-portal/auth";
import { dbService } from "@/lib/partner-portal/db-service";

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "Channel Admin" && session.role !== "Partner Manager") {
    return NextResponse.json({ error: "Forbidden: Channel Admin credentials required." }, { status: 403 });
  }

  try {
    const organizations = await dbService.getChannelAdminOrganizations();
    return NextResponse.json({ organizations, total: organizations.length });
  } catch (err: any) {
    console.error("Failed to query partner organizations:", err);
    return NextResponse.json({ error: "Failed to load partner organizations." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "Channel Admin" && session.role !== "Partner Manager") {
    return NextResponse.json({ error: "Forbidden: Channel Admin credentials required." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { orgId, tier, partnerManagerName } = body;

    if (!orgId || !tier) {
      return NextResponse.json({ error: "Partner organization ID and tier are required." }, { status: 400 });
    }

    const updated = await dbService.updatePartnerOrganization(
      orgId,
      tier,
      partnerManagerName || "Unassigned Channel Team",
      session.userId,
      session.name
    );

    return NextResponse.json({ success: true, organization: updated });
  } catch (err: any) {
    console.error("Failed to update partner organization:", err);
    return NextResponse.json({ error: "Failed to update partner organization." }, { status: 500 });
  }
}
