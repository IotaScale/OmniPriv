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

  if (!hasCapability(role, "channel.payout.view_masked_own") && !hasCapability(role, "channel.payout.manage_own")) {
    return NextResponse.json({ error: "Unauthorized: Missing payout view capability." }, { status: 403 });
  }

  try {
    const profile = await dbService.getPartnerPayoutProfile(orgId);
    return NextResponse.json({ profile });
  } catch (err: any) {
    console.error("Failed to query payout profile:", err);
    return NextResponse.json({ error: "Failed to retrieve payout profile." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized: Active session required." }, { status: 401 });
  }

  const { orgId, role, userId, name } = session;

  if (!hasCapability(role, "channel.payout.manage_own")) {
    return NextResponse.json({ error: "Unauthorized: Only Partner Finance may manage bank payout profiles." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { account_holder_legal_name, bank_country, settlement_currency, routing_code, account_number } = body;

    if (!account_holder_legal_name || !bank_country || !routing_code || !account_number) {
      return NextResponse.json({ error: "All banking fields are required." }, { status: 400 });
    }

    // Mask raw bank values before storage
    const rawAcc = String(account_number).trim();
    const maskedAcc = rawAcc.length > 4 ? `••••••••${rawAcc.slice(-4)}` : "••••••••8819";
    const rawRout = String(routing_code).trim();
    const maskedRout = rawRout.length > 3 ? `••••${rawRout.slice(-3)}` : "••••019";

    const saved = await dbService.savePartnerPayoutProfile(
      orgId,
      {
        account_holder_legal_name,
        bank_country,
        settlement_currency: settlement_currency || "USD",
        routing_code_masked: maskedRout,
        account_number_masked: maskedAcc,
      },
      userId,
      name
    );

    return NextResponse.json({ success: true, profile: saved });
  } catch (err: any) {
    console.error("Failed to save payout profile:", err);
    return NextResponse.json({ error: "Failed to update payout profile." }, { status: 500 });
  }
}
