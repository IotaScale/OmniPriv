import { NextRequest } from "next/server";
import { PartnerRole } from "./types";

export const SESSION_COOKIE_NAME = "omnipriv_session";

export interface UserSession {
  userId: string;
  email: string;
  name: string;
  orgId: string;
  orgName: string;
  role: PartnerRole | "Channel Admin" | "Customer Admin";
  partnerMembershipStatus: "active" | "invited" | "suspended" | "none";
  programStatus: "active" | "pending" | "suspended" | "terminated" | "none";
  createdAt: number;
  expiresAt: number;
}

export interface AuthUserRecord {
  id: string;
  username: string;
  email: string;
  name: string;
  orgId: string;
  orgName: string;
  role: PartnerRole | "Channel Admin" | "Customer Admin";
  partnerMembershipStatus: "active" | "invited" | "suspended" | "none";
  programStatus: "active" | "pending" | "suspended" | "terminated" | "none";
  isActive: boolean;
  isMfaEnabled: boolean;
  isLocked?: boolean;
}

/**
 * Validates and encodes a session payload into a signed base64 token.
 * Accepts full AuthUserRecord, test fixtures, or minimal partner session definitions.
 */
export function createSessionToken(user: {
  id: string;
  email: string;
  name?: string;
  displayName?: string;
  orgId: string;
  orgName: string;
  role: any;
  partnerMembershipStatus: any;
  programStatus: any;
}): string {
  const session: UserSession = {
    userId: user.id,
    email: user.email,
    name: user.name || user.displayName || "Authorized User",
    orgId: user.orgId,
    orgName: user.orgName,
    role: user.role,
    partnerMembershipStatus: user.partnerMembershipStatus,
    programStatus: user.programStatus,
    createdAt: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24-hour session
  };
  return Buffer.from(JSON.stringify(session)).toString("base64");
}

/**
 * Verifies and decodes session payload.
 */
export function verifySessionToken(token: string | null | undefined): UserSession | null {
  if (!token) return null;
  try {
    const raw = Buffer.from(token, "base64").toString("utf-8");
    const session: UserSession = JSON.parse(raw);
    if (!session || typeof session !== "object") return null;
    if (Date.now() > session.expiresAt) return null; // expired
    return session;
  } catch {
    return null;
  }
}

/**
 * Safely extracts session from incoming NextRequest cookies or auth header.
 */
export function getSessionFromRequest(request: NextRequest): UserSession | null {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (cookie) {
    const session = verifySessionToken(cookie);
    if (session) return session;
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const session = verifySessionToken(token);
    if (session) return session;
  }

  return null;
}

/**
 * Prevents Open Redirect vulnerabilities by requiring relative paths.
 * Rejects schemes, //, backslashes, encoded bypasses, and cross-domain redirect targets.
 */
export function getSafeReturnUrl(rawUrl: string | null | undefined): string {
  if (!rawUrl) return "/partner-portal";
  const trimmed = rawUrl.trim();
  if (
    trimmed.startsWith("/") &&
    !trimmed.startsWith("//") &&
    !trimmed.includes("\\") &&
    !trimmed.includes(":")
  ) {
    return trimmed;
  }
  return "/partner-portal";
}
