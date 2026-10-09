import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/partner-portal/auth";
import { dbService } from "@/lib/partner-portal/db-service";

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "Channel Admin" && session.role !== "Partner Manager") {
    return NextResponse.json({ error: "Forbidden: Channel Admin permission required." }, { status: 403 });
  }

  try {
    const leads = await dbService.getChannelAdminLeads();
    return NextResponse.json({ leads, total: leads.length });
  } catch (err: any) {
    console.error("Failed to query Channel Admin leads:", err);
    return NextResponse.json({ error: "Failed to load channel leads." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.role !== "Channel Admin" && session.role !== "Partner Manager") {
    return NextResponse.json({ error: "Forbidden: Channel Admin permission required." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { leadId, partnerOrgId, partnerOrgName } = body;

    if (!leadId || !partnerOrgId || !partnerOrgName) {
      return NextResponse.json(
        { error: "Lead ID, Partner Org ID, and Partner Org Name are required for routing." },
        { status: 400 }
      );
    }

    const routed = await dbService.routeLeadToPartner(
      leadId,
      partnerOrgId,
      partnerOrgName,
      session.userId,
      session.name
    );

    return NextResponse.json({ success: true, lead: routed });
  } catch (err: any) {
    console.error("Failed to route lead:", err);
    return NextResponse.json({ error: "Failed to route inbound lead to partner." }, { status: 500 });
  }
}
