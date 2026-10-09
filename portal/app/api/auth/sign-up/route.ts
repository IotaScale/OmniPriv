import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/partner-portal/auth";
import { hashPassword } from "@/lib/partner-portal/password";
import { getPool } from "@/lib/partner-portal/db-auth";
import { logAuditEvent } from "@/lib/partner-portal/audit";
import * as crypto from "crypto";

// Maps commonly used countries to their channel region
const COUNTRY_REGION: Record<string, string> = {
  "United States": "Americas",
  "Canada": "Americas",
  "Mexico": "Americas",
  "Brazil": "Americas",
  "Argentina": "Americas",
  "Chile": "Americas",
  "Colombia": "Americas",
  "United Kingdom": "EMEA",
  "Germany": "EMEA",
  "France": "EMEA",
  "Netherlands": "EMEA",
  "Sweden": "EMEA",
  "Norway": "EMEA",
  "Denmark": "EMEA",
  "Finland": "EMEA",
  "Spain": "EMEA",
  "Italy": "EMEA",
  "Switzerland": "EMEA",
  "Belgium": "EMEA",
  "Austria": "EMEA",
  "Portugal": "EMEA",
  "Poland": "EMEA",
  "Czech Republic": "EMEA",
  "Romania": "EMEA",
  "Hungary": "EMEA",
  "UAE": "EMEA",
  "Saudi Arabia": "EMEA",
  "Israel": "EMEA",
  "Turkey": "EMEA",
  "South Africa": "EMEA",
  "Egypt": "EMEA",
  "India": "APAC",
  "Singapore": "APAC",
  "Japan": "APAC",
  "Australia": "APAC",
  "New Zealand": "APAC",
  "South Korea": "APAC",
  "Indonesia": "APAC",
  "Malaysia": "APAC",
  "Thailand": "APAC",
  "Philippines": "APAC",
  "Vietnam": "APAC",
  "Hong Kong": "APAC",
  "Taiwan": "APAC",
};

function resolveRegion(country: string): string {
  return COUNTRY_REGION[country] || "Americas";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      company_name,
      legal_name,
      website,
      country,
      company_type,
      program_tracks,
      contact_name,
      contact_email,
      contact_role,
      password,
    } = body;

    const compName = (company_name || "").trim();
    const legName = (legal_name || company_name || "").trim();

    // ── Validate required fields ──────────────────────────────────────────
    if (!compName || !country || !company_type) {
      return NextResponse.json(
        { error: "Company name, operating country, and partner type are required." },
        { status: 400 }
      );
    }

    if (!contact_name?.trim() || !contact_email?.trim() || !password) {
      return NextResponse.json(
        { error: "Primary contact name, email, and password are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact_email.trim())) {
      return NextResponse.json(
        { error: "A valid corporate email address is required." },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.length < 12) {
      return NextResponse.json(
        { error: "Password must be at least 12 characters long." },
        { status: 400 }
      );
    }

    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";

    const cleanEmail = contact_email.trim().toLowerCase();
    const pool = getPool();

    // ── Duplicate email guard ─────────────────────────────────────────────
    const dupeCheck = await pool.query(
      `SELECT id FROM users WHERE LOWER(email) = $1 LIMIT 1;`,
      [cleanEmail]
    );
    if (dupeCheck.rows.length > 0) {
      return NextResponse.json(
        {
          error:
            "An account with this email address already exists. Please sign in instead.",
          code: "EMAIL_EXISTS",
        },
        { status: 409 }
      );
    }

    // ── Generate identifiers ──────────────────────────────────────────────
    const orgId = `org-${crypto.randomBytes(8).toString("hex")}`;
    const userId = `usr-${crypto.randomBytes(8).toString("hex")}`;
    const profileId = `prof-${crypto.randomBytes(6).toString("hex")}`;
    const memId = `mem-${crypto.randomBytes(6).toString("hex")}`;
    const enrollId = `enr-${crypto.randomBytes(6).toString("hex")}`;

    // Derive a safe, unique username from the email local-part
    const emailLocal = cleanEmail.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_");
    const usernameSuffix = crypto.randomBytes(3).toString("hex");
    const username = `${emailLocal}_${usernameSuffix}`;

    const region = resolveRegion(country);
    const tracks: string[] =
      Array.isArray(program_tracks) && program_tracks.length > 0
        ? program_tracks
        : ["Sell"];

    // ── Hash password (CPU-bound, before transaction) ─────────────────────
    const passwordHash = await hashPassword(password);

    // ── Atomic PostgreSQL transaction ─────────────────────────────────────
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // 1. Partner profile (Registered tier, immediately active)
      await client.query(
        `INSERT INTO partner_profiles (
          id, partner_org_id, company_name, legal_name, website,
          country, region, primary_contact_name, primary_contact_email,
          program_status, partner_types, current_tier,
          locator_published, onboarding_completed
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'active',$10,'Registered',FALSE,FALSE)`,
        [
          profileId,
          orgId,
          compName,
          legName,
          website?.trim() || null,
          country,
          region,
          contact_name.trim(),
          cleanEmail,
          JSON.stringify([company_type]),
        ]
      );

      // 2. Users table — Partner Owner with active membership
      await client.query(
        `INSERT INTO users (
          id, username, email, password_hash, display_name,
          system_role, org_id, org_name,
          partner_membership_status, program_status, is_active
        ) VALUES ($1,$2,$3,$4,$5,'Partner Owner',$6,$7,'active','active',TRUE)`,
        [
          userId,
          username,
          cleanEmail,
          passwordHash,
          contact_name.trim(),
          orgId,
          compName,
        ]
      );

      // 3. Partner memberships
      await client.query(
        `INSERT INTO partner_memberships (
          id, partner_org_id, user_id, user_name, user_email, role, status, joined_at
        ) VALUES ($1,$2,$3,$4,$5,'Partner Owner','active',NOW())`,
        [memId, orgId, userId, contact_name.trim(), cleanEmail]
      );

      // 4. Program enrollment (Registered tier, 1-year validity)
      await client.query(
        `INSERT INTO partner_program_enrollments (
          id, partner_org_id, program_type, tier,
          effective_date, expiry_date, approval_status
        ) VALUES ($1,$2,$3,'Registered',NOW(),NOW() + INTERVAL '1 year','approved')`,
        [enrollId, orgId, tracks[0] || "Sell"]
      );

      await client.query("COMMIT");
    } catch (txErr: any) {
      await client.query("ROLLBACK");
      throw txErr;
    } finally {
      client.release();
    }

    // ── Create session token ──────────────────────────────────────────────
    const token = createSessionToken({
      id: userId,
      email: cleanEmail,
      name: contact_name.trim(),
      orgId,
      orgName: compName,
      role: "Partner Owner",
      partnerMembershipStatus: "active",
      programStatus: "active",
    });

    logAuditEvent({
      actor_user_id: userId,
      actor_name: contact_name.trim(),
      actor_role: "Partner Owner",
      actor_org_id: orgId,
      action: "partner_org.self_registered",
      target_type: "PartnerOrganization",
      target_id: orgId,
      details: `New partner company '${compName}' self-registered. Contact: ${cleanEmail}. OrgID: ${orgId}. Tier: Registered.`,
      ip_address: clientIp,
    });

    const response = NextResponse.json({
      success: true,
      returnUrl: "/partner-portal",
      orgId,
      orgName: compName,
    });

    // Set HttpOnly session cookie — grants immediate portal access
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400, // 24 hours
    });

    return response;
  } catch (err: any) {
    console.error("Partner self-registration error:", err);

    // Postgres unique constraint violation
    if (err.code === "23505") {
      return NextResponse.json(
        {
          error:
            "An account or organization with this information already exists. Please sign in.",
          code: "CONFLICT",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Registration failed. Please try again or contact partner-desk@omnipriv.com." },
      { status: 500 }
    );
  }
}
