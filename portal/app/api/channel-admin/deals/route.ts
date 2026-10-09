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

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || undefined;

  try {
    const deals = await dbService.getChannelAdminDeals(status);
    return NextResponse.json({ deals, total: deals.length });
  } catch (err: any) {
    console.error("Failed to query Channel Admin deals:", err);
    return NextResponse.json({ error: "Failed to load channel deal queue." }, { status: 500 });
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
    const { dealId, decision, reviewNotes, extendDays, outcome } = body;

    if (!dealId || !decision) {
      return NextResponse.json({ error: "Deal ID and decision are required." }, { status: 400 });
    }

    if (decision === "approve" || decision === "decline") {
      const updated = await dbService.decideDealReview(
        dealId,
        decision,
        session.userId,
        session.name,
        reviewNotes
      );
      return NextResponse.json({ success: true, deal: updated });
    }

    if (decision === "extend") {
      const days = Number(extendDays) || 90;
      const updated = await dbService.extendDealProtection(
        dealId,
        days,
        session.userId,
        session.name,
        reviewNotes
      );
      return NextResponse.json({ success: true, deal: updated });
    }

    if (decision === "outcome") {
      if (outcome !== "closed_won" && outcome !== "closed_lost") {
        return NextResponse.json({ error: "Outcome must be 'closed_won' or 'closed_lost'." }, { status: 400 });
      }
      const updated = await dbService.closeDealOutcome(
        dealId,
        outcome,
        reviewNotes || "",
        session.userId,
        session.name,
        session.role
      );
      return NextResponse.json({ success: true, deal: updated });
    }

    return NextResponse.json({ error: `Unsupported decision: ${decision}` }, { status: 400 });
  } catch (err: any) {
    console.error("Failed to process deal decision:", err);
    return NextResponse.json({ error: "Failed to record deal decision." }, { status: 500 });
  }
}
