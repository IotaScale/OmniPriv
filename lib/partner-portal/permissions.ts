import { PartnerRole } from "./types";

export type ChannelCapability =
  | "channel.partner.read"
  | "channel.partner.manage"
  | "channel.program.review"
  | "channel.deal.create"
  | "channel.deal.read_own"
  | "channel.deal.review"
  | "channel.lead.read_assigned"
  | "channel.lead.assign"
  | "channel.renewal.read_linked"
  | "channel.entitlement.request"
  | "channel.entitlement.approve"
  | "channel.resource.read"
  | "channel.resource.manage"
  | "channel.learning.read"
  | "channel.learning.manage"
  | "channel.jbp.manage_own"
  | "channel.jbp.review"
  | "channel.mdf.manage_own"
  | "channel.mdf.review"
  | "channel.payout.manage_own"
  | "channel.payout.view_masked_own"
  | "channel.payout.review"
  | "channel.payout.view_full_with_dual_control"
  | "channel.locator.manage_own"
  | "channel.locator.publish"
  | "channel.audit.read";

export const ROLE_CAPABILITIES: Record<PartnerRole, ChannelCapability[]> = {
  "Channel Admin": [
    "channel.partner.read",
    "channel.partner.manage",
    "channel.program.review",
    "channel.deal.review",
    "channel.lead.assign",
    "channel.entitlement.approve",
    "channel.resource.manage",
    "channel.learning.manage",
    "channel.jbp.review",
    "channel.mdf.review",
    "channel.payout.review",
    "channel.payout.view_full_with_dual_control",
    "channel.locator.publish",
    "channel.audit.read",
  ],
  "Partner Manager": [
    "channel.partner.read",
    "channel.deal.review",
    "channel.lead.assign",
    "channel.jbp.review",
    "channel.mdf.review",
    "channel.resource.read",
    "channel.learning.read",
    "channel.audit.read",
  ],
  "Partner Owner": [
    "channel.partner.read",
    "channel.partner.manage",
    "channel.deal.create",
    "channel.deal.read_own",
    "channel.lead.read_assigned",
    "channel.renewal.read_linked",
    "channel.entitlement.request",
    "channel.resource.read",
    "channel.learning.read",
    "channel.jbp.manage_own",
    "channel.mdf.manage_own",
    "channel.payout.view_masked_own",
    "channel.locator.manage_own",
  ],
  "Partner Sales": [
    "channel.partner.read",
    "channel.deal.create",
    "channel.deal.read_own",
    "channel.lead.read_assigned",
    "channel.renewal.read_linked",
    "channel.entitlement.request",
    "channel.resource.read",
    "channel.learning.read",
  ],
  "Partner Engineer": [
    "channel.partner.read",
    "channel.renewal.read_linked",
    "channel.entitlement.request",
    "channel.resource.read",
    "channel.learning.read",
  ],
  "Partner Marketing": [
    "channel.partner.read",
    "channel.resource.read",
    "channel.learning.read",
    "channel.mdf.manage_own",
    "channel.locator.manage_own",
  ],
  "Partner Finance": [
    "channel.partner.read",
    "channel.renewal.read_linked",
    "channel.mdf.manage_own",
    "channel.payout.manage_own",
    "channel.payout.view_masked_own",
  ],
};

/** Checks if a role has the designated capability */
export function hasCapability(role: string, capability: string): boolean {
  const allowed = (ROLE_CAPABILITIES as Record<string, ChannelCapability[]>)[role] || [];
  return allowed.includes(capability as ChannelCapability);
}

/** Validates that a partner actor is scoped to their designated partner organization */
export function assertPartnerOrgScope(
  actorOrgId: string,
  targetOrgId: string,
  role: PartnerRole
): boolean {
  // Channel Admin and Partner Manager have internal cross-org purview
  if (role === "Channel Admin" || role === "Partner Manager") {
    return true;
  }
  return actorOrgId === targetOrgId;
}
