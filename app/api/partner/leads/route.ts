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

  if (!hasCapability(role, "channel.lead.read_assigned")) {
    return NextResponse.json({ error: "Unauthorized: Missing lead read capability." }, { status: 403 });
  }

  try {
    const leads = await dbService.getPartnerLeads(orgId);
    return NextResponse.json({ leads, total: leads.length });
  } catch (err: any) {
    console.error("Failed to query partner leads:", err);
    return NextResponse.json({ error: "Failed to retrieve assigned leads from database." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized: Active session required." }, { status: 401 });
  }

  const { orgId, role, userId, name } = session;

  if (!hasCapability(role, "channel.lead.read_assigned")) {
    return NextResponse.json({ error: "Unauthorized: Missing lead action capability." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { leadId, action, reason, dealData } = body;

    if (!leadId || !action) {
      return NextResponse.json({ error: "Lead ID and action are required." }, { status: 400 });
    }

    if (action === "accept") {
      const updated = await dbService.updateLeadStatus(leadId, orgId, "accepted", userId, name);
      return NextResponse.json({ success: true, lead: updated });
    }

    if (action === "decline") {
      const updated = await dbService.updateLeadStatus(leadId, orgId, "declined", userId, name, reason);
      return NextResponse.json({ success: true, lead: updated });
    }

    if (action === "convert") {
      // Find lead to convert
      const leads = await dbService.getPartnerLeads(orgId);
      const targetLead = leads.find((l: any) => l.id === leadId);
      if (!targetLead) {
        return NextResponse.json({ error: "Lead not found." }, { status: 404 });
      }

      // Create deal registration
      const newDeal = await dbService.createPartnerDeal(orgId, userId, name, {
        customer_name: targetLead.prospect_company,
        customer_domain: targetLead.prospect_contact_email.split("@")[1] || "prospect.com",
        customer_country: targetLead.prospect_country || "United States",
        opportunity_name: dealData?.opportunity_name || `Inbound Lead: ${targetLead.prospect_company}`,
        estimated_value_usd: Number(dealData?.estimated_value_usd) || 50000,
        estimated_close_date: dealData?.estimated_close_date || new Date(Date.now() + 60 * 86400000).toISOString().split("T")[0],
        target_products: ["OmniPriv Enterprise PAM"],
        estimated_seats: 50,
      });

      // Update lead to converted
      await dbService.updateLeadStatus(leadId, orgId, "converted", userId, name);

      return NextResponse.json({
        success: true,
        message: "Lead successfully converted to registered deal.",
        deal: newDeal,
      });
    }

    return NextResponse.json({ error: `Unsupported action: ${action}` }, { status: 400 });
  } catch (err: any) {
    console.error("Failed to update lead:", err);
    return NextResponse.json({ error: "Failed to process lead action." }, { status: 500 });
  }
}
