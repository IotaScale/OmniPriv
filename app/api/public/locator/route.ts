import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/partner-portal/db-auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region");
  const query = searchParams.get("query")?.toLowerCase();

  try {
    const pool = getPool();
    let sql = `
      SELECT id, display_name, headquarters, service_regions, specializations,
             certifications_summary, public_description, public_contact_email, public_website
      FROM partner_locator_profiles
      WHERE is_active_listing = TRUE AND admin_approved = TRUE
    `;
    const params: any[] = [];

    if (query) {
      params.push(`%${query}%`);
      sql += ` AND (LOWER(display_name) LIKE $${params.length} OR LOWER(headquarters) LIKE $${params.length})`;
    }

    sql += ` ORDER BY display_name ASC;`;

    const result = await pool.query(sql, params);
    let listings = result.rows;

    if (region && region !== "all") {
      listings = listings.filter((l) =>
        Array.isArray(l.service_regions) &&
        l.service_regions.some((r: string) => r.toLowerCase().includes(region.toLowerCase()))
      );
    }

    return NextResponse.json({
      listings,
      total: listings.length,
    });
  } catch (err: any) {
    console.error("Public locator query error:", err);
    return NextResponse.json({ error: "Failed to retrieve approved partner directory listings." }, { status: 500 });
  }
}
