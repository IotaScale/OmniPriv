-- OmniPriv Migration 005: Seed Real Partner Users in Standard Users Table
-- Users are linked to approved Partner Profiles with salted scrypt hashes

BEGIN;

INSERT INTO users (
    id, username, email, password_hash, display_name, system_role, org_id, org_name,
    partner_membership_status, program_status, is_active, is_mfa_enabled
) VALUES 
(
    'usr-apex-owner',
    'marcus_vance',
    'marcus.vance@apexcybersolutions.com',
    'scrypt:v1:71504eb59ee162d8865e6940b77d2d08:c662c45b3905b401f8c932578a47d3f9e4816eaa4af6009c974e5062d915dab300086a6cf17c4bee663596aa7a7d7f247cae50f13a94207b9771a8ee38cf838f',
    'Marcus Vance',
    'Partner Owner',
    'org-partner-apex',
    'Apex Cyber Solutions Ltd',
    'active',
    'active',
    TRUE,
    TRUE
),
(
    'usr-apex-sales',
    'chloe_reynolds',
    'chloe.r@apexcybersolutions.com',
    'scrypt:v1:71504eb59ee162d8865e6940b77d2d08:c662c45b3905b401f8c932578a47d3f9e4816eaa4af6009c974e5062d915dab300086a6cf17c4bee663596aa7a7d7f247cae50f13a94207b9771a8ee38cf838f',
    'Chloe Reynolds',
    'Partner Sales',
    'org-partner-apex',
    'Apex Cyber Solutions Ltd',
    'active',
    'active',
    TRUE,
    FALSE
),
(
    'usr-apex-fin',
    'julian_barnes',
    'finance@apexcybersolutions.com',
    'scrypt:v1:71504eb59ee162d8865e6940b77d2d08:c662c45b3905b401f8c932578a47d3f9e4816eaa4af6009c974e5062d915dab300086a6cf17c4bee663596aa7a7d7f247cae50f13a94207b9771a8ee38cf838f',
    'Julian Barnes',
    'Partner Finance',
    'org-partner-apex',
    'Apex Cyber Solutions Ltd',
    'active',
    'active',
    TRUE,
    FALSE
)
ON CONFLICT (username) DO NOTHING;

COMMIT;
