import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/partner-portal/db-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      company_name,
      legal_name,
      website,
      country,
      region,
      primary_contact_name,
      primary_contact_email,
      primary_contact_phone,
      primary_contact_role,
      company_type,
      program_tracks,
      intended_vertical,
      partnership_scope,
      experience_summary,
      notes,
      consent_acknowledged,
    } = body;

    // Strict input validation
    if (!company_name || !legal_name || !country || !region || !primary_contact_name || !primary_contact_email || !company_type) {
      return NextResponse.json(
        { error: "Missing required company or primary contact fields." },
        { status: 400 }
      );
    }

    if (!consent_acknowledged) {
      return NextResponse.json(
        { error: "You must acknowledge and accept the partner program terms to submit an application." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(primary_contact_email)) {
      return NextResponse.json(
        { error: "A valid corporate contact email address is required." },
        { status: 400 }
      );
    }

    const application = await dbService.createPartnerApplication({
      company_name,
      legal_name,
      website,
      country,
      region,
      primary_contact_name,
      primary_contact_email,
      primary_contact_phone,
      primary_contact_role,
      company_type,
      program_tracks: Array.isArray(program_tracks) && program_tracks.length > 0 ? program_tracks : ["Sell"],
      intended_vertical,
      partnership_scope,
      experience_summary,
      notes,
    });

    return NextResponse.json({
      success: true,
      applicationNumber: application.application_number,
      companyName: application.company_name,
      status: application.status,
      message: "Partner organization application successfully received. OmniPriv Channel Administration will conduct commercial review and due diligence.",
    });
  } catch (err: any) {
    console.error("Partner application submission error:", err);
    return NextResponse.json(
      { error: "Failed to submit partner application. Please try again or contact partner-desk@omnipriv.com." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const appNumber = searchParams.get("appNumber");
  const email = searchParams.get("email");

  if (!appNumber || !email) {
    return NextResponse.json(
      { error: "Application number and primary contact email are required to check status." },
      { status: 400 }
    );
  }

  try {
    const statusRecord = await dbService.getPartnerApplicationByNumber(appNumber, email);
    if (!statusRecord) {
      return NextResponse.json(
        { error: "No matching partner application found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ statusRecord });
  } catch (err: any) {
    console.error("Status check error:", err);
    return NextResponse.json({ error: "Failed to query application status." }, { status: 500 });
  }
}
