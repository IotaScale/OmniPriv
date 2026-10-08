export type PartnerRole =
  | "Channel Admin"
  | "Partner Manager"
  | "Partner Owner"
  | "Partner Sales"
  | "Partner Engineer"
  | "Partner Marketing"
  | "Partner Finance";

export type PartnerProgramType =
  | "Reseller"
  | "System Integrator"
  | "MSP/MSSP"
  | "Technology Alliance";

export type PartnerTier = "Registered" | "Silver" | "Gold" | "Platinum";

export type ProgramStatus = "pending" | "active" | "suspended" | "terminated";

export type LinkRelationshipType =
  | "resale"
  | "managed_service"
  | "integration"
  | "support";

export type LinkStatus = "pending" | "active" | "suspended" | "ended";

export type DealStatus =
  | "draft"
  | "submitted"
  | "awaiting_approval"
  | "under_review"
  | "approved"
  | "declined"
  | "expired"
  | "closed_won"
  | "closed_lost";

export type LeadStatus =
  | "assigned"
  | "accepted"
  | "declined"
  | "working"
  | "qualified"
  | "converted"
  | "disqualified";

export type EntitlementRequestType =
  | "quote"
  | "subscription"
  | "renewal"
  | "nfr"
  | "trial"
  | "poc";

export type EntitlementRequestStatus =
  | "pending"
  | "approved"
  | "declined"
  | "active"
  | "expired"
  | "revoked";

export type JBPStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "changes_requested"
  | "archived";

export type MDFStage =
  | "draft"
  | "submitted"
  | "approved"
  | "declined"
  | "completed"
  | "claim_submitted"
  | "under_audit"
  | "closed";

export type ResourceCategory =
  | "product"
  | "deployment"
  | "sales"
  | "marketing"
  | "legal"
  | "campaign";

export type CertificationCategory =
  | "sales"
  | "presales"
  | "technical"
  | "onboarding";

export type CertificationStatus =
  | "valid"
  | "expiring"
  | "expired"
  | "revoked";

export interface PartnerProfile {
  id: string;
  partner_org_id: string;
  company_name: string;
  legal_name: string;
  website: string;
  country: string;
  region: string;
  primary_contact_name: string;
  primary_contact_email: string;
  primary_partner_manager_id?: string;
  primary_partner_manager_name?: string;
  program_status: ProgramStatus;
  partner_types: PartnerProgramType[];
  current_tier: PartnerTier;
  locator_published: boolean;
  onboarding_completed: boolean;
  terms_accepted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PartnerMembership {
  id: string;
  partner_org_id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  role: PartnerRole;
  status: "active" | "invited" | "suspended";
  invited_at?: string;
  joined_at?: string;
}

export interface PartnerProgramEnrollment {
  id: string;
  partner_org_id: string;
  program_type: PartnerProgramType;
  tier: PartnerTier;
  effective_date: string;
  expiry_date: string;
  approval_status: "approved" | "under_review" | "suspended";
  manual_tier_override: boolean;
  override_reason?: string;
  entitlement_state: "active" | "restricted" | "suspended";
  created_at: string;
}

export interface CertificationDefinition {
  id: string;
  code: string;
  name: string;
  category: CertificationCategory;
  valid_duration_months: number;
  required_for_tier: PartnerTier[];
  description: string;
}

export interface PartnerCertification {
  id: string;
  partner_org_id: string;
  user_id: string;
  user_name: string;
  certification_def_id: string;
  certification_name: string;
  category: CertificationCategory;
  status: CertificationStatus;
  issued_at: string;
  expires_at: string;
  verification_code: string;
  badge_url?: string;
}

export interface CustomerPartnerLink {
  id: string;
  partner_org_id: string;
  customer_org_id: string;
  customer_org_name: string;
  relationship_type: LinkRelationshipType;
  status: LinkStatus;
  scopes: ("commercial_view" | "renewal_view" | "license_request" | "support_request")[];
  approved_by: string;
  approved_at: string;
  expiry_date?: string;
  termination_reason?: string;
}

/** Strictly commercial projection - ZERO PAM secret or session data */
export interface CommercialCustomerSummary {
  customer_org_id: string;
  customer_org_name: string;
  active_product: string;
  license_tier: string;
  managed_assets_count: number;
  active_users_licensed: number;
  renewal_date: string;
  support_sla: string;
  relationship_type: LinkRelationshipType;
}

export interface DealRegistration {
  id: string;
  deal_code: string;
  partner_org_id: string;
  partner_org_name: string;
  customer_name: string;
  customer_domain: string;
  customer_country: string;
  opportunity_name: string;
  estimated_value_usd: number;
  estimated_close_date: string;
  target_products: string[];
  estimated_seats: number;
  license_model: "Perpetual" | "Annual Subscription" | "MSP Consumption";
  status: DealStatus;
  deal_protection_expiry?: string;
  protection_expires_at?: string;
  conflict_detected: boolean;
  conflict_notes?: string;
  customer_industry?: string;
  customer_contact_name?: string;
  customer_contact_email?: string;
  customer_contact_phone?: string;
  deployment_timeline?: string;
  opportunity_source?: string;
  partner_notes?: string;
  reviewer_id?: string;
  reviewer_name?: string;
  review_notes?: string;
  source_lead_id?: string;
  created_by_user_id: string;
  created_by_user_name: string;
  created_at: string;
  updated_at: string;
}

export interface PartnerLead {
  id: string;
  partner_org_id: string;
  prospect_company: string;
  prospect_contact_name: string;
  prospect_contact_email: string;
  prospect_country: string;
  estimated_scope: string;
  assigned_at: string;
  sla_deadline: string;
  status: LeadStatus;
  qualification_notes?: string;
  decline_reason?: string;
  converted_deal_id?: string;
}

export interface RenewalOpportunity {
  id: string;
  partner_org_id: string;
  customer_partner_link_id: string;
  customer_org_name: string;
  product_name: string;
  annual_contract_value_usd: number;
  licensed_asset_capacity: number;
  renewal_date: string;
  status: "upcoming" | "quote_requested" | "in_negotiation" | "renewed" | "lapsed";
  assigned_owner: string;
  last_contact_date?: string;
}

export interface PartnerEntitlementRequest {
  id: string;
  request_code: string;
  partner_org_id: string;
  partner_org_name: string;
  request_type: EntitlementRequestType;
  product_edition: string;
  duration_days: number;
  target_customer_name?: string;
  requested_seats: number;
  justification: string;
  status: EntitlementRequestStatus;
  license_key_masked?: string;
  approved_by?: string;
  approved_at?: string;
  expires_at?: string;
  requested_by_user_id: string;
  requested_by_user_name: string;
  created_at: string;
}

export interface PartnerResource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  version: string;
  file_format: string;
  file_size_bytes: number;
  download_url: string;
  min_tier: PartnerTier;
  locale: string;
  published_at: string;
  updated_at: string;
}

export interface PartnerCourse {
  id: string;
  code: string;
  title: string;
  category: CertificationCategory;
  duration_hours: number;
  modules_count: number;
  target_role: string;
  linked_certification_id: string;
  enrolled: boolean;
  completion_pct: number;
}

export interface JointBusinessPlan {
  id: string;
  partner_org_id: string;
  fiscal_year: string;
  revenue_target_usd: number;
  target_industries: string[];
  dedicated_sales_headcount: number;
  dedicated_technical_headcount: number;
  key_initiatives: string[];
  requested_omnipriv_support: string;
  status: JBPStatus;
  review_notes?: string;
  submitted_at?: string;
  approved_at?: string;
  created_at: string;
}

export interface MarketingFundActivity {
  id: string;
  partner_org_id: string;
  activity_code: string;
  activity_name: string;
  activity_type: "Webinar" | "Conference Booth" | "Executive Dinner" | "Digital Campaign" | "Customer Workshop";
  target_audience: string;
  start_date: string;
  end_date: string;
  total_budget_usd: number;
  requested_mdf_amount_usd: number;
  expected_leads_count: number;
  stage: MDFStage;
  approval_notes?: string;
  claim_amount_usd?: number;
  claim_evidence_summary?: string;
  created_at: string;
}

export type PayoutStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "verified"
  | "changes_requested"
  | "suspended";

export interface PartnerPayoutProfile {
  id: string;
  partner_org_id: string;
  account_holder_legal_name: string;
  bank_country: string;
  settlement_currency: string;
  routing_code_masked: string; // e.g. "•••• 1234"
  account_number_masked: string; // e.g. "••••••••5678"
  encrypted_token: string; // Tokenized or encrypted payload reference
  status: PayoutStatus;
  verified_by?: string;
  verified_at?: string;
  rejection_reason?: string;
  supporting_doc_reference?: string;
  version: number;
  dual_control_reveal_active?: boolean;
  dual_control_reveal_expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PartnerLocatorProfile {
  id: string;
  partner_org_id: string;
  display_name: string;
  headquarters: string;
  service_regions: string[];
  specializations: string[];
  certifications_summary: string[];
  public_description: string;
  public_contact_email: string;
  public_website: string;
  is_active_listing: boolean;
  admin_approved: boolean;
  updated_at: string;
}

export interface PartnerAuditEvent {
  id: string;
  timestamp: string;
  actor_user_id: string;
  actor_name: string;
  actor_role: string;
  actor_org_id: string;
  action: string;
  target_type: string;
  target_id: string;
  details: string;
  ip_address?: string;
}

export interface ChannelFeatureFlags {
  partner_portal: boolean;
  deals: boolean;
  leads: boolean;
  renewals: boolean;
  trial_requests: boolean;
  learning: boolean;
  locator: boolean;
  marketing_funds: boolean;
  jbp: boolean;
  payout_profile: boolean;
}
