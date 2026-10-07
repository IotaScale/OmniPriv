/**
 * =========================================================================
 * DEVELOPMENT AND TEST FIXTURES ONLY
 * =========================================================================
 * 
 * WARNING: These fixtures are strictly for automated unit and integration tests
 * (e.g., scripts/test-partner-portal.ts). They are strictly prohibited from
 * being loaded or evaluated in the production authentication path (/api/auth/sign-in).
 */

import { PartnerRole } from "./types";

export interface TestUserFixture {
  id: string;
  username: string;
  email: string;
  displayName: string;
  orgId: string;
  orgName: string;
  role: PartnerRole | "Customer Admin";
  partnerMembershipStatus: "active" | "invited" | "suspended" | "none";
  programStatus: "active" | "pending" | "suspended" | "terminated" | "none";
}

export const TEST_USER_FIXTURES: TestUserFixture[] = [
  {
    id: "usr-test-apex-owner",
    username: "marcus_vance",
    email: "marcus.vance@apexcybersolutions.com",
    displayName: "Marcus Vance",
    orgId: "org-partner-apex",
    orgName: "Apex Cyber Solutions Ltd",
    role: "Partner Owner",
    partnerMembershipStatus: "active",
    programStatus: "active",
  },
  {
    id: "usr-test-apex-sales",
    username: "chloe_reynolds",
    email: "chloe.r@apexcybersolutions.com",
    displayName: "Chloe Reynolds",
    orgId: "org-partner-apex",
    orgName: "Apex Cyber Solutions Ltd",
    role: "Partner Sales",
    partnerMembershipStatus: "active",
    programStatus: "active",
  },
  {
    id: "usr-test-apex-fin",
    username: "julian_barnes",
    email: "finance@apexcybersolutions.com",
    displayName: "Julian Barnes",
    orgId: "org-partner-apex",
    orgName: "Apex Cyber Solutions Ltd",
    role: "Partner Finance",
    partnerMembershipStatus: "active",
    programStatus: "active",
  },
  {
    id: "usr-test-apex-eng",
    username: "tariq_mansoor",
    email: "tariq.m@apexcybersolutions.com",
    displayName: "Tariq Mansoor",
    orgId: "org-partner-apex",
    orgName: "Apex Cyber Solutions Ltd",
    role: "Partner Engineer",
    partnerMembershipStatus: "active",
    programStatus: "active",
  },
  {
    id: "usr-test-cust-vanguard",
    username: "robert_hastings",
    email: "customer.admin@vanguard.com",
    displayName: "Robert Hastings",
    orgId: "org-cust-vanguard",
    orgName: "Vanguard Global Capital",
    role: "Customer Admin",
    partnerMembershipStatus: "none",
    programStatus: "none",
  },
  {
    id: "usr-test-nordic-pending",
    username: "aino_korhonen",
    email: "pending@nordicshield.fi",
    displayName: "Aino Korhonen",
    orgId: "org-partner-nordic",
    orgName: "Nordic Shield IT",
    role: "Partner Owner",
    partnerMembershipStatus: "active",
    programStatus: "pending",
  },
  {
    id: "usr-test-suspended",
    username: "alex_karr",
    email: "suspended@badactor.io",
    displayName: "Alex Karr",
    orgId: "org-partner-suspended",
    orgName: "Suspended Cyber Org",
    role: "Partner Owner",
    partnerMembershipStatus: "suspended",
    programStatus: "suspended",
  },
];
