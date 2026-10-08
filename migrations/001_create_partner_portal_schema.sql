-- OmniPriv Partner Portal Migration 001: Core Architecture Schema
-- 17 Isolation Tables for Channel Commercial Lifecycle

BEGIN;

-- 1. Partner Profiles
CREATE TABLE IF NOT EXISTS partner_profiles (
    id VARCHAR(64) PRIMARY KEY,
    partner_org_id VARCHAR(64) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    country VARCHAR(100) NOT NULL,
    region VARCHAR(50) NOT NULL,
    primary_contact_name VARCHAR(255) NOT NULL,
    primary_contact_email VARCHAR(255) NOT NULL,
    primary_partner_manager_id VARCHAR(64),
    primary_partner_manager_name VARCHAR(255),
    program_status VARCHAR(32) NOT NULL DEFAULT 'pending' CHECK (program_status IN ('pending', 'active', 'suspended', 'terminated')),
    partner_types JSONB NOT NULL DEFAULT '[]'::jsonb,
    current_tier VARCHAR(32) NOT NULL DEFAULT 'Registered' CHECK (current_tier IN ('Registered', 'Silver', 'Gold', 'Platinum')),
    locator_published BOOLEAN NOT NULL DEFAULT FALSE,
    onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
    terms_accepted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_profiles_org ON partner_profiles(partner_org_id);
CREATE INDEX IF NOT EXISTS idx_partner_profiles_tier ON partner_profiles(current_tier);
CREATE INDEX IF NOT EXISTS idx_partner_profiles_status ON partner_profiles(program_status);

-- 2. Partner Memberships
CREATE TABLE IF NOT EXISTS partner_memberships (
    id VARCHAR(64) PRIMARY KEY,
    partner_org_id VARCHAR(64) NOT NULL REFERENCES partner_profiles(partner_org_id) ON DELETE CASCADE,
    user_id VARCHAR(64) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    role VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'invited' CHECK (status IN ('active', 'invited', 'suspended')),
    invited_at TIMESTAMPTZ,
    joined_at TIMESTAMPTZ,
    CONSTRAINT uq_partner_membership_org_user UNIQUE (partner_org_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_partner_memberships_user ON partner_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_partner_memberships_org ON partner_memberships(partner_org_id);

-- 3. Partner Program Enrollments
CREATE TABLE IF NOT EXISTS partner_program_enrollments (
    id VARCHAR(64) PRIMARY KEY,
    partner_org_id VARCHAR(64) NOT NULL REFERENCES partner_profiles(partner_org_id) ON DELETE CASCADE,
    program_type VARCHAR(64) NOT NULL,
    tier VARCHAR(32) NOT NULL,
    effective_date TIMESTAMPTZ NOT NULL,
    expiry_date TIMESTAMPTZ NOT NULL,
    approval_status VARCHAR(32) NOT NULL DEFAULT 'under_review' CHECK (approval_status IN ('approved', 'under_review', 'suspended')),
    manual_tier_override BOOLEAN NOT NULL DEFAULT FALSE,
    override_reason TEXT,
    entitlement_state VARCHAR(32) NOT NULL DEFAULT 'active' CHECK (entitlement_state IN ('active', 'restricted', 'suspended')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enrollments_org ON partner_program_enrollments(partner_org_id);

-- 4. Partner Specializations
CREATE TABLE IF NOT EXISTS partner_specializations (
    id VARCHAR(64) PRIMARY KEY,
    partner_org_id VARCHAR(64) NOT NULL REFERENCES partner_profiles(partner_org_id) ON DELETE CASCADE,
    specialization_code VARCHAR(64) NOT NULL,
    specialization_name VARCHAR(255) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'active',
    valid_from TIMESTAMPTZ NOT NULL,
    valid_until TIMESTAMPTZ NOT NULL,
    evidence_notes TEXT,
    approved_by VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_specializations_org ON partner_specializations(partner_org_id);

-- 5. Certification Definitions and Partner Certifications
CREATE TABLE IF NOT EXISTS certification_definitions (
    id VARCHAR(64) PRIMARY KEY,
    code VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL CHECK (category IN ('sales', 'presales', 'technical', 'onboarding')),
    valid_duration_months INT NOT NULL DEFAULT 12,
    required_for_tier JSONB NOT NULL DEFAULT '[]'::jsonb,
    description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS partner_certifications (
    id VARCHAR(64) PRIMARY KEY,
    partner_org_id VARCHAR(64) NOT NULL REFERENCES partner_profiles(partner_org_id) ON DELETE CASCADE,
    user_id VARCHAR(64) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    certification_def_id VARCHAR(64) NOT NULL REFERENCES certification_definitions(id) ON DELETE RESTRICT,
    certification_name VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'valid' CHECK (status IN ('valid', 'expiring', 'expired', 'revoked')),
    issued_at TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    verification_code VARCHAR(64) UNIQUE NOT NULL,
    badge_url TEXT
);

CREATE INDEX IF NOT EXISTS idx_partner_certs_org ON partner_certifications(partner_org_id);
CREATE INDEX IF NOT EXISTS idx_partner_certs_user ON partner_certifications(user_id);

-- 6. Customer-Partner Links (Commercial isolation boundary)
CREATE TABLE IF NOT EXISTS customer_partner_links (
    id VARCHAR(64) PRIMARY KEY,
    partner_org_id VARCHAR(64) NOT NULL REFERENCES partner_profiles(partner_org_id) ON DELETE CASCADE,
    customer_org_id VARCHAR(64) NOT NULL,
    customer_org_name VARCHAR(255) NOT NULL,
    relationship_type VARCHAR(64) NOT NULL CHECK (relationship_type IN ('resale', 'managed_service', 'integration', 'support')),
    status VARCHAR(32) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended', 'ended')),
    scopes JSONB NOT NULL DEFAULT '[]'::jsonb,
    approved_by VARCHAR(64) NOT NULL,
    approved_at TIMESTAMPTZ NOT NULL,
    expiry_date TIMESTAMPTZ,
    termination_reason TEXT,
    CONSTRAINT uq_cpl_orgs UNIQUE (partner_org_id, customer_org_id)
);

CREATE INDEX IF NOT EXISTS idx_cpl_partner ON customer_partner_links(partner_org_id);
CREATE INDEX IF NOT EXISTS idx_cpl_customer ON customer_partner_links(customer_org_id);

-- 7. Deal Registrations
CREATE TABLE IF NOT EXISTS deal_registrations (
    id VARCHAR(64) PRIMARY KEY,
    deal_code VARCHAR(64) UNIQUE NOT NULL,
    partner_org_id VARCHAR(64) NOT NULL REFERENCES partner_profiles(partner_org_id) ON DELETE CASCADE,
    partner_org_name VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_domain VARCHAR(255) NOT NULL,
    customer_country VARCHAR(100) NOT NULL,
    opportunity_name VARCHAR(255) NOT NULL,
    estimated_value_usd NUMERIC(14,2) NOT NULL,
    estimated_close_date DATE NOT NULL,
    target_products JSONB NOT NULL DEFAULT '[]'::jsonb,
    estimated_seats INT NOT NULL DEFAULT 0,
    license_model VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'approved', 'declined', 'expired', 'closed_won', 'closed_lost')),
    deal_protection_expiry TIMESTAMPTZ NOT NULL,
    conflict_detected BOOLEAN NOT NULL DEFAULT FALSE,
    conflict_notes TEXT,
    reviewer_id VARCHAR(64),
    reviewer_name VARCHAR(255),
    review_notes TEXT,
    source_lead_id VARCHAR(64),
    created_by_user_id VARCHAR(64) NOT NULL,
    created_by_user_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_deals_partner ON deal_registrations(partner_org_id);
CREATE INDEX IF NOT EXISTS idx_deals_status ON deal_registrations(status);

-- 8. Partner Leads
CREATE TABLE IF NOT EXISTS partner_leads (
    id VARCHAR(64) PRIMARY KEY,
    partner_org_id VARCHAR(64) NOT NULL REFERENCES partner_profiles(partner_org_id) ON DELETE CASCADE,
    prospect_company VARCHAR(255) NOT NULL,
    prospect_contact_name VARCHAR(255) NOT NULL,
    prospect_contact_email VARCHAR(255) NOT NULL,
    prospect_country VARCHAR(100) NOT NULL,
    estimated_scope TEXT NOT NULL,
    assigned_at TIMESTAMPTZ NOT NULL,
    sla_deadline TIMESTAMPTZ NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned', 'accepted', 'declined', 'working', 'qualified', 'converted', 'disqualified')),
    qualification_notes TEXT,
    decline_reason TEXT,
    converted_deal_id VARCHAR(64) REFERENCES deal_registrations(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_partner ON partner_leads(partner_org_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON partner_leads(status);

-- 9. Renewal Opportunities
CREATE TABLE IF NOT EXISTS renewal_opportunities (
    id VARCHAR(64) PRIMARY KEY,
    partner_org_id VARCHAR(64) NOT NULL REFERENCES partner_profiles(partner_org_id) ON DELETE CASCADE,
    customer_partner_link_id VARCHAR(64) NOT NULL REFERENCES customer_partner_links(id) ON DELETE CASCADE,
    customer_org_name VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    annual_contract_value_usd NUMERIC(14,2) NOT NULL,
    licensed_asset_capacity INT NOT NULL DEFAULT 0,
    renewal_date DATE NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'quote_requested', 'in_negotiation', 'renewed', 'lapsed')),
    assigned_owner VARCHAR(255) NOT NULL,
    last_contact_date DATE
);

CREATE INDEX IF NOT EXISTS idx_renewals_partner ON renewal_opportunities(partner_org_id);
CREATE INDEX IF NOT EXISTS idx_renewals_link ON renewal_opportunities(customer_partner_link_id);

-- 10. Partner Entitlement Requests
CREATE TABLE IF NOT EXISTS partner_entitlement_requests (
    id VARCHAR(64) PRIMARY KEY,
    request_code VARCHAR(64) UNIQUE NOT NULL,
    partner_org_id VARCHAR(64) NOT NULL REFERENCES partner_profiles(partner_org_id) ON DELETE CASCADE,
    partner_org_name VARCHAR(255) NOT NULL,
    request_type VARCHAR(32) NOT NULL CHECK (request_type IN ('quote', 'subscription', 'renewal', 'nfr', 'trial', 'poc')),
    product_edition VARCHAR(255) NOT NULL,
    duration_days INT NOT NULL,
    target_customer_name VARCHAR(255),
    requested_seats INT NOT NULL DEFAULT 0,
    justification TEXT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined', 'active', 'expired', 'revoked')),
    license_key_masked VARCHAR(255),
    approved_by VARCHAR(64),
    approved_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    requested_by_user_id VARCHAR(64) NOT NULL,
    requested_by_user_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_entitlements_partner ON partner_entitlement_requests(partner_org_id);

-- 11. Partner Resources
CREATE TABLE IF NOT EXISTS partner_resources (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(64) NOT NULL CHECK (category IN ('product', 'deployment', 'sales', 'marketing', 'legal', 'campaign')),
    version VARCHAR(32) NOT NULL,
    file_format VARCHAR(32) NOT NULL,
    file_size_bytes BIGINT NOT NULL DEFAULT 0,
    download_url TEXT NOT NULL,
    min_tier VARCHAR(32) NOT NULL DEFAULT 'Registered',
    locale VARCHAR(32) NOT NULL DEFAULT 'en-US',
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resources_category ON partner_resources(category);

-- 12. Partner Courses & Learning Progress
CREATE TABLE IF NOT EXISTS partner_courses (
    id VARCHAR(64) PRIMARY KEY,
    code VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    duration_hours NUMERIC(6,2) NOT NULL DEFAULT 1.0,
    modules_count INT NOT NULL DEFAULT 1,
    target_role VARCHAR(64) NOT NULL,
    linked_certification_id VARCHAR(64) REFERENCES certification_definitions(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS partner_learning_progress (
    id VARCHAR(64) PRIMARY KEY,
    course_id VARCHAR(64) NOT NULL REFERENCES partner_courses(id) ON DELETE CASCADE,
    user_id VARCHAR(64) NOT NULL,
    partner_org_id VARCHAR(64) NOT NULL REFERENCES partner_profiles(partner_org_id) ON DELETE CASCADE,
    enrolled BOOLEAN NOT NULL DEFAULT TRUE,
    completion_pct INT NOT NULL DEFAULT 0,
    last_active_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_learning_progress UNIQUE (course_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_learning_partner ON partner_learning_progress(partner_org_id);
CREATE INDEX IF NOT EXISTS idx_learning_user ON partner_learning_progress(user_id);

-- 13. Joint Business Plans
CREATE TABLE IF NOT EXISTS joint_business_plans (
    id VARCHAR(64) PRIMARY KEY,
    partner_org_id VARCHAR(64) NOT NULL REFERENCES partner_profiles(partner_org_id) ON DELETE CASCADE,
    fiscal_year VARCHAR(16) NOT NULL,
    revenue_target_usd NUMERIC(14,2) NOT NULL DEFAULT 0,
    target_industries JSONB NOT NULL DEFAULT '[]'::jsonb,
    dedicated_sales_headcount INT NOT NULL DEFAULT 0,
    dedicated_technical_headcount INT NOT NULL DEFAULT 0,
    key_initiatives JSONB NOT NULL DEFAULT '[]'::jsonb,
    requested_omnipriv_support TEXT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'approved', 'changes_requested', 'archived')),
    review_notes TEXT,
    submitted_at TIMESTAMPTZ,
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jbp_partner ON joint_business_plans(partner_org_id);

-- 14. Marketing Fund Activities
CREATE TABLE IF NOT EXISTS marketing_fund_activities (
    id VARCHAR(64) PRIMARY KEY,
    partner_org_id VARCHAR(64) NOT NULL REFERENCES partner_profiles(partner_org_id) ON DELETE CASCADE,
    activity_code VARCHAR(64) UNIQUE NOT NULL,
    activity_name VARCHAR(255) NOT NULL,
    activity_type VARCHAR(64) NOT NULL,
    target_audience VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_budget_usd NUMERIC(14,2) NOT NULL DEFAULT 0,
    requested_mdf_amount_usd NUMERIC(14,2) NOT NULL DEFAULT 0,
    expected_leads_count INT NOT NULL DEFAULT 0,
    stage VARCHAR(32) NOT NULL DEFAULT 'draft',
    approval_notes TEXT,
    claim_amount_usd NUMERIC(14,2),
    claim_evidence_summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mdf_partner ON marketing_fund_activities(partner_org_id);

-- 15. Partner Payout Profiles (Security hardened - masked fields, tokenized payloads)
CREATE TABLE IF NOT EXISTS partner_payout_profiles (
    id VARCHAR(64) PRIMARY KEY,
    partner_org_id VARCHAR(64) NOT NULL REFERENCES partner_profiles(partner_org_id) ON DELETE CASCADE,
    account_holder_legal_name VARCHAR(255) NOT NULL,
    bank_country VARCHAR(100) NOT NULL,
    settlement_currency VARCHAR(8) NOT NULL DEFAULT 'USD',
    routing_code_masked VARCHAR(32) NOT NULL,
    account_number_masked VARCHAR(32) NOT NULL,
    encrypted_token TEXT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'verified', 'changes_requested', 'suspended')),
    verified_by VARCHAR(64),
    verified_at TIMESTAMPTZ,
    rejection_reason TEXT,
    supporting_doc_reference TEXT,
    version INT NOT NULL DEFAULT 1,
    dual_control_reveal_active BOOLEAN NOT NULL DEFAULT FALSE,
    dual_control_reveal_expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payout_partner ON partner_payout_profiles(partner_org_id);

-- 16. Partner Locator Profiles
CREATE TABLE IF NOT EXISTS partner_locator_profiles (
    id VARCHAR(64) PRIMARY KEY,
    partner_org_id VARCHAR(64) NOT NULL REFERENCES partner_profiles(partner_org_id) ON DELETE CASCADE,
    display_name VARCHAR(255) NOT NULL,
    headquarters VARCHAR(255) NOT NULL,
    service_regions JSONB NOT NULL DEFAULT '[]'::jsonb,
    specializations JSONB NOT NULL DEFAULT '[]'::jsonb,
    certifications_summary JSONB NOT NULL DEFAULT '[]'::jsonb,
    public_description TEXT NOT NULL,
    public_contact_email VARCHAR(255) NOT NULL,
    public_website VARCHAR(255) NOT NULL,
    is_active_listing BOOLEAN NOT NULL DEFAULT FALSE,
    admin_approved BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_locator_active ON partner_locator_profiles(is_active_listing, admin_approved);

-- 17. Partner Audit Events (Append-only immutable audit trail)
CREATE TABLE IF NOT EXISTS partner_audit_events (
    id VARCHAR(64) PRIMARY KEY,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    actor_user_id VARCHAR(64) NOT NULL,
    actor_name VARCHAR(255) NOT NULL,
    actor_role VARCHAR(64) NOT NULL,
    actor_org_id VARCHAR(64) NOT NULL,
    action VARCHAR(100) NOT NULL,
    target_type VARCHAR(100) NOT NULL,
    target_id VARCHAR(64) NOT NULL,
    details TEXT NOT NULL,
    ip_address VARCHAR(64) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON partner_audit_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON partner_audit_events(actor_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_org ON partner_audit_events(actor_org_id);

COMMIT;
