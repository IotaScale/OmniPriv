-- OmniPriv Migration 004: Standard OmniPriv Users Table
-- Unified enterprise identity store with scrypt password hashing, lockout, and RBAC

BEGIN;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    username VARCHAR(128) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    system_role VARCHAR(64) NOT NULL DEFAULT 'User', -- 'Channel Admin', 'Partner User', 'Customer User'
    org_id VARCHAR(64) NOT NULL,
    org_name VARCHAR(255) NOT NULL,
    partner_membership_status VARCHAR(32) NOT NULL DEFAULT 'none' CHECK (partner_membership_status IN ('active', 'invited', 'suspended', 'none')),
    program_status VARCHAR(32) NOT NULL DEFAULT 'none' CHECK (program_status IN ('active', 'pending', 'suspended', 'terminated', 'none')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    failed_login_attempts INT NOT NULL DEFAULT 0,
    locked_until TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(LOWER(username));
CREATE INDEX IF NOT EXISTS idx_users_email ON users(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_users_system_role ON users(system_role);
CREATE INDEX IF NOT EXISTS idx_users_org ON users(org_id);

COMMIT;
