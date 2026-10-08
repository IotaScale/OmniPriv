import { PartnerAuditEvent } from "./types";

// In-memory audit events storage with immutable append-only semantics
const auditLog: PartnerAuditEvent[] = [
  {
    id: "aud-001",
    timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
    actor_user_id: "usr-admin-1",
    actor_name: "Sarah Chen",
    actor_role: "Channel Admin",
    actor_org_id: "org-omnipriv-internal",
    action: "channel.partner.activated",
    target_type: "PartnerProfile",
    target_id: "org-partner-apex",
    details: "Apex Cyber Solutions activated into Gold tier with Reseller & MSP scopes.",
    ip_address: "192.168.10.45",
  },
  {
    id: "aud-002",
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    actor_user_id: "usr-apex-1",
    actor_name: "Marcus Vance",
    actor_role: "Partner Owner",
    actor_org_id: "org-partner-apex",
    action: "channel.deal.submitted",
    target_type: "DealRegistration",
    target_id: "deal-reg-101",
    details: "Registered deal for Vanguard Financial Services (500 seats, Annual Subscription).",
    ip_address: "198.51.100.12",
  },
  {
    id: "aud-003",
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    actor_user_id: "usr-admin-1",
    actor_name: "Sarah Chen",
    actor_role: "Channel Admin",
    actor_org_id: "org-omnipriv-internal",
    action: "channel.deal.approved",
    target_type: "DealRegistration",
    target_id: "deal-reg-101",
    details: "Deal registration approved with 90-day deal protection lock.",
    ip_address: "192.168.10.45",
  },
];

export function logAuditEvent(event: Omit<PartnerAuditEvent, "id" | "timestamp">): PartnerAuditEvent {
  // Redact any potential credentials, account tokens, or PII leaks
  const cleanDetails = event.details
    .replace(/(password|secret|token|key|card|bank)[=:]\s*([^\s,]+)/gi, "$1=[REDACTED]");

  const fullEvent: PartnerAuditEvent = {
    ...event,
    details: cleanDetails,
    ip_address: event.ip_address || "127.0.0.1",
    id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    timestamp: new Date().toISOString(),
  };

  auditLog.unshift(fullEvent);
  return fullEvent;
}

export function getAuditEvents(actorOrgIdOrLimit?: string | number, isChannelAdmin?: boolean, limit?: number): PartnerAuditEvent[] {
  let orgId: string | undefined;
  let max = limit;

  if (typeof actorOrgIdOrLimit === "number") {
    max = actorOrgIdOrLimit;
    orgId = undefined;
  } else {
    orgId = actorOrgIdOrLimit;
  }

  let results: PartnerAuditEvent[];
  if (isChannelAdmin || !orgId) {
    results = [...auditLog];
  } else {
    results = auditLog.filter((e) => e.actor_org_id === orgId);
  }

  if (typeof max === "number" && max > 0) {
    return results.slice(0, max);
  }
  return results;
}
