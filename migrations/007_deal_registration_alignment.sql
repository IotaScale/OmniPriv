-- OmniPriv Partner Portal Migration 007: Deal Registration & Kaspersky Model Alignment
BEGIN;

-- 1. Ensure deal_protection_expiry is nullable and add protection_expires_at
ALTER TABLE deal_registrations ALTER COLUMN deal_protection_expiry DROP NOT NULL;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'deal_registrations' AND column_name = 'protection_expires_at'
  ) THEN
    ALTER TABLE deal_registrations ADD COLUMN protection_expires_at TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'deal_registrations' AND column_name = 'customer_industry'
  ) THEN
    ALTER TABLE deal_registrations ADD COLUMN customer_industry VARCHAR(100);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'deal_registrations' AND column_name = 'customer_contact_name'
  ) THEN
    ALTER TABLE deal_registrations ADD COLUMN customer_contact_name VARCHAR(255);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'deal_registrations' AND column_name = 'customer_contact_email'
  ) THEN
    ALTER TABLE deal_registrations ADD COLUMN customer_contact_email VARCHAR(255);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'deal_registrations' AND column_name = 'customer_contact_phone'
  ) THEN
    ALTER TABLE deal_registrations ADD COLUMN customer_contact_phone VARCHAR(50);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'deal_registrations' AND column_name = 'deployment_timeline'
  ) THEN
    ALTER TABLE deal_registrations ADD COLUMN deployment_timeline VARCHAR(100);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'deal_registrations' AND column_name = 'opportunity_source'
  ) THEN
    ALTER TABLE deal_registrations ADD COLUMN opportunity_source VARCHAR(100);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'deal_registrations' AND column_name = 'partner_notes'
  ) THEN
    ALTER TABLE deal_registrations ADD COLUMN partner_notes TEXT;
  END IF;
END $$;

-- 2. Update status constraint to include awaiting_approval
ALTER TABLE deal_registrations DROP CONSTRAINT IF EXISTS deal_registrations_status_check;
ALTER TABLE deal_registrations ADD CONSTRAINT deal_registrations_status_check 
  CHECK (status IN ('draft', 'submitted', 'under_review', 'awaiting_approval', 'approved', 'declined', 'expired', 'closed_won', 'closed_lost'));

-- 3. Create or replace compatibility view for partner_organizations
CREATE OR REPLACE VIEW partner_organizations AS 
SELECT 
  partner_org_id AS id,
  company_name,
  legal_name,
  website,
  country,
  region,
  current_tier AS tier,
  program_status AS status,
  primary_partner_manager_name AS partner_manager_name,
  created_at,
  updated_at
FROM partner_profiles;

COMMIT;
