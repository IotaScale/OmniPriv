# OmniPriv Partner Portal — API Specification

All Channel Partner endpoints follow the standard OmniPriv RESTful API format, require appropriate session headers, and enforce role-based capabilities and tenant isolation boundaries.

## Base Paths
- Authentication API: `/api/auth`
- Partner Portal API: `/api/partner`
- Internal Channel Admin API: `/api/channel-admin`
- Public Partner Locator API: `/api/public/locator`

---

## Security Headers & Authorization
- `x-omnipriv-org-id`: The active Organization ID.
- `x-omnipriv-user-role`: The authenticated user's role (`Channel Admin`, `Partner Manager`, `Partner Owner`, `Partner Sales`, `Partner Engineer`, `Partner Marketing`, `Partner Finance`).
- Dual Authorization:
  1. **Feature Gate**: Module must be active in license flags (`deals`, `leads`, `renewals`, `trial_requests`, `learning`, `locator`, `marketing_funds`, `payout_profile`).
  2. **RBAC Capability**: Evaluated on server-side query and response projection.

---

## Detailed Endpoints

### 0. Authentication & Session Security
- `POST /api/auth/sign-in`
  - **Request Body**: `{ email?, username?, password, returnUrl?, loginType?: 'partner' | 'channel_admin' }`
  - **Behavior**: Validates credentials against PostgreSQL `users` table using salted `scrypt` hashing with constant-time verification. Enforces account lockout (5 failed attempts locks for 15 minutes). Sets HttpOnly `omnipriv_session` cookie (24h).
  - **Responses**:
    - `200 OK`: Sets cookie and returns `{ success: true, user: { id, email, name, orgId, orgName, role }, returnUrl }`.
    - `401 Unauthorized`: Invalid credentials (generic error to prevent account enumeration).
    - `403 Forbidden`: Account role lacks authorization for the requested gateway (e.g. partner user attempting Channel Admin login).
    - `423 Locked`: Account locked out due to consecutive failed attempts.
- `POST /api/auth/admin-login`
  - **Behavior**: Proxy endpoint delegating to `/api/auth/sign-in` with `loginType: 'channel_admin'`.
- `POST /api/auth/sign-out`
  - **Behavior**: Clears `omnipriv_session` cookie and records logout audit event.
- `GET /api/auth/session`
  - **Response**: `{ user, profile, tierCalculation, capabilities, featureFlags }`
  - **Behavior**: Introspects currently authenticated session from HttpOnly cookie or Bearer token.

### 1. Partner Profile & Session
- `GET /api/partner/session`
  - **Capabilities**: None (session introspection)
  - **Response**: `{ user, profile, tierCalculation, capabilities, featureFlags }`

### 2. Deal Registration
- `GET /api/partner/deals`
  - **Query Params**: `status`, `query`
  - **Permission**: `channel.deal.read_own` or `channel.deal.review`
  - **Response**: `{ deals: DealRegistration[], total: number }`
  - **Isolation**: Filtered strictly to `partner_org_id`.
- `POST /api/partner/deals`
  - **Permission**: `channel.deal.create`
  - **Request Body**: `{ customer_name, customer_domain, customer_country, opportunity_name, estimated_value_usd, estimated_close_date, estimated_seats, license_model, target_products }`
  - **Behavior**: Evaluates conflict against active registered deals. Emits `channel.deal.submitted`. Sets 90-day deal protection lock.

### 3. Channel Admin Deal Review
- `GET /api/channel-admin/deals`
  - **Permission**: `channel.deal.review`
  - **Response**: List of all partner deals across organizations with conflict flags.
- `POST /api/channel-admin/deals`
  - **Permission**: `channel.deal.review`
  - **Request Body**: `{ dealId, decision: 'approve' | 'decline', reviewNotes }`
  - **Audit Event**: Emits `channel.deal.approved` or `channel.deal.declined`.

### 4. Partner Leads
- `GET /api/partner/leads`
  - **Permission**: `channel.lead.read_assigned`
  - **Response**: `{ leads: PartnerLead[], total: number }`
- `POST /api/partner/leads`
  - **Request Body**: `{ leadId, action: 'accept' | 'decline' | 'convert', reason? }`
  - **Behavior**: Enforces SLA timer. Emits `channel.lead.accepted`, `channel.lead.declined`, or converts lead to a DealRegistration.

### 5. Renewals
- `GET /api/partner/renewals`
  - **Permission**: `channel.renewal.read_linked`
  - **Response**: `{ renewals: RenewalOpportunity[], commercialSummaries: CommercialCustomerSummary[], total: number }`
  - **Strict Security Boundary**: Projects only commercial summaries. ZERO PAM asset passwords, vault keys, or session recordings.
- `POST /api/partner/renewals`
  - **Request Body**: `{ renewalId, requestedAdjustment? }`
  - **Audit Event**: `channel.renewal.viewed`.

### 6. Entitlement & Trial Requests
- `GET /api/partner/requests`
  - **Response**: `{ requests: PartnerEntitlementRequest[], total: number }`
- `POST /api/partner/requests`
  - **Permission**: `channel.entitlement.request`
  - **Request Body**: `{ request_type: 'poc' | 'trial' | 'nfr' | 'quote' | 'subscription', product_edition, duration_days, target_customer_name?, requested_seats, justification }`
  - **Audit Event**: `channel.entitlement.requested`.

### 7. Enablement Resources
- `GET /api/partner/resources`
  - **Query Params**: `category` (`deployment`, `sales`, `legal`, `marketing`)
  - **Permission**: `channel.resource.read`
  - **Response**: `{ resources: PartnerResource[], total: number }`

### 8. Learning & Certifications
- `GET /api/partner/learning`
  - **Permission**: `channel.learning.read`
  - **Response**: `{ courses, certifications, certificationDefinitions, tierProgress }`
- `POST /api/partner/learning`
  - **Request Body**: `{ courseId, action: 'enroll' | 'complete' }`
  - **Behavior**: Issues verified certification badge and recalculates partner tier.

### 9. Joint Business Plans (JBP)
- `GET /api/partner/jbp`
  - **Response**: `{ jbps: JointBusinessPlan[], total: number }`
- `POST /api/partner/jbp`
  - **Permission**: `channel.jbp.manage_own`
  - **Request Body**: `{ fiscal_year, revenue_target_usd, dedicated_sales_headcount, dedicated_technical_headcount, target_industries, key_initiatives, requested_omnipriv_support }`
  - **Audit Event**: `channel.jbp.submitted`.

### 10. Marketing Development Funds (MDF)
- `GET /api/partner/mdf`
  - **Response**: `{ mdfs: MarketingFundActivity[], total: number }`
- `POST /api/partner/mdf`
  - **Permission**: `channel.mdf.manage_own`
  - **Actions**:
    - New Proposal: `{ activity_name, activity_type, start_date, end_date, total_budget_usd, requested_mdf_amount_usd, expected_leads_count }`
    - Submit Claim: `{ action: 'claim', activityId, claim_amount_usd, evidence_summary }`
  - **Security Rule**: Excludes raw bank/payment fields. Disbursed exclusively through verified Payout Profile.

### 11. Dedicated Restricted Payout Profile
- `GET /api/partner/payout`
  - **Permission**: `channel.payout.view_masked_own`
  - **Response**: Masked values only (`••••••••8819`, `•••• 4012`).
- `POST /api/partner/payout`
  - **Permission**: `channel.payout.manage_own`
  - **Request Body**: `{ account_holder_legal_name, bank_country, settlement_currency, routing_code, account_number, supporting_doc_reference? }`
  - **Behavior**: Immediately encrypts into KMS vault token, masks values, and submits for Channel Finance audit.
- `GET /api/channel-admin/payout`
  - **Permission**: `channel.payout.review`
  - **Response**: Masked table of all partner payout submissions.
- `POST /api/channel-admin/payout`
  - **Actions**:
    - Verify: `{ payoutId, action: 'verify' }`
    - Request Changes: `{ payoutId, action: 'request_changes', reason }`
    - Dual-Control Reveal: `{ payoutId, action: 'dual_control_reveal', reason, approverId }`
      - Requires `channel.payout.view_full_with_dual_control`.
      - Activates 15-minute time-bound reveal window and writes immutable audit record.

### 12. Public Partner Company Applications
- `POST /api/public/partner-applications`
  - **Request Body**: `{ company_name, legal_name, website, country, region, primary_contact_name, primary_contact_email, primary_contact_phone, primary_contact_role, company_type, program_tracks, intended_vertical, partnership_scope, experience_summary, notes }`
  - **Behavior**: Persists record into `partner_applications` with status `'submitted'`. Generates application number (`APP-2026-XXXX`). Emits audit event. Grants zero initial portal access.
- `GET /api/public/partner-applications`
  - **Query Params**: `applicationNumber`, `email`
  - **Behavior**: Returns applicant's own status without revealing internal channel admin data.

### 13. Channel Admin Application Management & Provisioning
- `GET /api/channel-admin/applications`
  - **Permission**: `channel.admin.access`
  - **Response**: List of all partner applications across states (`submitted`, `under_review`, `information_requested`, `approved`, `rejected`).
- `POST /api/channel-admin/applications`
  - **Permission**: `channel.admin.access`
  - **Action 'review'**: Update status (`under_review`, `information_requested`, `rejected`) with notes.
  - **Action 'approve'**: Provisions Partner Organization (`partner_profiles`), enrollment (`partner_program_enrollments`), user account (`users`), membership (`partner_memberships`), and marks application `'approved'`.

### 14. Channel Admin Overview & Lead Routing
- `GET /api/channel-admin/overview`
  - **Permission**: `channel.admin.access`
  - **Response**: Live counts: `{ applicationsTotal, applicationsPending, partnersTotal, dealsReviewCount, leadsPendingRouting, renewalsDue, totalPipelineUsd }`.
- `GET /api/channel-admin/leads`
  - **Permission**: `channel.admin.access`
  - **Response**: List of inbound channel leads awaiting assignment or in SLA status.
- `POST /api/channel-admin/leads`
  - **Permission**: `channel.admin.access`
  - **Request Body**: `{ leadId, partnerOrgId, partnerOrgName }`
  - **Behavior**: Assigns lead to partner organization, initializes 7-day SLA window, emits audit event.

### 15. Partner Locator Profile
- `GET /api/partner/locator`: Retrieve current partner's listing.
- `PUT /api/partner/locator`: Update listing (pending re-approval).
- `GET /api/public/locator`: Public directory of approved partner listings with search and filter.

### 16. Channel Audit Activity
- `GET /api/channel-admin/audit`
  - **Permission**: `channel.audit.read`
  - **Response**: `{ events: PartnerAuditEvent[], total: number }`
  - **Redaction**: Automatically redacts tokens, passwords, and sensitive keys.

