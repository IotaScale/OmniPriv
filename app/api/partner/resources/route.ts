import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/partner-portal/auth";
import { dbService } from "@/lib/partner-portal/db-service";
import { hasCapability } from "@/lib/partner-portal/permissions";

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized: Active session required." }, { status: 401 });
  }

  const { role } = session;

  if (!hasCapability(role, "channel.resource.read")) {
    return NextResponse.json({ error: "Unauthorized: Missing resource read capability." }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;

  try {
    const resources = await dbService.getPartnerResources(category);
    return NextResponse.json({ resources, total: resources.length });
  } catch (err: any) {
    console.error("Failed to query resources:", err);
    return NextResponse.json({ error: "Failed to retrieve resources." }, { status: 500 });
  }
}
