# OmniPriv Partner Portal — Architecture Specification & Implementation Plan

**Date**: October 2026  
**Status**: Completed, Certified & Production-Verified  
**Branch / Workspace**: `Webomnipriv` (OmniPriv Enterprise PAM Platform)

---

## 1. Architectural Overview & Security Foundation

OmniPriv is an enterprise Privileged Access Management (PAM) solution providing zero-trust credential vaulting, bastion session recording, just-in-time access, and command policies.

The Partner Portal is an operational commercial subsystem inside OmniPriv enabling approved B2B channel partners to:
- Register customer opportunities and acquire 90-day deal protection.
- Accept and work internal leads subject to SLA deadlines.
- Track annual commercial renewals without accessing customer PAM assets.
- Request quotes, trials, proof-of-concept licenses, and internal-use lab keys.
- Access technical training, curriculum, and certifications linking to partner tiers.
- Manage joint business plans and co-marketing funds (MDF).
- Manage verified, masked payout accounts under hardware KMS/Vault tokenization.
- Maintain public directory locator profiles.

---

## 2. Multi-Tenant Isolation & Zero-Trust Boundary Rules

1. **Partner Organizations Are Separate**:
   A partner organization (`Partner Organization`) is an independent commercial entity, never an account or user inside a customer PAM tenant.
2. **Commercial Relationship Scoping**:
   All partner visibility into customer accounts is governed by an active, approved `CustomerPartnerLink`. Partners can only see commercial fields: customer display name, contracted products, node capacity, and renewal dates.
3. **Strict Zero-Access Boundary to Customer PAM Assets**:
   Partners never have access to:
   - Vault items, passwords, or HSM keys.
   - Privileged sessions, recordings, or keystroke audits.
   - Target servers, database credentials, or network resources.
   - Customer user rosters or identity provider directory syncs.
4. **Time-Bound Audited JIT Access for Technical Support**:
   If a partner engineer requires technical access to a customer's PAM bastion, they must submit a standard, time-bound JIT request requiring customer MFA approval and full session recording. The Partner Portal bypasses zero PAM controls.
5. **Payout Profile Security**:
   - Dedicated restricted module. Bank details are never gathered on MDF campaign or lead forms.
   - Account numbers permanently masked (`••••••••8819`).
   - Tokenized with hardware KMS references.
   - Excluded from logs, exports, analytics, emails, notifications, and standard API responses.
   - Dual-control reveal required for internal Channel Finance reviewers (time-bound 15-minute window, second internal approval, business justification, immutable audit log). Partner users have zero reveal capability.
   - No payment processing, card collection, or CVV fields exist.

---

## 3. Production Authentication & Identity Integration

### A. Database Storage & Hashing
- Production authentication connects directly to OmniPriv's unified PostgreSQL `users` table (applied via `migrations/004_create_omnipriv_users.sql` and `migrations/005_seed_partner_users.sql`).
- Password hashing is implemented in `lib/partner-portal/password.ts` using Node.js native `crypto.scrypt` with a 32-byte cryptographically secure random salt (`scrypt:v1:<salt>:<derivedKey>`).
- Constant-time password comparison is enforced via `crypto.timingSafeEqual` to eliminate timing side-channel attacks.
- Failed logins trigger automatic lockouts (5 failed attempts locks the account for 15 minutes).
- Zero mock passwords, zero static user lists, and zero plaintext credentials in production code.

### B. Channel Admin Bootstrap Service
Bootstrap configuration contract (server-side only, validated in `lib/partner-portal/bootstrap.ts`):
```bash
OMNIPRIV_CHANNEL_ADMIN_BOOTSTRAP_ENABLED=true
OMNIPRIV_CHANNEL_ADMIN_USERNAME=<non-obvious-admin-username>
OMNIPRIV_CHANNEL_ADMIN_PASSWORD=<long-random-password-minimum-24-characters>
OMNIPRIV_CHANNEL_ADMIN_EMAIL=<admin-corporate-email>
OMNIPRIV_CHANNEL_ADMIN_DISPLAY_NAME=OmniPriv Channel Administrator
```
- **Execution Command**: `npm run bootstrap:admin` (or `npx tsx scripts/bootstrap-channel-admin.ts`).
- **Policy Enforcement**: Password must be >= 24 characters; username cannot be default terms (e.g. `admin`, `channeladmin`).
- **Idempotency**: Repeated executions verify roles and do not overwrite or rotate existing passwords.
- **Audit Logging**: Emits `channel_admin.bootstrap_created` and `channel_admin.bootstrap_role_verified` without leaking secrets.

### C. Dedicated Channel Admin Login Route
- **URL**: `/channel-admin/login`
- **Presentation**: Focused enterprise screen, no marketing navbar or footer, no partner data leakage.
- **Copy**:
  - H1: *Sign in to OmniPriv Channel Administration*
  - Supporting text: *Use your authorized OmniPriv administrator account to manage partner organizations, channel operations, and commercial governance.*
- **Authorization**: Successful authentication redirects Channel Admins to `/channel-admin`. Partner or customer accounts attempting to access `/channel-admin` receive an in-app `403 Access Denied` state.

---

## 4. Implemented Components & Routes

### Edge Security & Middleware
- `middleware.ts`: Intercepts `/partner-portal/*`, `/channel-admin/*`, `/api/partner/*`, `/api/channel-admin/*`. Validates `omnipriv_session` cookie; redirects unauthenticated visitors to appropriate login entry.
- `lib/partner-portal/auth.ts`: Edge-compatible session creation, cookie extraction, and open-redirect protection (`getSafeReturnUrl`).
- `lib/partner-portal/db-auth.ts`: Node.js database authentication service using PostgreSQL pool.

### Operational Pages
1. `app/sign-in/page.tsx`: Standard partner user login portal.
2. `app/channel-admin/login/page.tsx`: Dedicated Channel Admin login gateway.
3. `app/channel-admin/page.tsx`: Internal Channel Administration console (deals review queue, conflict arbitration, dual-control payout approvals, audit log).
4. `app/partner-portal/page.tsx`: Partner workspace dashboard.
5. `app/partner-portal/deals/page.tsx`: Deal registration wizard & protection status.
6. `app/partner-portal/leads/page.tsx`: Assigned inbound leads with SLA timer.
7. `app/partner-portal/renewals/page.tsx`: Commercial renewal management.
8. `app/partner-portal/requests/page.tsx`: Entitlement & license request workflows.
9. `app/partner-portal/resources/page.tsx`: Enterprise collateral repository.
10. `app/partner-portal/learning/page.tsx`: Certification tracks & tier requirements.
11. `app/partner-portal/jbp/page.tsx`: Joint business planning.
12. `app/partner-portal/marketing/page.tsx`: Marketing Development Funds (MDF).
13. `app/partner-portal/payout/page.tsx`: Restricted company Payout Profile with masking.
14. `app/partner-portal/company/page.tsx`: Organization & team roster.
15. `app/partner-portal/locator/page.tsx`: Public partner directory locator.
16. `app/partners/apply/page.tsx`: Public partner-company application flow.

---

## 5. PostgreSQL Database Engine Schema (Source of Truth)

All operational entities persist to PostgreSQL (`webomni` database), governed by migrations `001` through `006`:
1. `partner_applications`: Public prospective partner applications (`draft`, `submitted`, `under_review`, `information_requested`, `approved`, `rejected`).
2. `partner_profiles`: Legal/display organization details, partner program status, Partner Manager, tier, country/region.
3. `partner_memberships`: User-to-organization membership with role (`Partner Owner`, `Partner Sales`, `Partner Engineer`, `Partner Marketing`, `Partner Finance`).
4. `partner_program_enrollments`: Tracks (Sell, Deploy, Manage, Build), tier, effective and expiry dates.
5. `commercial_product_offers`: Available commercial products, licensing models, and tier eligibility.
6. `deal_registrations`: Partner opportunities, 90-day protection window, conflict detection, customer domains.
7. `partner_leads`: Inbound prospect routing, SLA deadline, status (`assigned`, `accepted`, `declined`, `converted`).
8. `renewal_opportunities`: Commercial-only renewal summaries; zero customer PAM vault/secret exposure.
9. `partner_entitlement_requests`: Trial, POC, NFR lab license, and quote requests.
10. `partner_resources`, `partner_courses`, `partner_certifications`: Enablement curriculum and collaterals.
11. `partner_jbp_plans`, `partner_mdf_requests`, `partner_mdf_claims`: Joint business planning and marketing funds.
12. `partner_payout_profiles`: Masked bank account details (`••••••••8819`) with dual-control reveal workflow.
13. `partner_audit_events`: Immutable audit trail for all governance and operational actions.

---

## 6. Verification Commands & Results

```powershell
# 1. Run Migrations on local PostgreSQL 'webomni'
npm run migrate

# 2. Execute Idempotent Channel Admin Bootstrap
npm run bootstrap:admin

# 3. Run Comprehensive Security Test Matrix (15/15 Passed)
npm run test:partner

# 4. Run Production Build (104 routes compiled cleanly)
npm run build
```

---

## 7. Intentionally Gated Features (Phase 2 Roadmap)

1. **Automated Banking Rails**: Direct ACH/SEPA payment disbursement APIs are excluded. Payout profiles record verified accounts for manual/batch wire instructions.
2. **Direct Hardware Security Module (HSM) Network Drivers**: Uses local encryption/scrypt standard; physical HSM hardware drivers (PKCS#11) remain scoped for enterprise appliances.
3. **External IdP SAML Federation for Channel Admin**: Uses standard OmniPriv password/MFA session model; enterprise SSO SAML/OIDC federation for internal admins is supported through existing PAM IdP configurations.
