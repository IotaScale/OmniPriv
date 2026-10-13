-- OmniPriv Migration 008: approve every partner locator listing
-- Partner directory listings are auto-approved for now (see
-- updatePartnerLocatorProfile in lib/partner-portal/db-service.ts). This
-- approves listings that were already waiting for review.

UPDATE partner_locator_profiles
SET admin_approved = TRUE, updated_at = NOW()
WHERE admin_approved = FALSE;
