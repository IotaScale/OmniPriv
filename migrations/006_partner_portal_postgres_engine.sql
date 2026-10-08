-- OmniPriv Partner Portal Migration 006: PostgreSQL B2B Partner Model Engine
-- Introduces Partner Applications, Channel Inbound Leads, and Commercial Product Offers

BEGIN;

-- 1. Partner Applications Table (Public Application & Review Workflow)
CREATE TABLE IF NOT EXISTS partner_applications (
    id VARCHAR(64) PRIMARY KEY,
    application_number VARCHAR(64) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    country VARCHAR(100) NOT NULL,
    region VARCHAR(50) NOT NULL,
    primary_contact_name VARCHAR(255) NOT NULL,
    primary_contact_email VARCHAR(255) NOT NULL,
    primary_contact_phone VARCHAR(50),
    primary_contact_role VARCHAR(100),
    company_type VARCHAR(64) NOT NULL, -- 'Reseller/Distributor', 'System Integrator', 'MSP/MSSP', 'Technology Alliance'
    program_tracks JSONB NOT NULL DEFAULT '["Sell"]'::jsonb, -- 'Sell', 'Deploy', 'Manage', 'Build'
    intended_vertical VARCHAR(255),
    partnership_scope TEXT,
    experience_summary TEXT,
    notes TEXT,
    consent_acknowledged BOOLEAN NOT NULL DEFAULT TRUE,
    status VARCHAR(32) NOT NULL DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'under_review', 'information_requested', 'approved', 'rejected', 'withdrawn')),
    reviewer_id VARCHAR(64),
    reviewer_name VARCHAR(255),
    decision_reason TEXT,
    information_request_notes TEXT,
    created_partner_org_id VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_apps_status ON partner_applications(status);
CREATE INDEX IF NOT EXISTS idx_partner_apps_email ON partner_applications(primary_contact_email);
CREATE INDEX IF NOT EXISTS idx_partner_apps_created ON partner_applications(created_at DESC);

-- 2. Commercial Product Offers Table
CREATE TABLE IF NOT EXISTS commercial_product_offers (
    id VARCHAR(64) PRIMARY KEY,
    product_code VARCHAR(64) UNIQUE NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    edition VARCHAR(64) NOT NULL,
    min_seats INT NOT NULL DEFAULT 10,
    quote_only BOOLEAN NOT NULL DEFAULT FALSE,
    eligible_tiers JSONB NOT NULL DEFAULT '["Registered", "Silver", "Gold", "Platinum"]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed baseline OmniPriv PAM product catalog
INSERT INTO commercial_product_offers (id, product_code, product_name, edition, min_seats, quote_only, eligible_tiers)
VALUES 
('prod-vault-ent', 'OP-PAM-ENT', 'OmniPriv Enterprise Credential Vault & Bastion', 'Enterprise', 25, FALSE, '["Registered", "Silver", "Gold", "Platinum"]'::jsonb),
('prod-jit-cloud', 'OP-JIT-CLOUD', 'OmniPriv Just-In-Time Multi-Cloud Access Gateway', 'Cloud MSP', 10, FALSE, '["Silver", "Gold", "Platinum"]'::jsonb),
('prod-airgap-ot', 'OP-OT-SEC', 'OmniPriv Air-Gapped Industrial & OT PAM proxy', 'Air-Gapped OT', 50, TRUE, '["Gold", "Platinum"]'::jsonb),
('prod-ai-agent', 'OP-AI-DEF', 'OmniPriv Non-Human Identity & AI Agent Governance', 'Enterprise', 15, FALSE, '["Registered", "Silver", "Gold", "Platinum"]'::jsonb)
ON CONFLICT (product_code) DO NOTHING;

-- 3. Channel Leads Table (Inbound Pool for Channel Routing to Partners)
CREATE TABLE IF NOT EXISTS channel_leads (
    id VARCHAR(64) PRIMARY KEY,
    lead_code VARCHAR(64) UNIQUE NOT NULL,
    prospect_company VARCHAR(255) NOT NULL,
    prospect_contact_name VARCHAR(255) NOT NULL,
    prospect_contact_email VARCHAR(255) NOT NULL,
    prospect_country VARCHAR(100) NOT NULL,
    source VARCHAR(64) NOT NULL DEFAULT 'website' CHECK (source IN ('website', 'event_campaign', 'internal_sales', 'approved_import')),
    requested_product VARCHAR(255) NOT NULL,
    estimated_seats INT NOT NULL DEFAULT 50,
    estimated_value_usd NUMERIC(14,2) NOT NULL DEFAULT 50000.00,
    request_type VARCHAR(64) NOT NULL DEFAULT 'demo' CHECK (request_type IN ('demo', 'pricing', 'evaluation', 'rfp')),
    qualification_status VARCHAR(32) NOT NULL DEFAULT 'qualified' CHECK (qualification_status IN ('inbound', 'qualified', 'routed', 'disqualified')),
    assigned_partner_org_id VARCHAR(64),
    assigned_partner_org_name VARCHAR(255),
    assigned_at TIMESTAMPTZ,
    sla_deadline TIMESTAMPTZ,
    partner_status VARCHAR(32) NOT NULL DEFAULT 'unassigned' CHECK (partner_status IN ('unassigned', 'assigned', 'accepted', 'declined', 'working', 'converted', 'disqualified')),
    decline_reason TEXT,
    converted_deal_id VARCHAR(64),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_channel_leads_partner ON channel_leads(assigned_partner_org_id);
CREATE INDEX IF NOT EXISTS idx_channel_leads_status ON channel_leads(partner_status);
CREATE INDEX IF NOT EXISTS idx_channel_leads_qual ON channel_leads(qualification_status);

COMMIT;
