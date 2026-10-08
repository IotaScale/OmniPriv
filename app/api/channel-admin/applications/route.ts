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
    const applications = await dbService.listPartnerApplications(status);
    return NextResponse.json({ applications, total: applications.length });
  } catch (err: any) {
    console.error("Failed to query partner applications:", err);
    return NextResponse.json({ error: "Failed to load partner applications." }, { status: 500 });
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
    const { action, applicationId, decision, reason, notes, provisioningConfig } = body;

    if (!applicationId) {
      return NextResponse.json({ error: "Application ID is required." }, { status: 400 });
    }

    if (action === "review") {
      const updated = await dbService.reviewPartnerApplication(
        applicationId,
        decision,
        session.userId,
        session.name,
        reason,
        notes
      );
      return NextResponse.json({ success: true, application: updated });
    }

    if (action === "provision") {
      if (!provisioningConfig || !provisioningConfig.partner_org_id || !provisioningConfig.company_name) {
        return NextResponse.json(
          { error: "Provisioning configuration (partner_org_id, company_name, tier) is required." },
          { status: 400 }
        );
      }

      const profile = await dbService.provisionPartnerOrganization(
        applicationId,
        {
          ...provisioningConfig,
          application_id: applicationId,
        },
        session.userId,
        session.name
      );

      return NextResponse.json({
        success: true,
        message: `Partner Organization '${profile.company_name}' (${profile.partner_org_id}) successfully provisioned in PostgreSQL.`,
        profile,
      });
    }

    return NextResponse.json({ error: `Unsupported action: ${action}` }, { status: 400 });
  } catch (err: any) {
    console.error("Application action error:", err);
    return NextResponse.json({ error: "Failed to process application action." }, { status: 500 });
  }
}
