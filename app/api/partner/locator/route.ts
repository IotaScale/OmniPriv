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

  if (!hasCapability(role, "channel.locator.manage_own")) {
    return NextResponse.json({ error: "Unauthorized: Missing locator capability." }, { status: 403 });
  }

  try {
    const profile = await dbService.getPartnerLocatorProfile(orgId);
    return NextResponse.json({ profile });
  } catch (err: any) {
    console.error("Failed to query locator profile:", err);
    return NextResponse.json({ error: "Failed to retrieve locator profile." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized: Active session required." }, { status: 401 });
  }

  const { orgId, role } = session;

  if (!hasCapability(role, "channel.locator.manage_own")) {
    return NextResponse.json({ error: "Unauthorized: Missing locator capability." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const updated = await dbService.updatePartnerLocatorProfile(orgId, body);
    return NextResponse.json({ success: true, profile: updated });
  } catch (err: any) {
    console.error("Failed to update locator profile:", err);
    return NextResponse.json({ error: "Failed to update locator profile." }, { status: 500 });
  }
}
