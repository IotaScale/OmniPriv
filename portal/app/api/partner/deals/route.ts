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

  if (!hasCapability(role, "channel.deal.read_own") && !hasCapability(role, "channel.deal.review")) {
    return NextResponse.json({ error: "Unauthorized: Missing deal read capability." }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || undefined;
  const query = searchParams.get("query") || undefined;

  try {
    const deals = await dbService.getPartnerDeals(orgId, status, query);
    return NextResponse.json({ deals, total: deals.length });
  } catch (err: any) {
    console.error("Failed to query partner deals:", err);
    return NextResponse.json({ error: "Failed to retrieve registered deals from database." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized: Active session required." }, { status: 401 });
  }

  const { orgId, role, userId, name } = session;

  if (!hasCapability(role, "channel.deal.create")) {
    return NextResponse.json({ error: "Unauthorized: Your role cannot register deals." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      customer_name,
      customer_domain,
      customer_country,
      opportunity_name,
      estimated_value_usd,
      estimated_close_date,
      target_products,
      estimated_seats,
      license_model,
    } = body;

    if (!customer_name || !customer_domain || !opportunity_name || !estimated_close_date) {
      return NextResponse.json(
        { error: "Customer name, domain, opportunity name, and estimated close date are required." },
        { status: 400 }
      );
    }

    const deal = await dbService.createPartnerDeal(orgId, userId, name, {
      customer_name,
      customer_domain,
      customer_country: customer_country || "United States",
      opportunity_name,
      estimated_value_usd: Number(estimated_value_usd) || 0,
      estimated_close_date,
      target_products,
      estimated_seats: Number(estimated_seats) || 50,
      license_model,
    });

    return NextResponse.json({
      success: true,
      deal,
      message: deal.conflict_detected
        ? "Deal registered with conflict flag. OmniPriv Channel Admin will arbitrate protection lock."
        : "Deal registered successfully with 90-day protection lock.",
    });
  } catch (err: any) {
    console.error("Failed to register deal:", err);
    return NextResponse.json({ error: "Failed to register opportunity." }, { status: 500 });
  }
}
