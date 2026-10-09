-- OmniPriv Partner Portal Migration 002: Initial Enterprise PAM Seed Data
-- Mirrors validated enterprise channel dataset from lib/partner-portal/store.ts

BEGIN;

-- 1. Partner Profiles Seed
INSERT INTO partner_profiles (
    id, partner_org_id, company_name, legal_name, website, country, region,
    primary_contact_name, primary_contact_email, primary_partner_manager_id, primary_partner_manager_name,
    program_status, partner_types, current_tier, locator_published, onboarding_completed, terms_accepted_at, created_at, updated_at
) VALUES 
(
    'prof-apex', 'org-partner-apex', 'Apex Cyber Solutions Ltd', 'Apex Cyber Solutions International Inc.', 'https://apexcybersolutions.com',
    'United Kingdom', 'EMEA', 'Marcus Vance', 'marcus.vance@apexcybersolutions.com', 'usr-pm-elena', 'Elena Rostova',
    'active', '["Reseller", "MSP/MSSP"]'::jsonb, 'Gold', TRUE, TRUE, '2025-01-15T09:00:00Z', '2025-01-10T10:00:00Z', '2026-03-01T12:00:00Z'
),
(
    'prof-sentinel', 'org-partner-sentinel', 'Sentinel Defense Systems', 'Sentinel Defense Systems LLC', 'https://sentineldefense.io',
    'United States', 'Americas', 'David Miller', 'david@sentineldefense.io', 'usr-pm-elena', 'Elena Rostova',
    'active', '["System Integrator", "MSP/MSSP"]'::jsonb, 'Silver', TRUE, TRUE, '2025-04-10T11:00:00Z', '2025-04-05T08:00:00Z', '2026-02-15T14:00:00Z'
),
(
    'prof-nordic', 'org-partner-nordic', 'Nordic Shield IT', 'Nordic Shield IT Oy', 'https://nordicshield.fi',
    'Finland', 'Nordics', 'Aino Korhonen', 'aino@nordicshield.fi', 'usr-pm-elena', 'Elena Rostova',
    'pending', '["Reseller"]'::jsonb, 'Registered', FALSE, FALSE, NULL, '2026-03-25T11:00:00Z', '2026-03-25T11:00:00Z'
)
ON CONFLICT (id) DO NOTHING;

-- 2. Partner Memberships Seed
INSERT INTO partner_memberships (
    id, partner_org_id, user_id, user_name, user_email, role, status, joined_at
) VALUES 
('mem-apex-1', 'org-partner-apex', 'usr-apex-owner', 'Marcus Vance', 'marcus.vance@apexcybersolutions.com', 'Partner Owner', 'active', '2025-01-15T09:30:00Z'),
('mem-apex-2', 'org-partner-apex', 'usr-apex-sales', 'Chloe Reynolds', 'chloe.r@apexcybersolutions.com', 'Partner Sales', 'active', '2025-02-01T10:00:00Z'),
('mem-apex-3', 'org-partner-apex', 'usr-apex-eng', 'Tariq Mansoor', 'tariq.m@apexcybersolutions.com', 'Partner Engineer', 'active', '2025-02-10T14:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- 3. Certification Definitions Seed
INSERT INTO certification_definitions (
    id, code, name, category, valid_duration_months, required_for_tier, description
) VALUES 
('cdef-sales', 'OP-CSP', 'OmniPriv Certified Sales Professional', 'sales', 12, '["Silver", "Gold", "Platinum"]'::jsonb, 'Value positioning, competitive differentiation vs legacy PAM, pricing models, and objection handling.'),
('cdef-tech', 'OP-CTA', 'OmniPriv Certified Technical Architect', 'technical', 24, '["Gold", "Platinum"]'::jsonb, 'Agentless session gateway clustering, HSM integration, automated credential rotation, and SIEM forwarding.'),
('cdef-presales', 'OP-CPE', 'OmniPriv Certified Presales Engineer', 'presales', 12, '["Silver", "Gold", "Platinum"]'::jsonb, 'Proof-of-concept deployment, discovery scoping, JIT privilege policy demonstration, and client onboarding.')
ON CONFLICT (id) DO NOTHING;

-- 4. Partner Certifications Seed
INSERT INTO partner_certifications (
    id, partner_org_id, user_id, user_name, certification_def_id, certification_name, category, status, issued_at, expires_at, verification_code
) VALUES 
('cert-1', 'org-partner-apex', 'usr-apex-eng', 'Tariq Mansoor', 'cdef-tech', 'OmniPriv Certified Technical Architect', 'technical', 'valid', '2025-03-01T10:00:00Z', '2027-03-01T10:00:00Z', 'OP-CTA-2025-88392'),
('cert-2', 'org-partner-apex', 'usr-apex-sales', 'Chloe Reynolds', 'cdef-sales', 'OmniPriv Certified Sales Professional', 'sales', 'valid', '2025-02-15T15:00:00Z', '2026-02-15T15:00:00Z', 'OP-CSP-2025-10492'),
('cert-3', 'org-partner-apex', 'usr-apex-owner', 'Marcus Vance', 'cdef-presales', 'OmniPriv Certified Presales Engineer', 'presales', 'valid', '2025-01-20T12:00:00Z', '2026-01-20T12:00:00Z', 'OP-CPE-2025-09214')
ON CONFLICT (id) DO NOTHING;

-- 5. Customer Partner Links Seed (Strictly Commercial Scopes)
INSERT INTO customer_partner_links (
    id, partner_org_id, customer_org_id, customer_org_name, relationship_type, status, scopes, approved_by, approved_at
) VALUES 
('link-1', 'org-partner-apex', 'cust-fintech-uk', 'Alpha Global Banking Group', 'resale', 'active', '["commercial_view", "renewal_view", "license_request"]'::jsonb, 'Elena Rostova', '2025-02-10T11:00:00Z'),
('link-2', 'org-partner-apex', 'cust-health-eu', 'Nordic Health Systems Ltd', 'managed_service', 'active', '["commercial_view", "renewal_view", "support_request"]'::jsonb, 'Elena Rostova', '2025-03-15T14:30:00Z'),
('link-3', 'org-partner-apex', 'cust-retail-de', 'Bavaria Logistics AG', 'resale', 'active', '["commercial_view", "license_request"]'::jsonb, 'Elena Rostova', '2025-05-20T09:00:00Z')
ON CONFLICT (id) DO NOTHING;

-- 6. Deal Registrations Seed
INSERT INTO deal_registrations (
    id, deal_code, partner_org_id, partner_org_name, customer_name, customer_domain, customer_country,
    opportunity_name, estimated_value_usd, estimated_close_date, target_products, estimated_seats, license_model,
    status, deal_protection_expiry, conflict_detected, created_by_user_id, created_by_user_name, created_at, updated_at
) VALUES 
(
    'deal-101', 'DR-2026-001', 'org-partner-apex', 'Apex Cyber Solutions Ltd', 'Kestrel Aerospace PLC', 'kestrelaero.co.uk', 'United Kingdom',
    'Privileged Session Vault Replacement (1200 Assets)', 185000.00, '2026-11-30', '["OmniPriv Enterprise PAM", "Zero Trust Gateway", "HSM KMS Connector"]'::jsonb,
    1200, 'Annual Subscription', 'approved', '2026-12-31T23:59:59Z', FALSE, 'usr-apex-sales', 'Chloe Reynolds', '2026-03-01T10:00:00Z', '2026-03-05T14:00:00Z'
),
(
    'deal-102', 'DR-2026-002', 'org-partner-apex', 'Apex Cyber Solutions Ltd', 'Vanguard Energy Networks', 'vanguardenergy.de', 'Germany',
    'OT Substation Bastion & Remote JIT Access', 340000.00, '2026-12-15', '["OmniPriv Industrial PAM", "Protocol Gateway", "SIEM Connector"]'::jsonb,
    3000, 'Annual Subscription', 'under_review', '2027-01-15T23:59:59Z', FALSE, 'usr-apex-owner', 'Marcus Vance', '2026-03-18T16:00:00Z', '2026-03-18T16:00:00Z'
)
ON CONFLICT (id) DO NOTHING;

-- 7. Partner Leads Seed
INSERT INTO partner_leads (
    id, partner_org_id, prospect_company, prospect_contact_name, prospect_contact_email, prospect_country,
    estimated_scope, assigned_at, sla_deadline, status, qualification_notes
) VALUES 
('lead-201', 'org-partner-apex', 'Meridian Maritime Corp', 'Sven Lindholm', 'sven.l@meridianmaritime.com', 'Norway', 'Fleet operations PAM requirement across 45 vessels. Approx 450 server endpoints.', '2026-03-24T08:00:00Z', '2026-03-26T08:00:00Z', 'assigned', 'Incoming inquiry via OmniPriv UK commercial desk.'),
('lead-202', 'org-partner-apex', 'Caledonian Financial Services', 'Fiona Campbell', 'fiona.c@caledonianfin.co.uk', 'United Kingdom', 'Compliance mandate (DORA) requiring session recording and MFA enforcement on database clusters.', '2026-03-20T10:00:00Z', '2026-03-22T10:00:00Z', 'working', 'Initial disco call conducted; customer scheduling technical deep-dive.')
ON CONFLICT (id) DO NOTHING;

-- 8. Renewal Opportunities Seed
INSERT INTO renewal_opportunities (
    id, partner_org_id, customer_partner_link_id, customer_org_name, product_name,
    annual_contract_value_usd, licensed_asset_capacity, renewal_date, status, assigned_owner
) VALUES 
('ren-301', 'org-partner-apex', 'link-1', 'Alpha Global Banking Group', 'OmniPriv Enterprise PAM (Subscription)', 140000.00, 850, '2026-11-15', 'upcoming', 'Chloe Reynolds'),
('ren-302', 'org-partner-apex', 'link-2', 'Nordic Health Systems Ltd', 'OmniPriv MSP Managed Core', 72000.00, 400, '2026-09-01', 'in_negotiation', 'Marcus Vance')
ON CONFLICT (id) DO NOTHING;

-- 9. Partner Resources Seed
INSERT INTO partner_resources (
    id, title, description, category, version, file_format, file_size_bytes, download_url, min_tier, locale
) VALUES 
('res-1', 'OmniPriv PAM vs Legacy JumpServer: Migration & Sizing Guide', 'Technical architecture brief covering clustering, MySQL-to-PostgreSQL data migration, and zero-trust proxy configuration.', 'deployment', 'v3.4', 'PDF', 4850000, '/assets/docs/OmniPriv-Architecture-Migration-v3.4.pdf', 'Silver', 'en-US'),
('res-2', 'DORA & NIS2 Compliance Mapping Matrix for Financial Partners', 'Commercial playbook mapping OmniPriv session recording and privileged credential rotation to EU regulatory mandates.', 'sales', 'v2.1', 'PDF', 2940000, '/assets/docs/OmniPriv-DORA-Compliance-Matrix.pdf', 'Registered', 'en-US'),
('res-3', 'Enterprise Commercial Pricing Calculator & Discount Thresholds', 'Internal financial tool for calculating tier margins, deal registration rebates, and multi-year commitment discounts.', 'sales', 'v2026.1', 'XLSX', 1250000, '/assets/docs/OmniPriv-Pricing-Calculator-2026.xlsx', 'Gold', 'en-US')
ON CONFLICT (id) DO NOTHING;

-- 10. Partner Courses Seed
INSERT INTO partner_courses (
    id, code, title, category, duration_hours, modules_count, target_role, linked_certification_id
) VALUES 
('course-1', 'TRN-OP-01', 'OmniPriv Core Architecture & High Availability Deployment', 'technical', 6.5, 8, 'Partner Engineer', 'cdef-tech'),
('course-2', 'TRN-OP-02', 'Winning Against Legacy PAM: Competitive Replacement Playbook', 'sales', 3.0, 4, 'Partner Sales', 'cdef-sales'),
('course-3', 'TRN-OP-03', 'Proof of Concept Delivery & Discovery Automation', 'presales', 4.5, 6, 'Partner Presales', 'cdef-presales')
ON CONFLICT (id) DO NOTHING;

-- 11. Partner Payout Profile Seed (Strict tokenization & masked representation)
INSERT INTO partner_payout_profiles (
    id, partner_org_id, account_holder_legal_name, bank_country, settlement_currency,
    routing_code_masked, account_number_masked, encrypted_token, status, version, dual_control_reveal_active
) VALUES 
(
    'pay-apex-1', 'org-partner-apex', 'Apex Cyber Solutions International Inc.', 'United Kingdom', 'GBP',
    '•••• 4022', '••••••••8192', 'vault:kms:enc:payout:apex:2025v1:sha256:d8a241e7', 'verified', 1, FALSE
)
ON CONFLICT (id) DO NOTHING;

-- 12. Partner Locator Profile Seed
INSERT INTO partner_locator_profiles (
    id, partner_org_id, display_name, headquarters, service_regions, specializations, certifications_summary,
    public_description, public_contact_email, public_website, is_active_listing, admin_approved
) VALUES 
(
    'loc-apex', 'org-partner-apex', 'Apex Cyber Solutions Ltd', 'London, United Kingdom',
    '["United Kingdom", "Western Europe", "Nordics"]'::jsonb,
    '["Zero Trust Architecture", "Financial Services PAM", "Cloud Infrastructure Security"]'::jsonb,
    '["OmniPriv Certified Technical Architect", "OmniPriv Certified Sales Professional"]'::jsonb,
    'Premier cybersecurity consultancy and MSSP delivering hardened privileged access management, sovereign cloud security, and compliance engineering across Europe.',
    'partners@apexcybersolutions.com', 'https://apexcybersolutions.com', TRUE, TRUE
)
ON CONFLICT (id) DO NOTHING;

COMMIT;
