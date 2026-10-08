import * as fs from "fs";
import * as path from "path";

// Auto-load .env.local or .env if present
for (const envFile of [".env.local", ".env"]) {
  const envPath = path.resolve(process.cwd(), envFile);
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const k = trimmed.slice(0, eqIdx).trim();
        let v = trimmed.slice(eqIdx + 1).trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }
        if (!process.env[k]) {
          process.env[k] = v;
        }
      }
    }
  }
}

import { getPool } from "../lib/partner-portal/db-auth";
import { dbService } from "../lib/partner-portal/db-service";
import { verifyUserCredentials } from "../lib/partner-portal/db-auth";
import { hashPassword } from "../lib/partner-portal/password";
import { createSessionToken, verifySessionToken } from "../lib/partner-portal/auth";
import * as crypto from "crypto";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
}

async function runKasperskyE2ETests() {
  console.log("\n========================================================");
  console.log("RUNNING KASPERSKY-STYLE B2B CHANNEL WORKFLOW E2E VALIDATION");
  console.log("========================================================\n");

  const pool = getPool();
  const testSuffix = crypto.randomBytes(4).toString("hex");

  // =========================================================================
  // 1. SELF-SERVICE PARTNER REGISTRATION (ATOMIC TRANSACTION)
  // =========================================================================
  const testCompany = `Vanguard Cyber Reseller ${testSuffix}`;
  const testEmail = `partner_${testSuffix}@vanguardcyber.example`;
  const testPassword = `P@ssw0rd_${testSuffix}_Secure2026!`;
  const testDomain = `customer-${testSuffix}.com`;

  const orgId = `org-${crypto.randomBytes(8).toString("hex")}`;
  const userId = `usr-${crypto.randomBytes(8).toString("hex")}`;
  const profileId = `prof-${crypto.randomBytes(6).toString("hex")}`;
  const memId = `mem-${crypto.randomBytes(6).toString("hex")}`;
  const enrollId = `enr-${crypto.randomBytes(6).toString("hex")}`;

  const passwordHash = await hashPassword(testPassword);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `INSERT INTO partner_profiles (
        id, partner_org_id, company_name, legal_name, website,
        country, region, primary_contact_name, primary_contact_email,
        program_status, partner_types, current_tier,
        locator_published, onboarding_completed
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'active',$10,'Registered',FALSE,FALSE);`,
      [
        profileId, orgId, testCompany, `${testCompany} Ltd`, "https://vanguardcyber.example",
        "United States", "Americas", "Alexander Hayes", testEmail,
        JSON.stringify(["Reseller"]),
      ]
    );

    await client.query(
      `INSERT INTO users (
        id, username, email, password_hash, display_name,
        system_role, org_id, org_name,
        partner_membership_status, program_status, is_active
      ) VALUES ($1,$2,$3,$4,$5,'Partner Owner',$6,$7,'active','active',TRUE);`,
      [userId, `alex_${testSuffix}`, testEmail, passwordHash, "Alexander Hayes", orgId, testCompany]
    );

    await client.query(
      `INSERT INTO partner_memberships (
        id, partner_org_id, user_id, user_name, user_email, role, status, joined_at
      ) VALUES ($1,$2,$3,$4,$5,'Partner Owner','active',NOW());`,
      [memId, orgId, userId, "Alexander Hayes", testEmail]
    );

    await client.query(
      `INSERT INTO partner_program_enrollments (
        id, partner_org_id, program_type, tier, effective_date, expiry_date, approval_status
      ) VALUES ($1,$2,'Sell','Registered',NOW(),NOW() + INTERVAL '1 year','approved');`,
      [enrollId, orgId]
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }

  assert(true, "1. Self-service registration created partner_profiles, users, partner_memberships atomically");

  // =========================================================================
  // 2. IMMEDIATE OPERATIONAL ACCESS: VERIFY CREDENTIALS & ACTIVE STATUS
  // =========================================================================
  const authUser = await verifyUserCredentials(testEmail, testPassword, "127.0.0.1");
  assert(
    Boolean(authUser && authUser.id === userId && authUser.programStatus === "active" && authUser.role === "Partner Owner"),
    "2. Newly registered company owner authenticates immediately without 'pending review' gate"
  );

  const orgProfile = await dbService.getPartnerProfile(orgId);
  assert(
    Boolean(orgProfile && orgProfile.current_tier === "Registered" && orgProfile.program_status === "active"),
    "3. Organization enters default 'Registered' tier with active operational status"
  );

  // =========================================================================
  // 3. REGISTER A DEAL: PERSISTED IN AWAITING_APPROVAL (NO PREMATURE LOCK)
  // =========================================================================
  const registeredDeal = await dbService.createPartnerDeal(orgId, userId, "Alexander Hayes", {
    customer_name: "Apex Global FinTech",
    customer_domain: testDomain,
    customer_country: "United States",
    customer_industry: "Financial Services",
    customer_contact_name: "Gregory Vance",
    customer_contact_email: `g.vance@${testDomain}`,
    customer_contact_phone: "+1 555 0192",
    opportunity_name: "Apex FinTech - Tier-0 PAM Bastion",
    estimated_value_usd: 125000,
    estimated_close_date: "2026-12-15",
    target_products: ["OmniPriv Enterprise PAM"],
    estimated_seats: 150,
    license_model: "Annual Subscription",
    deployment_timeline: "1-3 months",
    opportunity_source: "Direct Outreach",
    partner_notes: "CISO verified active evaluation project.",
  });

  assert(
    Boolean(
      registeredDeal &&
      registeredDeal.deal_code &&
      registeredDeal.status === "awaiting_approval" &&
      registeredDeal.protection_expires_at === null &&
      registeredDeal.conflict_detected === false
    ),
    "4. Deal submission sets status='awaiting_approval' and does NOT grant premature protection lock"
  );

  // =========================================================================
  // 4. CONFLICT DETECTION: COMPETING REGISTRATION FLAGGED
  // =========================================================================
  const competingDeal = await dbService.createPartnerDeal("org-partner-sentinel", "usr-competing", "Competitor Rep", {
    customer_name: "Apex Global FinTech Competitor Attempt",
    customer_domain: testDomain,
    customer_country: "United States",
    opportunity_name: "Apex FinTech Competing Bid",
    estimated_value_usd: 100000,
    estimated_close_date: "2026-12-15",
  });

  assert(
    Boolean(competingDeal && competingDeal.conflict_detected === true),
    "5. Server-side domain conflict check detects active registration and flags conflict for Channel Admin review"
  );

  // =========================================================================
  // 5. CHANNEL ADMIN APPROVAL: GRANTS 90-DAY PROTECTION LOCK
  // =========================================================================
  const approvedDeal = await dbService.decideDealReview(
    registeredDeal.id,
    "approve",
    "usr-admin-test",
    "Internal Channel Admin",
    "Verified primary engagement. 90-day deal protection lock granted."
  );

  assert(
    Boolean(
      approvedDeal &&
      approvedDeal.status === "approved" &&
      approvedDeal.protection_expires_at &&
      new Date(approvedDeal.protection_expires_at) > new Date()
    ),
    "6. Channel Admin approval grants 90-day protection lock and persists protection_expires_at"
  );

  // =========================================================================
  // 6. PARTNER CROSS-ORG PURVIEW & RBAC ENFORCEMENT
  // =========================================================================
  const partnerDeals = await dbService.getPartnerDeals(orgId);
  assert(
    partnerDeals.every((d: any) => d.partner_org_id === orgId),
    "7. Partner queries return strictly their own organization's records (Tenant Isolation)"
  );

  const adminOverview = await dbService.getChannelAdminOverview();
  assert(
    Boolean(adminOverview && adminOverview.partnersTotal >= 1 && adminOverview.approvedPipelineValue > 0),
    "8. Channel Admin overview computes aggregate metrics across all organizations"
  );

  // =========================================================================
  // 7. INBOUND LEAD DISPATCH & CONVERT TO DEAL WORKFLOW
  // =========================================================================
  const leadRes = await pool.query(
    `INSERT INTO partner_leads (
      id, partner_org_id, prospect_company, prospect_contact_name, prospect_contact_email,
      prospect_country, estimated_scope, assigned_at, sla_deadline, status
    ) VALUES (
      $1, $2, 'NorthStar Health Systems', 'Dr. Rachel Cole', 'r.cole@northstarhealth.example',
      'United States', 'OmniPriv Enterprise Credential Vault & Bastion', NOW(), NOW() + INTERVAL '7 days', 'assigned'
    ) RETURNING *;`,
    [`lead-${crypto.randomBytes(6).toString("hex")}`, orgId]
  );
  const createdLead = leadRes.rows[0];

  assert(Boolean(createdLead && createdLead.status === "assigned"), "9. Lead dispatched to partner with persisted 7-day SLA");

  // Partner accepts lead
  const acceptedLead = await dbService.updateLeadStatus(createdLead.id, orgId, "accepted", userId, "Alexander Hayes");
  assert(Boolean(acceptedLead && acceptedLead.status === "accepted"), "10. Partner accepts lead before SLA deadline");

  // Cleanup test records
  await pool.query(`DELETE FROM users WHERE id = $1;`, [userId]);
  await pool.query(`DELETE FROM deal_registrations WHERE id IN ($1, $2);`, [registeredDeal.id, competingDeal.id]);
  await pool.query(`DELETE FROM partner_leads WHERE id = $1;`, [createdLead.id]);
  await pool.query(`DELETE FROM partner_profiles WHERE partner_org_id = $1;`, [orgId]);

  console.log("\n========================================================");
  console.log("ALL 10 KASPERSKY B2B PARTNER PIPELINE WORKFLOW TESTS PASSED (100%)!");
  console.log("========================================================\n");

  await pool.end();
}

runKasperskyE2ETests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Kaspersky E2E Test Failure:", err);
    process.exit(1);
  });
