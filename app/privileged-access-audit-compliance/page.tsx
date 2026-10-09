import type { Metadata } from "next";

import AuditCompliancePage from "@/components/solutions/AuditCompliancePage";
import { getSolutionBySlug } from "@/app/platform/data";

/*
 * Audit, Governance & Compliance, at its SEO URL.
 *
 * The page body is components/solutions/AuditCompliancePage.tsx; the meta
 * title and description stay with the "audit-compliance" module entry in
 * app/platform/data.ts so every listing of the module reads from one place.
 * The previous URL, /platform/audit-compliance, redirects here permanently
 * (next.config.js).
 */
const solution = getSolutionBySlug("audit-compliance");

export const metadata: Metadata = {
    // metaTitle already carries the brand, so it bypasses the "%s | OmniPriv" template.
    title: { absolute: solution?.metaTitle ?? "Privileged Access Audit & Compliance | OmniPriv" },
    description: solution?.metaDescription,
    alternates: { canonical: "/privileged-access-audit-compliance" },
};

export default function PrivilegedAccessAuditCompliancePage() {
    return <AuditCompliancePage />;
}
