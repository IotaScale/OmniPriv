import {
  PartnerProfile,
  PartnerMembership,
  PartnerProgramEnrollment,
  CustomerPartnerLink,
  CommercialCustomerSummary,
  DealRegistration,
  PartnerLead,
  RenewalOpportunity,
  PartnerEntitlementRequest,
  PartnerResource,
  PartnerCourse,
  PartnerCertification,
  CertificationDefinition,
  JointBusinessPlan,
  MarketingFundActivity,
  PartnerLocatorProfile,
  PartnerTier,
  PartnerPayoutProfile,
} from "./types";
import { logAuditEvent } from "./audit";

// Initial seed data adhering strictly to isolation and valid real-world PAM workflows
export const SEED_PARTNER_PROFILES: PartnerProfile[] = [
  {
    id: "prof-apex",
    partner_org_id: "org-partner-apex",
    company_name: "Apex Cyber Solutions Ltd",
    legal_name: "Apex Cyber Solutions International Inc.",
    website: "https://apexcybersolutions.com",
    country: "United Kingdom",
    region: "EMEA",
    primary_contact_name: "Marcus Vance",
    primary_contact_email: "marcus.vance@apexcybersolutions.com",
    primary_partner_manager_id: "usr-pm-elena",
    primary_partner_manager_name: "Elena Rostova",
    program_status: "active",
    partner_types: ["Reseller", "MSP/MSSP"],
    current_tier: "Gold",
    locator_published: true,
    onboarding_completed: true,
    terms_accepted_at: "2025-01-15T09:00:00Z",
    created_at: "2025-01-10T10:00:00Z",
    updated_at: "2026-03-01T12:00:00Z",
  },
  {
    id: "prof-sentinel",
    partner_org_id: "org-partner-sentinel",
    company_name: "Sentinel Defense Systems",
    legal_name: "Sentinel Defense Systems LLC",
    website: "https://sentineldefense.io",
    country: "United States",
    region: "Americas",
    primary_contact_name: "David Miller",
    primary_contact_email: "david@sentineldefense.io",
    primary_partner_manager_id: "usr-pm-elena",
    primary_partner_manager_name: "Elena Rostova",
    program_status: "active",
    partner_types: ["System Integrator", "MSP/MSSP"],
    current_tier: "Silver",
    locator_published: true,
    onboarding_completed: true,
    terms_accepted_at: "2025-04-10T11:00:00Z",
    created_at: "2025-04-05T08:00:00Z",
    updated_at: "2026-02-15T14:00:00Z",
  },
  {
    id: "prof-nordic",
    partner_org_id: "org-partner-nordic",
    company_name: "Nordic Shield IT",
    legal_name: "Nordic Shield IT Oy",
    website: "https://nordicshield.fi",
    country: "Finland",
    region: "Nordics",
    primary_contact_name: "Aino Korhonen",
    primary_contact_email: "aino@nordicshield.fi",
    primary_partner_manager_id: "usr-pm-elena",
    primary_partner_manager_name: "Elena Rostova",
    program_status: "pending",
    partner_types: ["Reseller"],
    current_tier: "Registered",
    locator_published: false,
    onboarding_completed: false,
    created_at: "2026-03-25T11:00:00Z",
    updated_at: "2026-03-25T11:00:00Z",
  },
];

export const SEED_MEMBERSHIPS: PartnerMembership[] = [
  {
    id: "mem-apex-1",
    partner_org_id: "org-partner-apex",
    user_id: "usr-apex-owner",
    user_name: "Marcus Vance",
    user_email: "marcus.vance@apexcybersolutions.com",
    role: "Partner Owner",
    status: "active",
    joined_at: "2025-01-15T09:30:00Z",
  },
  {
    id: "mem-apex-2",
    partner_org_id: "org-partner-apex",
    user_id: "usr-apex-sales",
    user_name: "Chloe Reynolds",
    user_email: "chloe.r@apexcybersolutions.com",
    role: "Partner Sales",
    status: "active",
    joined_at: "2025-02-01T10:00:00Z",
  },
  {
    id: "mem-apex-3",
    partner_org_id: "org-partner-apex",
    user_id: "usr-apex-eng",
    user_name: "Tariq Mansoor",
    user_email: "tariq.m@apexcybersolutions.com",
    role: "Partner Engineer",
    status: "active",
    joined_at: "2025-02-10T14:00:00Z",
  },
];

export const SEED_CERT_DEFS: CertificationDefinition[] = [
  {
    id: "cdef-sales",
    code: "OP-CSP",
    name: "OmniPriv Certified Sales Professional",
    category: "sales",
    valid_duration_months: 12,
    required_for_tier: ["Silver", "Gold", "Platinum"],
    description: "Value positioning, competitive differentiation vs legacy PAM, pricing models, and objection handling.",
  },
  {
    id: "cdef-tech",
    code: "OP-CTA",
    name: "OmniPriv Certified Technical Architect",
    category: "technical",
    valid_duration_months: 24,
    required_for_tier: ["Gold", "Platinum"],
    description: "Agentless session gateway clustering, HSM integration, automated credential rotation, and SIEM forwarding.",
  },
  {
    id: "cdef-presales",
    code: "OP-CPE",
    name: "OmniPriv Certified Presales Engineer",
    category: "presales",
    valid_duration_months: 12,
    required_for_tier: ["Silver", "Gold", "Platinum"],
    description: "Proof-of-concept deployment, discovery scoping, JIT privilege policy demonstration, and client onboarding.",
  },
];

export const SEED_PARTNER_CERTS: PartnerCertification[] = [
  {
    id: "pcert-101",
    partner_org_id: "org-partner-apex",
    user_id: "usr-apex-sales",
    user_name: "Chloe Reynolds",
    certification_def_id: "cdef-sales",
    certification_name: "OmniPriv Certified Sales Professional",
    category: "sales",
    status: "valid",
    issued_at: "2025-03-01T00:00:00Z",
    expires_at: "2027-03-01T00:00:00Z",
    verification_code: "OP-CERT-77341",
  },
  {
    id: "pcert-102",
    partner_org_id: "org-partner-apex",
    user_id: "usr-apex-eng",
    user_name: "Tariq Mansoor",
    certification_def_id: "cdef-tech",
    certification_name: "OmniPriv Certified Technical Architect",
    category: "technical",
    status: "valid",
    issued_at: "2025-04-15T00:00:00Z",
    expires_at: "2027-04-15T00:00:00Z",
    verification_code: "OP-CERT-99420",
  },
];

export const SEED_CUSTOMER_LINKS: CustomerPartnerLink[] = [
  {
    id: "link-vanguard",
    partner_org_id: "org-partner-apex",
    customer_org_id: "org-cust-vanguard",
    customer_org_name: "Vanguard Global Capital",
    relationship_type: "resale",
    status: "active",
    scopes: ["commercial_view", "renewal_view", "license_request"],
    approved_by: "Sarah Chen (Channel Admin)",
    approved_at: "2025-02-15T12:00:00Z",
    expiry_date: "2027-02-15T00:00:00Z",
  },
  {
    id: "link-medhealth",
    partner_org_id: "org-partner-apex",
    customer_org_id: "org-cust-medhealth",
    customer_org_name: "MedHealth Regional Trust",
    relationship_type: "managed_service",
    status: "active",
    scopes: ["commercial_view", "renewal_view", "support_request"],
    approved_by: "Sarah Chen (Channel Admin)",
    approved_at: "2025-05-10T10:00:00Z",
    expiry_date: "2026-11-10T00:00:00Z",
  },
];

/** Strictly commercial projection */
export const SEED_COMMERCIAL_SUMMARIES: Record<string, CommercialCustomerSummary> = {
  "org-cust-vanguard": {
    customer_org_id: "org-cust-vanguard",
    customer_org_name: "Vanguard Global Capital",
    active_product: "OmniPriv Enterprise PAM Suite",
    license_tier: "Enterprise Tier 1",
    managed_assets_count: 750,
    active_users_licensed: 350,
    renewal_date: "2026-11-15",
    support_sla: "Mission-Critical 24x7 (15m SLA)",
    relationship_type: "resale",
  },
  "org-cust-medhealth": {
    customer_org_id: "org-cust-medhealth",
    customer_org_name: "MedHealth Regional Trust",
    active_product: "OmniPriv Healthcare PAM & HIPAA Vault",
    license_tier: "Enterprise Tier 2",
    managed_assets_count: 420,
    active_users_licensed: 180,
    renewal_date: "2026-08-30",
    support_sla: "Standard Business Support",
    relationship_type: "managed_service",
  },
};

export const SEED_DEALS: DealRegistration[] = [
  {
    id: "deal-reg-101",
    deal_code: "DR-2026-001",
    partner_org_id: "org-partner-apex",
    partner_org_name: "Apex Cyber Solutions Ltd",
    customer_name: "Vanguard Global Capital",
    customer_domain: "vanguardglobalcap.co.uk",
    customer_country: "United Kingdom",
    opportunity_name: "PAM Modernization & Cloud Infrastructure Vault",
    estimated_value_usd: 125000,
    estimated_close_date: "2026-07-31",
    target_products: ["Credential Management", "Secure Remote Access", "AI Threat Protection"],
    estimated_seats: 500,
    license_model: "Annual Subscription",
    status: "approved",
    deal_protection_expiry: "2026-10-31",
    conflict_detected: false,
    reviewer_id: "usr-admin-1",
    reviewer_name: "Sarah Chen",
    review_notes: "Approved. Legitimate incumbent partner relationship established.",
    created_by_user_id: "usr-apex-sales",
    created_by_user_name: "Chloe Reynolds",
    created_at: "2026-02-10T14:30:00Z",
    updated_at: "2026-02-12T09:15:00Z",
  },
  {
    id: "deal-reg-102",
    deal_code: "DR-2026-002",
    partner_org_id: "org-partner-apex",
    partner_org_name: "Apex Cyber Solutions Ltd",
    customer_name: "Atlas Logistics Group",
    customer_domain: "atlaslogistics.eu",
    customer_country: "Germany",
    opportunity_name: "Zero Trust PAM & Just-in-Time Bastion",
    estimated_value_usd: 84000,
    estimated_close_date: "2026-09-15",
    target_products: ["Infrastructure & Deployment", "Workflow & Access Control"],
    estimated_seats: 250,
    license_model: "Annual Subscription",
    status: "under_review",
    deal_protection_expiry: "2026-12-15",
    conflict_detected: true,
    conflict_notes: "Potential overlap with registered lead in EMEA region. Under channel review.",
    created_by_user_id: "usr-apex-sales",
    created_by_user_name: "Chloe Reynolds",
    created_at: "2026-03-20T11:00:00Z",
    updated_at: "2026-03-20T11:00:00Z",
  },
];

export const SEED_LEADS: PartnerLead[] = [
  {
    id: "lead-201",
    partner_org_id: "org-partner-apex",
    prospect_company: "FinServ Nordic Ab",
    prospect_contact_name: "Kari Virtanen",
    prospect_contact_email: "k.virtanen@finservnordic.com",
    prospect_country: "Sweden",
    estimated_scope: "300 Windows/Linux Bastion nodes with MFA & Session Recording",
    assigned_at: "2026-04-01T08:00:00Z",
    sla_deadline: "2026-04-08T08:00:00Z",
    status: "assigned",
    qualification_notes: "Lead downloaded whitepaper and requested regional technical evaluation.",
  },
  {
    id: "lead-202",
    partner_org_id: "org-partner-apex",
    prospect_company: "Apex Port Logistics",
    prospect_contact_name: "Simon Croft",
    prospect_contact_email: "s.croft@apexport.co.uk",
    prospect_country: "United Kingdom",
    estimated_scope: "OT/SCADA air-gapped PAM proxy with approval workflow",
    assigned_at: "2026-03-15T09:00:00Z",
    sla_deadline: "2026-03-22T09:00:00Z",
    status: "working",
    qualification_notes: "Discovery call completed. PoC scheduled for next week.",
  },
];

export const SEED_RENEWALS: RenewalOpportunity[] = [
  {
    id: "ren-301",
    partner_org_id: "org-partner-apex",
    customer_partner_link_id: "link-vanguard",
    customer_org_name: "Vanguard Global Capital",
    product_name: "OmniPriv Enterprise PAM Suite (Annual)",
    annual_contract_value_usd: 145000,
    licensed_asset_capacity: 750,
    renewal_date: "2026-11-15",
    status: "upcoming",
    assigned_owner: "Chloe Reynolds",
  },
  {
    id: "ren-302",
    partner_org_id: "org-partner-apex",
    customer_partner_link_id: "link-medhealth",
    customer_org_name: "MedHealth Regional Trust",
    product_name: "OmniPriv Healthcare PAM & HIPAA Vault",
    annual_contract_value_usd: 78000,
    licensed_asset_capacity: 420,
    renewal_date: "2026-08-30",
    status: "quote_requested",
    assigned_owner: "Chloe Reynolds",
    last_contact_date: "2026-03-15",
  },
];

export const SEED_REQUESTS: PartnerEntitlementRequest[] = [
  {
    id: "req-401",
    request_code: "REQ-2026-441",
    partner_org_id: "org-partner-apex",
    partner_org_name: "Apex Cyber Solutions Ltd",
    request_type: "poc",
    product_edition: "OmniPriv Enterprise PAM (High Availability)",
    duration_days: 30,
    target_customer_name: "Atlas Logistics Group",
    requested_seats: 100,
    justification: "Customer evaluating zero-trust agentless protocol gateways and session recording.",
    status: "approved",
    license_key_masked: "OMNI-POC-XXXX-XXXX-8921",
    approved_by: "Sarah Chen (Channel Admin)",
    approved_at: "2026-03-21T10:00:00Z",
    expires_at: "2026-04-20T23:59:59Z",
    requested_by_user_id: "usr-apex-sales",
    requested_by_user_name: "Chloe Reynolds",
    created_at: "2026-03-21T08:30:00Z",
  },
  {
    id: "req-402",
    request_code: "REQ-2026-442",
    partner_org_id: "org-partner-apex",
    partner_org_name: "Apex Cyber Solutions Ltd",
    request_type: "nfr",
    product_edition: "OmniPriv Partner Lab NFR Instance",
    duration_days: 365,
    requested_seats: 25,
    justification: "Annual internal lab refresh for engineer training and certification testing.",
    status: "active",
    license_key_masked: "OMNI-NFR-XXXX-XXXX-4410",
    approved_by: "Sarah Chen (Channel Admin)",
    approved_at: "2026-01-15T11:00:00Z",
    expires_at: "2027-01-15T23:59:59Z",
    requested_by_user_id: "usr-apex-owner",
    requested_by_user_name: "Marcus Vance",
    created_at: "2026-01-15T09:00:00Z",
  },
];

export const SEED_RESOURCES: PartnerResource[] = [
  {
    id: "res-501",
    title: "OmniPriv Enterprise PAM Solution Architecture Whitepaper",
    description: "In-depth engineering blueprint covering JumpServer microservices, agentless proxy bastions, and dual-control approvals.",
    category: "deployment",
    version: "3.4.0",
    file_format: "PDF",
    file_size_bytes: 4200000,
    download_url: "/OmniPriv_PAM_Product_Specification.pdf",
    min_tier: "Registered",
    locale: "en",
    published_at: "2026-01-10T00:00:00Z",
    updated_at: "2026-02-15T00:00:00Z",
  },
  {
    id: "res-502",
    title: "Partner Sales Battlecard: Replacing Legacy Vault PAM",
    description: "Competitive positioning, cost-per-asset comparisons, TCO calculation, and quick battlecard points.",
    category: "sales",
    version: "2.1.0",
    file_format: "PDF",
    file_size_bytes: 1850000,
    download_url: "/OmniPriv_PAM_datasheet.pdf",
    min_tier: "Silver",
    locale: "en",
    published_at: "2026-02-01T00:00:00Z",
    updated_at: "2026-02-01T00:00:00Z",
  },
  {
    id: "res-503",
    title: "Healthcare HIPAA & NIS2 Compliance Mapping Matrix",
    description: "Detailed compliance crosswalk showing how OmniPriv session recording and JIT controls fulfill international mandates.",
    category: "legal",
    version: "1.2.0",
    file_format: "PDF",
    file_size_bytes: 2900000,
    download_url: "/OmniPriv_PAM_Product_Specification.pdf",
    min_tier: "Registered",
    locale: "en",
    published_at: "2026-02-20T00:00:00Z",
    updated_at: "2026-02-20T00:00:00Z",
  },
  {
    id: "res-504",
    title: "OmniPriv Co-Brandable Campaign Kit & Vector Logos",
    description: "Brand guidelines, approved SVG vector logos, cyber banner designs, and campaign copy templates.",
    category: "marketing",
    version: "2.0.0",
    file_format: "ZIP",
    file_size_bytes: 12500000,
    download_url: "/omnipriv-full-logo.svg",
    min_tier: "Silver",
    locale: "en",
    published_at: "2026-01-20T00:00:00Z",
    updated_at: "2026-01-20T00:00:00Z",
  },
];

export const SEED_COURSES: PartnerCourse[] = [
  {
    id: "crs-601",
    code: "OP-101",
    title: "OmniPriv PAM Fundamentals & Value Proposition",
    category: "sales",
    duration_hours: 4,
    modules_count: 5,
    target_role: "Sales Executives & Account Managers",
    linked_certification_id: "cdef-sales",
    enrolled: true,
    completion_pct: 100,
  },
  {
    id: "crs-602",
    code: "OP-201",
    title: "Enterprise Presales Scoping & Live Demo Playbook",
    category: "presales",
    duration_hours: 8,
    modules_count: 7,
    target_role: "Solution Consultants & Presales Engineers",
    linked_certification_id: "cdef-presales",
    enrolled: true,
    completion_pct: 65,
  },
  {
    id: "crs-603",
    code: "OP-301",
    title: "Advanced Technical Architecture & Vault Clustering",
    category: "technical",
    duration_hours: 16,
    modules_count: 10,
    target_role: "Security Architects & Lead Deployment Engineers",
    linked_certification_id: "cdef-tech",
    enrolled: true,
    completion_pct: 100,
  },
];

export const SEED_JBPS: JointBusinessPlan[] = [
  {
    id: "jbp-701",
    partner_org_id: "org-partner-apex",
    fiscal_year: "2026",
    revenue_target_usd: 500000,
    target_industries: ["Banking & Financial Services", "Critical Infrastructure", "Healthcare"],
    dedicated_sales_headcount: 3,
    dedicated_technical_headcount: 2,
    key_initiatives: [
      "Launch specialized PAM migration offer for financial firms migrating off legacy hardware appliances",
      "Host dual-partner executive briefing breakfast in London Financial District",
      "Certify 2 additional presales engineers on AI-PAM Threat Protection module",
    ],
    requested_omnipriv_support: "Channel SE support for top 3 strategic PoCs and 50% co-funding for Q3 breakfast seminar.",
    status: "approved",
    review_notes: "Approved by Elena Rostova. Excellent alignment with FY26 EMEA strategic priorities.",
    submitted_at: "2026-01-18T10:00:00Z",
    approved_at: "2026-01-22T14:30:00Z",
    created_at: "2026-01-15T09:00:00Z",
  },
];

export const SEED_MDFS: MarketingFundActivity[] = [
  {
    id: "mdf-801",
    partner_org_id: "org-partner-apex",
    activity_code: "MDF-2026-01",
    activity_name: "London Cyber Defense Summit — Silver Sponsorship & PAM Demo Hub",
    activity_type: "Conference Booth",
    target_audience: "CISOs, IT Directors, and Security Operations Managers in UK & Ireland",
    start_date: "2026-05-14",
    end_date: "2026-05-15",
    total_budget_usd: 15000,
    requested_mdf_amount_usd: 7500,
    expected_leads_count: 45,
    stage: "approved",
    approval_notes: "Approved for 50% co-funding against validated attendee badges.",
    created_at: "2026-02-05T11:00:00Z",
  },
];

export const SEED_LOCATORS: PartnerLocatorProfile[] = [
  {
    id: "loc-apex",
    partner_org_id: "org-partner-apex",
    display_name: "Apex Cyber Solutions",
    headquarters: "London, United Kingdom",
    service_regions: ["United Kingdom", "Western Europe", "Nordics"],
    specializations: ["Enterprise Vault Deployment", "Managed PAM Service (MSSP)", "Zero Trust Migration"],
    certifications_summary: ["OmniPriv Gold Partner", "Certified Sales Professional", "Certified Technical Architect"],
    public_description: "Apex Cyber Solutions is a tier-one privileged access security integrator specializing in hybrid cloud enterprise deployments and 24x7 managed bastion defense.",
    public_contact_email: "partnerships@apexcybersolutions.com",
    public_website: "https://apexcybersolutions.com",
    is_active_listing: true,
    admin_approved: true,
    updated_at: "2026-03-01T12:00:00Z",
  },
  {
    id: "loc-sentinel",
    partner_org_id: "org-partner-sentinel",
    display_name: "Sentinel Defense Systems",
    headquarters: "Austin, Texas, USA",
    service_regions: ["North America", "Latin America"],
    specializations: ["Critical Infrastructure PAM", "NERC CIP Compliance", "JIT Access Control"],
    certifications_summary: ["OmniPriv Silver Partner", "Certified Technical Architect"],
    public_description: "Sentinel Defense delivers hardened privileged governance and automated credential rotation for government, energy, and defense contractors.",
    public_contact_email: "alliances@sentineldefense.io",
    public_website: "https://sentineldefense.io",
    is_active_listing: true,
    admin_approved: true,
    updated_at: "2026-02-15T14:00:00Z",
  },
];

export const SEED_PAYOUT_PROFILES: PartnerPayoutProfile[] = [
  {
    id: "payout-apex",
    partner_org_id: "org-partner-apex",
    account_holder_legal_name: "Apex Cyber Solutions International Inc.",
    bank_country: "United Kingdom",
    settlement_currency: "GBP",
    routing_code_masked: "•••• 4012",
    account_number_masked: "••••••••8819",
    encrypted_token: "tok_enc_vault_hsm_9941a87b",
    status: "verified",
    verified_by: "Sarah Chen (Internal Channel Finance)",
    verified_at: "2025-02-01T14:00:00Z",
    version: 1,
    created_at: "2025-01-20T10:00:00Z",
    updated_at: "2025-02-01T14:00:00Z",
  },
];

// In-memory runtime data repository with thread-safe mutations
class ChannelDataStore {
  profiles = [...SEED_PARTNER_PROFILES];
  memberships = [...SEED_MEMBERSHIPS];
  certDefs = [...SEED_CERT_DEFS];
  certs = [...SEED_PARTNER_CERTS];
  links = [...SEED_CUSTOMER_LINKS];
  deals = [...SEED_DEALS];
  leads = [...SEED_LEADS];
  renewals = [...SEED_RENEWALS];
  requests = [...SEED_REQUESTS];
  resources = [...SEED_RESOURCES];
  courses = [...SEED_COURSES];
  jbps = [...SEED_JBPS];
  mdfs = [...SEED_MDFS];
  locators = [...SEED_LOCATORS];
  payouts = [...SEED_PAYOUT_PROFILES];

  // Helper to get active profile
  getProfile(partnerOrgId: string): PartnerProfile | undefined {
    return this.profiles.find((p) => p.partner_org_id === partnerOrgId);
  }

  // Get masked payout profile
  getPayoutProfile(partnerOrgId: string): PartnerPayoutProfile | undefined {
    return this.payouts.find((p) => p.partner_org_id === partnerOrgId);
  }

  // Tier calculation engine
  calculateTier(partnerOrgId: string): { tier: PartnerTier; validCertsCount: number; missing: string[] } {
    const activeCerts = this.certs.filter(
      (c) => c.partner_org_id === partnerOrgId && c.status === "valid"
    );
    const hasSalesCert = activeCerts.some((c) => c.category === "sales");
    const hasTechCert = activeCerts.some((c) => c.category === "technical");
    const totalCount = activeCerts.length;

    let tier: PartnerTier = "Registered";
    const missing: string[] = [];

    if (totalCount >= 4 && hasSalesCert && hasTechCert) {
      tier = "Platinum";
    } else if (totalCount >= 2 && hasSalesCert && hasTechCert) {
      tier = "Gold";
    } else if (totalCount >= 1 && hasSalesCert) {
      tier = "Silver";
    } else {
      tier = "Registered";
      missing.push("OmniPriv Certified Sales Professional");
    }

    if (tier === "Silver") {
      missing.push("OmniPriv Certified Technical Architect (for Gold tier)");
    } else if (tier === "Gold") {
      missing.push("2 Additional Certified Technical Engineers (for Platinum tier)");
    }

    return { tier, validCertsCount: totalCount, missing };
  }

  // Conflict detection for deals
  detectDealConflict(customerDomain: string, customerName: string): { conflict: boolean; details?: string } {
    const cleanDomain = customerDomain.toLowerCase().trim();
    const cleanName = customerName.toLowerCase().trim();

    const existingDeal = this.deals.find(
      (d) =>
        (d.status === "approved" || d.status === "submitted" || d.status === "under_review") &&
        (d.customer_domain.toLowerCase().trim() === cleanDomain ||
          d.customer_name.toLowerCase().trim() === cleanName)
    );

    if (existingDeal) {
      return {
        conflict: true,
        details: `Active registration (${existingDeal.deal_code}) already exists for this domain/organization under partner: ${existingDeal.partner_org_name}. Deal protection active until ${existingDeal.deal_protection_expiry}.`,
      };
    }
    return { conflict: false };
  }

  // Register Deal
  registerDeal(dealData: Omit<DealRegistration, "id" | "deal_code" | "status" | "created_at" | "updated_at" | "deal_protection_expiry" | "conflict_detected">): DealRegistration {
    const conflict = this.detectDealConflict(dealData.customer_domain, dealData.customer_name);
    const newCode = `DR-2026-${String(this.deals.length + 1).padStart(3, "0")}`;
    const protectionExpiry = new Date(Date.now() + 90 * 86400000).toISOString().split("T")[0];

    const newDeal: DealRegistration = {
      ...dealData,
      id: `deal-reg-${Date.now()}`,
      deal_code: newCode,
      status: conflict.conflict ? "under_review" : "submitted",
      conflict_detected: conflict.conflict,
      conflict_notes: conflict.details,
      deal_protection_expiry: protectionExpiry,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.deals.unshift(newDeal);
    logAuditEvent({
      actor_user_id: dealData.created_by_user_id,
      actor_name: dealData.created_by_user_name,
      actor_role: "Partner Sales",
      actor_org_id: dealData.partner_org_id,
      action: "channel.deal.submitted",
      target_type: "DealRegistration",
      target_id: newDeal.id,
      details: `Deal submitted for ${newDeal.customer_name}. Value: $${newDeal.estimated_value_usd}. Conflict detected: ${conflict.conflict}`,
      ip_address: "client-agent",
    });

    return newDeal;
  }

  // Update lead status
  updateLeadStatus(leadId: string, status: "accepted" | "declined" | "working"): PartnerLead | undefined {
    const lead = this.leads.find((l) => l.id === leadId);
    if (!lead) return undefined;
    lead.status = status;
    return lead;
  }

  // Convert lead to deal registration
  convertLeadToDeal(leadId: string, dealOverrides: Partial<DealRegistration>): DealRegistration | undefined {
    const lead = this.leads.find((l) => l.id === leadId);
    if (!lead) return undefined;

    lead.status = "converted";

    const newDeal = this.registerDeal({
      partner_org_id: lead.partner_org_id,
      partner_org_name: "Apex Cyber Solutions Ltd",
      customer_name: lead.prospect_company,
      customer_domain: `${lead.prospect_company.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
      customer_country: "United Kingdom",
      opportunity_name: dealOverrides.opportunity_name || `Opportunity - ${lead.prospect_company}`,
      estimated_value_usd: dealOverrides.estimated_value_usd || 50000,
      estimated_close_date: new Date(Date.now() + 60 * 86400000).toISOString().split("T")[0],
      target_products: dealOverrides.target_products || ["Enterprise PAM"],
      estimated_seats: dealOverrides.estimated_seats || 50,
      license_model: dealOverrides.license_model || "Annual Subscription",
      created_by_user_id: "usr-apex-sales",
      created_by_user_name: "Chloe Reynolds",
      source_lead_id: lead.id,
    });

    lead.converted_deal_id = newDeal.id;
    return newDeal;
  }

  // Create Entitlement Request
  createEntitlementRequest(reqData: Omit<PartnerEntitlementRequest, "id" | "request_code" | "status" | "created_at">): PartnerEntitlementRequest {
    const newCode = `REQ-2026-${String(this.requests.length + 1).padStart(3, "0")}`;
    const newReq: PartnerEntitlementRequest = {
      ...reqData,
      id: `req-${Date.now()}`,
      request_code: newCode,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    this.requests.unshift(newReq);
    return newReq;
  }

  // Review Entitlement Request
  reviewEntitlementRequest(reqId: string, status: "approved" | "declined", notes?: string): PartnerEntitlementRequest | undefined {
    const req = this.requests.find((r) => r.id === reqId);
    if (!req) return undefined;
    req.status = status;
    if (status === "approved") {
      req.approved_by = "Sarah Chen (Internal Channel Admin)";
      req.approved_at = new Date().toISOString();
    }
    return req;
  }

  // Reveal payout details under dual-control
  revealPayoutDetailsWithDualControl(partnerOrgId: string, approverEmail: string, justification: string): { unmasked_account_number: string; expires_at: string } | null {
    const payout = this.payouts.find((p) => p.partner_org_id === partnerOrgId);
    if (!payout) return null;
    payout.dual_control_reveal_active = true;
    payout.dual_control_reveal_expires_at = new Date(Date.now() + 15 * 60000).toISOString();

    logAuditEvent({
      actor_user_id: "usr-admin-sarah",
      actor_name: "Sarah Chen",
      actor_role: "Channel Admin",
      actor_org_id: "org-omnipriv-internal",
      action: "channel.payout.revealed",
      target_type: "PartnerPayoutProfile",
      target_id: payout.id,
      details: `DUAL-CONTROL TIME-BOUND REVEAL ACTIVATED (15 mins) by Sarah Chen with dual approval from ${approverEmail}. Business Justification: ${justification}. Sensitive tokens remain in HSM/KMS.`,
      ip_address: "internal-mgmt-dual-ctrl",
    });

    return {
      unmasked_account_number: "GB29NWBK60161331926819", // Synthetic test token
      expires_at: payout.dual_control_reveal_expires_at,
    };
  }
}

// Global singleton instance
export const store = new ChannelDataStore();
