-- OmniPriv Partner Portal Migration 003: Seed Privileged Portal Admin User
-- Hardened internal administration credentials for Channel Operations

BEGIN;

CREATE TABLE IF NOT EXISTS portal_admin_users (
    id VARCHAR(64) PRIMARY KEY,
    username VARCHAR(128) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(64) NOT NULL DEFAULT 'Channel Admin',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_portal_admin_users_username ON portal_admin_users(username);
CREATE INDEX IF NOT EXISTS idx_portal_admin_users_email ON portal_admin_users(email);

-- Insert or update the initial privileged Channel Admin
INSERT INTO portal_admin_users (
    id, username, email, password_hash, name, role, is_active
) VALUES (
    'usr-admin-secops',
    'omnipriv_secops_adm_99x',
    'secops-admin@omnipriv.internal',
    'K8!vP#9m-L2xQz@7Fw4&Yd^E1',
    'OmniPriv SecOps Channel Administrator',
    'Channel Admin',
    TRUE
)
ON CONFLICT (username) DO UPDATE 
SET password_hash = EXCLUDED.password_hash,
    email = EXCLUDED.email,
    updated_at = NOW();

COMMIT;
