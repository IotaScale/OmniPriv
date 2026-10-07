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
    const payouts = await dbService.getChannelAdminPayouts();
    return NextResponse.json({ payouts, total: payouts.length });
  } catch (err: any) {
    console.error("Failed to query Channel Admin payouts:", err);
    return NextResponse.json({ error: "Failed to load payout review queue." }, { status: 500 });
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
    const { payoutId, action, reason } = body;

    if (!payoutId || !action) {
      return NextResponse.json({ error: "Payout ID and action ('verify' | 'request_changes') are required." }, { status: 400 });
    }

    const updated = await dbService.decidePayoutReview(
      payoutId,
      action,
      session.userId,
      session.name,
      reason
    );

    return NextResponse.json({ success: true, payout: updated });
  } catch (err: any) {
    console.error("Failed to process payout decision:", err);
    return NextResponse.json({ error: "Failed to record payout decision." }, { status: 500 });
  }
}
