import { getPool } from "./db-auth";
import { logAuditEvent } from "./audit";
import * as crypto from "crypto";

export interface PartnerApplicationInput {
  company_name: string;
  legal_name: string;
  website?: string;
  country: string;
  region: string;
  primary_contact_name: string;
  primary_contact_email: string;
  primary_contact_phone?: string;
  primary_contact_role?: string;
  company_type: string;
  program_tracks: string[];
  intended_vertical?: string;
  partnership_scope?: string;
  experience_summary?: string;
  notes?: string;
}

export interface ProvisioningConfig {
  application_id: string;
  company_name: string;
  legal_name: string;
  partner_org_id: string;
  country: string;
  region: string;
  company_type: string;
  tier: "Registered" | "Silver" | "Gold" | "Platinum";
  program_tracks: string[];
  partner_manager_id: string;
  partner_manager_name: string;
  initial_user_name: string;
  initial_user_email: string;
  initial_user_role: string;
}

// Helper to generate secure random codes
function generateCode(prefix: string): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${new Date().getFullYear()}-${num}`;
}

export const dbService = {
  // =========================================================================
  // 1. PUBLIC PARTNER APPLICATION WORKFLOWS
  // =========================================================================
  async createPartnerApplication(input: PartnerApplicationInput) {
    const pool = getPool();
    const id = `app-${crypto.randomBytes(8).toString("hex")}`;
    const appNumber = generateCode("APP");

    const query = `
      INSERT INTO partner_applications (
        id, application_number, company_name, legal_name, website,
        country, region, primary_contact_name, primary_contact_email,
        primary_contact_phone, primary_contact_role, company_type,
        program_tracks, intended_vertical, partnership_scope,
        experience_summary, notes, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, 'submitted')
      RETURNING *;
    `;

    const values = [
      id,
      appNumber,
      input.company_name.trim(),
      input.legal_name.trim(),
      input.website?.trim() || null,
      input.country.trim(),
      input.region.trim(),
      input.primary_contact_name.trim(),
      input.primary_contact_email.trim().toLowerCase(),
      input.primary_contact_phone?.trim() || null,
      input.primary_contact_role?.trim() || "Executive / Partner Lead",
      input.company_type,
      JSON.stringify(input.program_tracks || ["Sell"]),
      input.intended_vertical || null,
      input.partnership_scope || null,
      input.experience_summary || null,
      input.notes || null,
    ];

    const result = await pool.query(query, values);
    const row = result.rows[0];

    logAuditEvent({
      actor_user_id: "public-applicant",
      actor_name: input.primary_contact_name,
      actor_role: "Prospective Partner",
      actor_org_id: "unprovisioned",
      action: "partner.application.submitted",
      target_type: "PartnerApplication",
      target_id: row.id,
      details: `Partner application submitted for company '${input.company_name}' (${appNumber}).`,
    });

    return row;
  },

  async getPartnerApplicationByNumber(appNumber: string, email: string) {
    const pool = getPool();
    const result = await pool.query(
      `SELECT application_number, company_name, status, created_at, updated_at, decision_reason, information_request_notes
       FROM partner_applications
       WHERE LOWER(application_number) = LOWER($1) AND LOWER(primary_contact_email) = LOWER($2)
       LIMIT 1;`,
      [appNumber.trim(), email.trim()]
    );
    return result.rows[0] || null;
  },

  async listPartnerApplications(statusFilter?: string) {
    const pool = getPool();
    let query = `SELECT * FROM partner_applications`;
    const params: any[] = [];
    if (statusFilter && statusFilter !== "all") {
      query += ` WHERE status = $1`;
      params.push(statusFilter);
    }
    query += ` ORDER BY created_at DESC;`;
    const result = await pool.query(query, params);
    return result.rows;
  },

  async reviewPartnerApplication(
    appId: string,
    decision: "under_review" | "information_requested" | "approved" | "rejected" | "withdrawn",
    reviewerId: string,
    reviewerName: string,
    reason?: string,
    notes?: string
  ) {
    const pool = getPool();
    const query = `
      UPDATE partner_applications
      SET status = $1, reviewer_id = $2, reviewer_name = $3,
          decision_reason = $4, information_request_notes = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING *;
    `;
    const result = await pool.query(query, [
      decision,
      reviewerId,
      reviewerName,
      reason || null,
      notes || null,
      appId,
    ]);

    const row = result.rows[0];
    if (row) {
      logAuditEvent({
        actor_user_id: reviewerId,
        actor_name: reviewerName,
        actor_role: "Channel Admin",
        actor_org_id: "org-omnipriv-internal",
        action: `partner.application.${decision}`,
        target_type: "PartnerApplication",
        target_id: appId,
        details: `Application ${row.application_number} status set to '${decision}' by ${reviewerName}. Reason: ${reason || "N/A"}`,
      });
    }
    return row;
  },

  async provisionPartnerOrganization(
    appId: string,
    config: ProvisioningConfig,
    adminId: string,
    adminName: string
  ) {
    const pool = getPool();

    // 1. Create or upsert partner_profiles
    const profileId = `prof-${crypto.randomBytes(6).toString("hex")}`;
    const profileQuery = `
      INSERT INTO partner_profiles (
        id, partner_org_id, company_name, legal_name, country, region,
        primary_contact_name, primary_contact_email, primary_partner_manager_id,
        primary_partner_manager_name, program_status, partner_types, current_tier,
        locator_published, onboarding_completed, terms_accepted_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'active', $11, $12, FALSE, TRUE, NOW())
      ON CONFLICT (partner_org_id) DO UPDATE SET
        company_name = EXCLUDED.company_name,
        legal_name = EXCLUDED.legal_name,
        current_tier = EXCLUDED.current_tier,
        program_status = 'active',
        updated_at = NOW()
      RETURNING *;
    `;

    const profileRes = await pool.query(profileQuery, [
      profileId,
      config.partner_org_id,
      config.company_name,
      config.legal_name,
      config.country,
      config.region,
      config.initial_user_name,
      config.initial_user_email.toLowerCase(),
      config.partner_manager_id,
      config.partner_manager_name,
      JSON.stringify([config.company_type]),
      config.tier,
    ]);

    // 2. Create partner_program_enrollments
    const enrollId = `enr-${crypto.randomBytes(6).toString("hex")}`;
    await pool.query(
      `INSERT INTO partner_program_enrollments (
        id, partner_org_id, program_type, tier, effective_date, expiry_date, approval_status
      ) VALUES ($1, $2, $3, $4, NOW(), NOW() + INTERVAL '1 year', 'approved');`,
      [enrollId, config.partner_org_id, config.program_tracks[0] || "Sell", config.tier]
    );

    // 3. Create or update user in users table
    const userId = `usr-${crypto.randomBytes(6).toString("hex")}`;
    const userQuery = `
      INSERT INTO users (
        id, username, email, display_name, password_hash,
        system_role, org_id, org_name, partner_membership_status, program_status, is_active
      ) VALUES ($1, $2, $3, $4, 'scrypt:v1:temp-invited-hash', $5, $6, $7, 'active', 'active', TRUE)
      ON CONFLICT (id) DO NOTHING;
    `;
    const usernameSlug = config.initial_user_email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "_");
    await pool.query(userQuery, [
      userId,
      usernameSlug,
      config.initial_user_email.toLowerCase(),
      config.initial_user_name,
      config.initial_user_role || "Partner Owner",
      config.partner_org_id,
      config.company_name,
    ]);

    // 4. Create partner_memberships
    const memId = `mem-${crypto.randomBytes(6).toString("hex")}`;
    await pool.query(
      `INSERT INTO partner_memberships (
        id, partner_org_id, user_id, user_name, user_email, role, status, joined_at
      ) VALUES ($1, $2, $3, $4, $5, $6, 'active', NOW())
      ON CONFLICT (partner_org_id, user_id) DO UPDATE SET role = EXCLUDED.role, status = 'active';`,
      [
        memId,
        config.partner_org_id,
        userId,
        config.initial_user_name,
        config.initial_user_email.toLowerCase(),
        config.initial_user_role || "Partner Owner",
      ]
    );

    // 5. Update partner_applications to approved
    await pool.query(
      `UPDATE partner_applications
       SET status = 'approved', created_partner_org_id = $1, reviewer_id = $2, reviewer_name = $3, updated_at = NOW()
       WHERE id = $4;`,
      [config.partner_org_id, adminId, adminName, appId]
    );

    logAuditEvent({
      actor_user_id: adminId,
      actor_name: adminName,
      actor_role: "Channel Admin",
      actor_org_id: "org-omnipriv-internal",
      action: "partner_org.provisioned",
      target_type: "PartnerOrganization",
      target_id: config.partner_org_id,
      details: `Approved application and provisioned Partner Organization '${config.company_name}' (${config.partner_org_id}) with tier ${config.tier}.`,
    });

    return profileRes.rows[0];
  },

  // =========================================================================
  // 2. PARTNER WORKSPACE QUERIES (Scoped strictly to trusted partner orgId)
  // =========================================================================
  async getPartnerProfile(orgId: string) {
    const pool = getPool();
    const result = await pool.query(
      `SELECT * FROM partner_profiles WHERE partner_org_id = $1 LIMIT 1;`,
      [orgId]
    );
    return result.rows[0] || null;
  },

  async getPartnerDashboardMetrics(orgId: string) {
    const pool = getPool();

    // Query real deal counts
    const dealsRes = await pool.query(
      `SELECT COUNT(*) as total,
              COUNT(*) FILTER (WHERE status = 'under_review' OR conflict_detected = TRUE) as under_review_count,
              COUNT(*) FILTER (WHERE status = 'approved') as approved_count
       FROM deal_registrations WHERE partner_org_id = $1;`,
      [orgId]
    );

    // Query real leads counts
    const leadsRes = await pool.query(
      `SELECT COUNT(*) as total,
              COUNT(*) FILTER (WHERE status = 'assigned') as assigned_count
       FROM partner_leads WHERE partner_org_id = $1;`,
      [orgId]
    );

    // Query real renewals counts
    const renewalsRes = await pool.query(
      `SELECT COUNT(*) as total,
              COUNT(*) FILTER (WHERE status = 'upcoming') as upcoming_count
       FROM renewal_opportunities WHERE partner_org_id = $1;`,
      [orgId]
    );

    // Query profile for tier and onboarding
    const profileRes = await pool.query(
      `SELECT company_name, current_tier, program_status, primary_partner_manager_name, onboarding_completed
       FROM partner_profiles WHERE partner_org_id = $1 LIMIT 1;`,
      [orgId]
    );

    const deals = dealsRes.rows[0] || { total: 0, under_review_count: 0, approved_count: 0 };
    const leads = leadsRes.rows[0] || { total: 0, assigned_count: 0 };
    const renewals = renewalsRes.rows[0] || { total: 0, upcoming_count: 0 };
    const profile = profileRes.rows[0] || null;

    return {
      dealCount: parseInt(deals.total, 10),
      dealsUnderReview: parseInt(deals.under_review_count, 10),
      dealsApproved: parseInt(deals.approved_count, 10),
      leadCount: parseInt(leads.total, 10),
      leadsAwaitingSla: parseInt(leads.assigned_count, 10),
      renewalCount: parseInt(renewals.total, 10),
      renewalsUpcoming: parseInt(renewals.upcoming_count, 10),
      profile,
    };
  },

  async getPartnerDeals(orgId: string, statusFilter?: string, queryFilter?: string) {
    const pool = getPool();
    let query = `SELECT * FROM deal_registrations WHERE partner_org_id = $1`;
    const params: any[] = [orgId];

    if (statusFilter && statusFilter !== "all") {
      params.push(statusFilter);
      query += ` AND status = $${params.length}`;
    }

    if (queryFilter) {
      params.push(`%${queryFilter.toLowerCase()}%`);
      query += ` AND (LOWER(customer_name) LIKE $${params.length} OR LOWER(opportunity_name) LIKE $${params.length} OR LOWER(deal_code) LIKE $${params.length})`;
    }

    query += ` ORDER BY created_at DESC;`;
    const result = await pool.query(query, params);
    return result.rows;
  },

  async createPartnerDeal(
    orgId: string,
    userId: string,
    userName: string,
    deal: {
      customer_name: string;
      customer_domain: string;
      customer_country: string;
      customer_industry?: string;
      customer_contact_name?: string;
      customer_contact_email?: string;
      customer_contact_phone?: string;
      opportunity_name: string;
      estimated_value_usd: number;
      estimated_close_date: string;
      target_products?: string[];
      estimated_seats?: number;
      license_model?: string;
      deployment_timeline?: string;
      opportunity_source?: string;
      partner_notes?: string;
    }
  ) {
    const pool = getPool();

    // 1. Conflict detection: check if another deal with this domain is currently approved or awaiting review
    const cleanDomain = deal.customer_domain.trim().toLowerCase();
    const conflictCheck = await pool.query(
      `SELECT id, deal_code, partner_org_name FROM deal_registrations
       WHERE LOWER(customer_domain) = LOWER($1)
         AND (
           (status = 'approved' AND (protection_expires_at > NOW() OR deal_protection_expiry > NOW()))
           OR status IN ('awaiting_approval', 'under_review', 'submitted')
         )
       LIMIT 1;`,
      [cleanDomain]
    );

    const hasConflict = conflictCheck.rows.length > 0;
    const conflictNotes = hasConflict
      ? `Domain conflict detected: Active or pending registration exists for ${cleanDomain} (${conflictCheck.rows[0].deal_code} by ${conflictCheck.rows[0].partner_org_name}). Routed to Channel Admin arbitration.`
      : null;

    // Get partner company name
    const profRes = await pool.query(
      `SELECT company_name FROM partner_profiles WHERE partner_org_id = $1 LIMIT 1;`,
      [orgId]
    );
    const orgName = profRes.rows[0]?.company_name || "Authorized Partner";

    const id = `deal-${crypto.randomBytes(8).toString("hex")}`;
    const dealCode = generateCode("DR");

    // Strictly per specification:
    // - status is 'awaiting_approval'
    // - Never grant protection immediately on submission: protection_expires_at and deal_protection_expiry are NULL
    const insertQuery = `
      INSERT INTO deal_registrations (
        id, deal_code, partner_org_id, partner_org_name, customer_name,
        customer_domain, customer_country, customer_industry,
        customer_contact_name, customer_contact_email, customer_contact_phone,
        opportunity_name, estimated_value_usd, estimated_close_date,
        target_products, estimated_seats, license_model, deployment_timeline,
        opportunity_source, partner_notes, status, deal_protection_expiry,
        protection_expires_at, conflict_detected, conflict_notes,
        created_by_user_id, created_by_user_name
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8,
        $9, $10, $11,
        $12, $13, $14,
        $15, $16, $17, $18,
        $19, $20, 'awaiting_approval', NULL,
        NULL, $21, $22,
        $23, $24
      )
      RETURNING *;
    `;

    const values = [
      id,
      dealCode,
      orgId,
      orgName,
      deal.customer_name.trim(),
      cleanDomain,
      deal.customer_country.trim(),
      deal.customer_industry?.trim() || null,
      deal.customer_contact_name?.trim() || null,
      deal.customer_contact_email?.trim() || null,
      deal.customer_contact_phone?.trim() || null,
      deal.opportunity_name.trim(),
      deal.estimated_value_usd || 0,
      deal.estimated_close_date,
      JSON.stringify(deal.target_products || ["OmniPriv Enterprise PAM"]),
      deal.estimated_seats || 50,
      deal.license_model || "Annual Subscription",
      deal.deployment_timeline?.trim() || "Immediate (1-3 months)",
      deal.opportunity_source?.trim() || "Direct Partner Outreach",
      deal.partner_notes?.trim() || null,
      hasConflict,
      conflictNotes,
      userId,
      userName,
    ];

    const result = await pool.query(insertQuery, values);
    const row = result.rows[0];

    logAuditEvent({
      actor_user_id: userId,
      actor_name: userName,
      actor_role: "Partner Sales",
      actor_org_id: orgId,
      action: "channel.deal.submitted",
      target_type: "DealRegistration",
      target_id: row.id,
      details: `Registered deal '${deal.opportunity_name}' for '${deal.customer_name}' (${dealCode}). Status: awaiting_approval. Conflict: ${hasConflict}. Protection: none until Admin approval.`,
    });

    if (hasConflict) {
      logAuditEvent({
        actor_user_id: userId,
        actor_name: userName,
        actor_role: "Partner Sales",
        actor_org_id: orgId,
        action: "channel.deal.conflict_detected",
        target_type: "DealRegistration",
        target_id: row.id,
        details: conflictNotes || "Domain conflict detected upon deal registration.",
      });
    }

    return row;
  },

  async getPartnerLeads(orgId: string) {
    const pool = getPool();
    const result = await pool.query(
      `SELECT * FROM partner_leads WHERE partner_org_id = $1 ORDER BY assigned_at DESC;`,
      [orgId]
    );
    return result.rows;
  },

  async updateLeadStatus(
    leadId: string,
    orgId: string,
    status: "accepted" | "declined" | "working" | "converted",
    userId: string,
    userName: string,
    reason?: string
  ) {
    const pool = getPool();
    const query = `
      UPDATE partner_leads
      SET status = $1, decline_reason = $2
      WHERE id = $3 AND partner_org_id = $4
      RETURNING *;
    `;
    const result = await pool.query(query, [status, reason || null, leadId, orgId]);
    const row = result.rows[0];

    if (row) {
      logAuditEvent({
        actor_user_id: userId,
        actor_name: userName,
        actor_role: "Partner Representative",
        actor_org_id: orgId,
        action: `channel.lead.${status}`,
        target_type: "PartnerLead",
        target_id: leadId,
        details: `Lead for company '${row.prospect_company}' transitioned to '${status}'. Reason: ${reason || "N/A"}`,
      });
    }

    return row;
  },

  async getPartnerRenewals(orgId: string) {
    const pool = getPool();
    const result = await pool.query(
      `SELECT * FROM renewal_opportunities WHERE partner_org_id = $1 ORDER BY renewal_date ASC;`,
      [orgId]
    );
    return result.rows;
  },

  async getPartnerEntitlements(orgId: string) {
    const pool = getPool();
    const result = await pool.query(
      `SELECT * FROM partner_entitlement_requests WHERE partner_org_id = $1 ORDER BY created_at DESC;`,
      [orgId]
    );
    return result.rows;
  },

  async createPartnerEntitlement(
    orgId: string,
    userId: string,
    userName: string,
    request: {
      request_type: string;
      product_edition: string;
      duration_days: number;
      target_customer_name?: string;
      requested_seats?: number;
      justification: string;
    }
  ) {
    const pool = getPool();
    const profRes = await pool.query(
      `SELECT company_name FROM partner_profiles WHERE partner_org_id = $1 LIMIT 1;`,
      [orgId]
    );
    const orgName = profRes.rows[0]?.company_name || "Authorized Partner";
    const id = `req-${crypto.randomBytes(8).toString("hex")}`;
    const requestCode = generateCode("REQ");

    const query = `
      INSERT INTO partner_entitlement_requests (
        id, request_code, partner_org_id, partner_org_name, request_type,
        product_edition, duration_days, target_customer_name, requested_seats,
        justification, status, requested_by_user_id, requested_by_user_name
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending', $11, $12)
      RETURNING *;
    `;

    const values = [
      id,
      requestCode,
      orgId,
      orgName,
      request.request_type,
      request.product_edition,
      request.duration_days || 30,
      request.target_customer_name || null,
      request.requested_seats || 25,
      request.justification,
      userId,
      userName,
    ];

    const result = await pool.query(query, values);
    const row = result.rows[0];

    logAuditEvent({
      actor_user_id: userId,
      actor_name: userName,
      actor_role: "Partner Sales",
      actor_org_id: orgId,
      action: "channel.entitlement.requested",
      target_type: "PartnerEntitlementRequest",
      target_id: row.id,
      details: `Submitted commercial request for ${request.product_edition} (${request.request_type}). Code: ${requestCode}`,
    });

    return row;
  },

  async getPartnerResources(category?: string) {
    const pool = getPool();
    let query = `SELECT * FROM partner_resources`;
    const params: any[] = [];
    if (category && category !== "all") {
      params.push(category);
      query += ` WHERE category = $1`;
    }
    query += ` ORDER BY published_at DESC;`;
    const result = await pool.query(query, params);
    return result.rows;
  },

  async getPartnerLearningAndCerts(orgId: string) {
    const pool = getPool();
    const courses = await pool.query(`SELECT * FROM partner_courses ORDER BY code ASC;`);
    const certs = await pool.query(
      `SELECT * FROM partner_certifications WHERE partner_org_id = $1 ORDER BY expires_at ASC;`,
      [orgId]
    );
    return {
      courses: courses.rows,
      certifications: certs.rows,
    };
  },

  async getPartnerJBP(orgId: string) {
    const pool = getPool();
    const result = await pool.query(
      `SELECT * FROM joint_business_plans WHERE partner_org_id = $1 ORDER BY created_at DESC LIMIT 1;`,
      [orgId]
    );
    return result.rows[0] || null;
  },

  async getPartnerMDF(orgId: string) {
    const pool = getPool();
    const result = await pool.query(
      `SELECT * FROM marketing_fund_activities WHERE partner_org_id = $1 ORDER BY created_at DESC;`,
      [orgId]
    );
    return result.rows;
  },

  async getPartnerTeam(orgId: string) {
    const pool = getPool();
    const result = await pool.query(
      `SELECT id, user_name, user_email, role, status, joined_at
       FROM partner_memberships
       WHERE partner_org_id = $1
       ORDER BY joined_at ASC;`,
      [orgId]
    );
    return result.rows;
  },

  async getPartnerLocatorProfile(orgId: string) {
    const pool = getPool();
    const result = await pool.query(
      `SELECT * FROM partner_locator_profiles WHERE partner_org_id = $1 LIMIT 1;`,
      [orgId]
    );
    return result.rows[0] || null;
  },

  async updatePartnerLocatorProfile(orgId: string, data: any) {
    const pool = getPool();
    const query = `
      INSERT INTO partner_locator_profiles (
        id, partner_org_id, display_name, headquarters, service_regions,
        specializations, certifications_summary, public_description,
        public_contact_email, public_website, is_active_listing, admin_approved
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, FALSE)
      ON CONFLICT (id) DO UPDATE SET
        display_name = EXCLUDED.display_name,
        headquarters = EXCLUDED.headquarters,
        service_regions = EXCLUDED.service_regions,
        public_description = EXCLUDED.public_description,
        public_contact_email = EXCLUDED.public_contact_email,
        public_website = EXCLUDED.public_website,
        is_active_listing = EXCLUDED.is_active_listing,
        updated_at = NOW()
      RETURNING *;
    `;
    const id = `loc-${orgId}`;
    const values = [
      id,
      orgId,
      data.display_name,
      data.headquarters,
      JSON.stringify(data.service_regions || []),
      JSON.stringify(data.specializations || []),
      JSON.stringify(data.certifications_summary || []),
      data.public_description,
      data.public_contact_email,
      data.public_website,
      Boolean(data.is_active_listing),
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async getPartnerPayoutProfile(orgId: string) {
    const pool = getPool();
    const result = await pool.query(
      `SELECT id, partner_org_id, account_holder_legal_name, bank_country,
              settlement_currency, routing_code_masked, account_number_masked,
              status, verified_at, dual_control_reveal_active, dual_control_reveal_expires_at
       FROM partner_payout_profiles WHERE partner_org_id = $1 LIMIT 1;`,
      [orgId]
    );
    return result.rows[0] || null;
  },

  async savePartnerPayoutProfile(
    orgId: string,
    payout: {
      account_holder_legal_name: string;
      bank_country: string;
      settlement_currency: string;
      routing_code_masked: string;
      account_number_masked: string;
    },
    userId: string,
    userName: string
  ) {
    const pool = getPool();
    const id = `payout-${orgId}`;
    const query = `
      INSERT INTO partner_payout_profiles (
        id, partner_org_id, account_holder_legal_name, bank_country,
        settlement_currency, routing_code_masked, account_number_masked,
        encrypted_token, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'under_review')
      ON CONFLICT (id) DO UPDATE SET
        account_holder_legal_name = EXCLUDED.account_holder_legal_name,
        bank_country = EXCLUDED.bank_country,
        settlement_currency = EXCLUDED.settlement_currency,
        routing_code_masked = EXCLUDED.routing_code_masked,
        account_number_masked = EXCLUDED.account_number_masked,
        status = 'under_review',
        updated_at = NOW()
      RETURNING id, partner_org_id, account_holder_legal_name, bank_country,
                settlement_currency, routing_code_masked, account_number_masked, status;
    `;

    const token = `kms:v1:${crypto.randomBytes(16).toString("hex")}`;
    const values = [
      id,
      orgId,
      payout.account_holder_legal_name,
      payout.bank_country,
      payout.settlement_currency || "USD",
      payout.routing_code_masked,
      payout.account_number_masked,
      token,
    ];

    const result = await pool.query(query, values);

    logAuditEvent({
      actor_user_id: userId,
      actor_name: userName,
      actor_role: "Partner Finance",
      actor_org_id: orgId,
      action: "payout.profile.updated",
      target_type: "PartnerPayoutProfile",
      target_id: id,
      details: `Company payout profile submitted for review with masked account ${payout.account_number_masked}.`,
    });

    return result.rows[0];
  },

  // =========================================================================
  // 3. INTERNAL CHANNEL ADMINISTRATION WORKFLOWS (Full channel cross-org purview)
  // =========================================================================
  async getChannelAdminOverview() {
    const pool = getPool();

    const [apps, partners, deals, leads, renewals] = await Promise.all([
      pool.query(`SELECT COUNT(*) as total FROM partner_applications;`),
      pool.query(`
        SELECT 
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as new_30d,
          COUNT(*) FILTER (WHERE program_status = 'active') as active
        FROM partner_profiles;
      `),
      pool.query(`
        SELECT 
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE status IN ('awaiting_approval', 'under_review', 'submitted')) as pending_review,
          COUNT(*) FILTER (WHERE conflict_detected = TRUE) as domain_conflicts,
          COUNT(*) FILTER (WHERE status = 'approved') as approved_count,
          COALESCE(SUM(estimated_value_usd) FILTER (WHERE status = 'approved' AND (protection_expires_at > NOW() OR deal_protection_expiry > NOW() OR protection_expires_at IS NULL)), 0) as approved_pipeline_value
        FROM deal_registrations;
      `),
      pool.query(`
        SELECT 
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE partner_status = 'unassigned') as awaiting_assignment,
          COUNT(*) FILTER (WHERE partner_status = 'assigned' AND sla_deadline < NOW() + INTERVAL '48 hours') as nearing_sla_breach
        FROM channel_leads;
      `),
      pool.query(`
        SELECT 
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE status = 'upcoming') as upcoming
        FROM renewal_opportunities;
      `),
    ]);

    const appRow = apps.rows[0] || {};
    const partnerRow = partners.rows[0] || {};
    const dealRow = deals.rows[0] || {};
    const leadRow = leads.rows[0] || {};
    const renewalRow = renewals.rows[0] || {};

    return {
      applicationsTotal: parseInt(appRow.total || "0", 10),
      partnersTotal: parseInt(partnerRow.total || "0", 10),
      newPartnerRegistrations: parseInt(partnerRow.new_30d || "0", 10),
      partnersActive: parseInt(partnerRow.active || "0", 10),
      dealsAwaitingReview: parseInt(dealRow.pending_review || "0", 10),
      dealsPendingReview: parseInt(dealRow.pending_review || "0", 10),
      domainConflicts: parseInt(dealRow.domain_conflicts || "0", 10),
      dealsApproved: parseInt(dealRow.approved_count || "0", 10),
      approvedPipelineValue: parseFloat(dealRow.approved_pipeline_value || "0"),
      leadsAwaitingAssignment: parseInt(leadRow.awaiting_assignment || "0", 10),
      leadsNearingSlaBreach: parseInt(leadRow.nearing_sla_breach || "0", 10),
      renewalsUpcoming: parseInt(renewalRow.upcoming || "0", 10),
    };
  },

  async getChannelAdminOrganizations() {
    const pool = getPool();
    const result = await pool.query(`
      SELECT 
        p.partner_org_id,
        p.company_name,
        p.legal_name,
        p.website,
        p.country,
        p.region,
        p.current_tier,
        p.program_status,
        p.primary_partner_manager_name,
        p.primary_contact_name,
        p.primary_contact_email,
        p.created_at,
        COUNT(d.id) as deal_count,
        COALESCE(SUM(d.estimated_value_usd) FILTER (WHERE d.status = 'approved'), 0) as approved_pipeline
      FROM partner_profiles p
      LEFT JOIN deal_registrations d ON d.partner_org_id = p.partner_org_id
      GROUP BY p.partner_org_id, p.company_name, p.legal_name, p.website, p.country, p.region, p.current_tier, p.program_status, p.primary_partner_manager_name, p.primary_contact_name, p.primary_contact_email, p.created_at
      ORDER BY p.created_at DESC;
    `);
    return result.rows;
  },

  async updatePartnerOrganization(
    orgId: string,
    tier: string,
    partnerManagerName: string,
    adminId: string,
    adminName: string
  ) {
    const pool = getPool();
    const result = await pool.query(
      `UPDATE partner_profiles 
       SET current_tier = $1, primary_partner_manager_name = $2, updated_at = NOW() 
       WHERE partner_org_id = $3 
       RETURNING *;`,
      [tier, partnerManagerName, orgId]
    );
    const row = result.rows[0];
    if (row) {
      logAuditEvent({
        actor_user_id: adminId,
        actor_name: adminName,
        actor_role: "Channel Admin",
        actor_org_id: "org-omnipriv-internal",
        action: "channel.partner_org.tier_updated",
        target_type: "PartnerOrganization",
        target_id: orgId,
        details: `Updated tier to '${tier}' and partner manager to '${partnerManagerName}' for ${row.company_name} by ${adminName}.`,
      });
    }
    return row;
  },

  async getChannelAdminDeals(statusFilter?: string) {
    const pool = getPool();
    let query = `SELECT * FROM deal_registrations`;
    const params: any[] = [];
    if (statusFilter && statusFilter !== "all") {
      params.push(statusFilter);
      query += ` WHERE status = $1`;
    }
    query += ` ORDER BY created_at DESC;`;
    const result = await pool.query(query, params);
    return result.rows;
  },

  async decideDealReview(
    dealId: string,
    decision: "approve" | "decline",
    adminId: string,
    adminName: string,
    notes?: string
  ) {
    const pool = getPool();
    const isApproved = decision === "approve";
    const newStatus = isApproved ? "approved" : "declined";

    // Channel Admin approval grants a 90-day protection period and stores protection_expires_at
    const query = isApproved
      ? `
        UPDATE deal_registrations
        SET status = $1,
            reviewer_id = $2,
            reviewer_name = $3,
            review_notes = $4,
            protection_expires_at = NOW() + INTERVAL '90 days',
            deal_protection_expiry = NOW() + INTERVAL '90 days',
            updated_at = NOW()
        WHERE id = $5
        RETURNING *;
      `
      : `
        UPDATE deal_registrations
        SET status = $1,
            reviewer_id = $2,
            reviewer_name = $3,
            review_notes = $4,
            protection_expires_at = NULL,
            deal_protection_expiry = NULL,
            updated_at = NOW()
        WHERE id = $5
        RETURNING *;
      `;

    const result = await pool.query(query, [newStatus, adminId, adminName, notes || null, dealId]);
    const row = result.rows[0];

    if (row) {
      logAuditEvent({
        actor_user_id: adminId,
        actor_name: adminName,
        actor_role: "Channel Admin",
        actor_org_id: "org-omnipriv-internal",
        action: isApproved ? "channel.deal.approved" : "channel.deal.declined",
        target_type: "DealRegistration",
        target_id: dealId,
        details: isApproved
          ? `Deal ${row.deal_code} (${row.opportunity_name}) approved by ${adminName}. 90-day protection granted until ${row.protection_expires_at}. Notes: ${notes || "N/A"}`
          : `Deal ${row.deal_code} (${row.opportunity_name}) declined by ${adminName}. Notes: ${notes || "N/A"}`,
      });
    }

    return row;
  },

  async extendDealProtection(
    dealId: string,
    days: number,
    adminId: string,
    adminName: string,
    reason?: string
  ) {
    const pool = getPool();
    const query = `
      UPDATE deal_registrations
      SET 
        protection_expires_at = COALESCE(protection_expires_at, NOW()) + ($1 || ' days')::interval,
        deal_protection_expiry = COALESCE(deal_protection_expiry, NOW()) + ($1 || ' days')::interval,
        review_notes = COALESCE(review_notes, '') || ' [Protection extended +' || $1 || 'd by ' || $2 || ': ' || COALESCE($3, 'No reason') || ']',
        updated_at = NOW()
      WHERE id = $4
      RETURNING *;
    `;
    const result = await pool.query(query, [days, adminName, reason || null, dealId]);
    const row = result.rows[0];

    if (row) {
      logAuditEvent({
        actor_user_id: adminId,
        actor_name: adminName,
        actor_role: "Channel Admin",
        actor_org_id: "org-omnipriv-internal",
        action: "channel.deal.protection_extended",
        target_type: "DealRegistration",
        target_id: dealId,
        details: `Deal ${row.deal_code} protection extended by ${days} days by ${adminName}. New expiry: ${row.protection_expires_at}.`,
      });
    }

    return row;
  },

  async closeDealOutcome(
    dealId: string,
    outcome: "closed_won" | "closed_lost",
    notes: string,
    actorId: string,
    actorName: string,
    actorRole: string
  ) {
    const pool = getPool();
    const query = `
      UPDATE deal_registrations
      SET status = $1,
          review_notes = COALESCE(review_notes, '') || ' [Outcome: ' || $1 || ' - ' || $2 || ']',
          updated_at = NOW()
      WHERE id = $3
      RETURNING *;
    `;
    const result = await pool.query(query, [outcome, notes || "Marked closed", dealId]);
    const row = result.rows[0];

    if (row) {
      logAuditEvent({
        actor_user_id: actorId,
        actor_name: actorName,
        actor_role: actorRole,
        actor_org_id: row.partner_org_id,
        action: `channel.deal.${outcome}`,
        target_type: "DealRegistration",
        target_id: dealId,
        details: `Deal ${row.deal_code} marked as ${outcome} by ${actorName}. Notes: ${notes || "N/A"}.`,
      });
    }

    return row;
  },

  async getChannelAdminLeads() {
    const pool = getPool();
    const result = await pool.query(`SELECT * FROM channel_leads ORDER BY created_at DESC;`);
    return result.rows;
  },

  async routeLeadToPartner(
    leadId: string,
    partnerOrgId: string,
    partnerOrgName: string,
    adminId: string,
    adminName: string
  ) {
    const pool = getPool();
    const updateLead = await pool.query(
      `UPDATE channel_leads
       SET assigned_partner_org_id = $1,
           assigned_partner_org_name = $2,
           assigned_at = NOW(),
           sla_deadline = NOW() + INTERVAL '7 days',
           partner_status = 'assigned',
           updated_at = NOW()
       WHERE id = $3
       RETURNING *;`,
      [partnerOrgId, partnerOrgName, leadId]
    );

    const lead = updateLead.rows[0];
    if (lead) {
      // Also mirror to partner_leads table so partner sees it in their queue
      const partnerLeadId = `lead-${lead.id}`;
      await pool.query(
        `INSERT INTO partner_leads (
          id, partner_org_id, prospect_company, prospect_contact_name,
          prospect_contact_email, prospect_country, estimated_scope,
          assigned_at, sla_deadline, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW() + INTERVAL '7 days', 'assigned')
        ON CONFLICT (id) DO UPDATE SET status = 'assigned', sla_deadline = NOW() + INTERVAL '7 days';`,
        [
          partnerLeadId,
          partnerOrgId,
          lead.prospect_company,
          lead.prospect_contact_name,
          lead.prospect_contact_email,
          lead.prospect_country,
          `${lead.requested_product} (${lead.estimated_seats} seats)`,
        ]
      );

      logAuditEvent({
        actor_user_id: adminId,
        actor_name: adminName,
        actor_role: "Channel Admin",
        actor_org_id: "org-omnipriv-internal",
        action: "channel.lead.assigned",
        target_type: "ChannelLead",
        target_id: leadId,
        details: `Routed inbound prospect '${lead.prospect_company}' to partner '${partnerOrgName}' with 7-day acceptance SLA.`,
      });
    }

    return lead;
  },

  async getChannelAdminPayouts() {
    const pool = getPool();
    const result = await pool.query(`SELECT * FROM partner_payout_profiles ORDER BY updated_at DESC;`);
    return result.rows;
  },

  async decidePayoutReview(
    payoutId: string,
    decision: "verify" | "request_changes",
    adminId: string,
    adminName: string,
    reason?: string
  ) {
    const pool = getPool();
    const newStatus = decision === "verify" ? "verified" : "changes_requested";
    const query = `
      UPDATE partner_payout_profiles
      SET status = $1, verified_by = $2, verified_at = NOW(), rejection_reason = $3, updated_at = NOW()
      WHERE id = $4
      RETURNING *;
    `;
    const result = await pool.query(query, [newStatus, adminId, reason || null, payoutId]);
    const row = result.rows[0];

    if (row) {
      logAuditEvent({
        actor_user_id: adminId,
        actor_name: adminName,
        actor_role: "Channel Admin",
        actor_org_id: "org-omnipriv-internal",
        action: `payout.review.${decision}`,
        target_type: "PartnerPayoutProfile",
        target_id: payoutId,
        details: `Payout profile for partner ${row.partner_org_id} marked as '${newStatus}' by ${adminName}.`,
      });
    }

    return row;
  },

  async getChannelAdminAuditLogs(limit = 50) {
    const pool = getPool();
    const result = await pool.query(
      `SELECT * FROM partner_audit_events ORDER BY timestamp DESC LIMIT $1;`,
      [limit]
    );
    return result.rows;
  },
};
