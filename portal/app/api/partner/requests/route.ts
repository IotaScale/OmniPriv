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

  if (!hasCapability(role, "channel.entitlement.request")) {
    return NextResponse.json({ error: "Unauthorized: Missing entitlement capability." }, { status: 403 });
  }

  try {
    const requests = await dbService.getPartnerEntitlements(orgId);
    return NextResponse.json({ requests, total: requests.length });
  } catch (err: any) {
    console.error("Failed to query requests:", err);
    return NextResponse.json({ error: "Failed to retrieve commercial requests." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized: Active session required." }, { status: 401 });
  }

  const { orgId, role, userId, name } = session;

  if (!hasCapability(role, "channel.entitlement.request")) {
    return NextResponse.json({ error: "Unauthorized: Missing entitlement creation capability." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { request_type, product_edition, duration_days, target_customer_name, requested_seats, justification } = body;

    if (!request_type || !product_edition || !justification) {
      return NextResponse.json(
        { error: "Request type, product edition, and business justification are required." },
        { status: 400 }
      );
    }

    const created = await dbService.createPartnerEntitlement(orgId, userId, name, {
      request_type,
      product_edition,
      duration_days: Number(duration_days) || 30,
      target_customer_name,
      requested_seats: Number(requested_seats) || 25,
      justification,
    });

    return NextResponse.json({ success: true, request: created });
  } catch (err: any) {
    console.error("Failed to create request:", err);
    return NextResponse.json({ error: "Failed to submit entitlement request." }, { status: 500 });
  }
}
