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
    const events = await dbService.getChannelAdminAuditLogs(100);
    return NextResponse.json({ events, total: events.length });
  } catch (err: any) {
    console.error("Failed to query Channel Admin audit logs:", err);
    return NextResponse.json({ error: "Failed to load channel audit logs." }, { status: 500 });
  }
}
