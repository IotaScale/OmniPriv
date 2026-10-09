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

  if (!hasCapability(role, "channel.learning.read")) {
    return NextResponse.json({ error: "Unauthorized: Missing learning read capability." }, { status: 403 });
  }

  try {
    const data = await dbService.getPartnerLearningAndCerts(orgId);
    return NextResponse.json({
      courses: data.courses,
      certifications: data.certifications,
    });
  } catch (err: any) {
    console.error("Failed to query learning & certs:", err);
    return NextResponse.json({ error: "Failed to retrieve learning catalog." }, { status: 500 });
  }
}
