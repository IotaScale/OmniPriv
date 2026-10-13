"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

/*
 * Breadcrumb trail for interior pages, rendered by PageHero above the title,
 * with schema.org BreadcrumbList data for search results.
 *
 * Labels for multi-segment routes live here. When a page is added under
 * /platform or /solutions, add its label; an unknown segment falls back to a
 * title-cased version of the slug.
 */

const LABELS: Record<string, string> = {
    "/platform": "Platform",
    "/platform/secure-ai-agents": "Secure AI Agents",
    "/platform/infrastructure-deployment": "Infrastructure & Deployment",
    "/platform/password-credential-management": "Credential Management",
    "/platform/application-security": "Application Security",
    "/platform/enterprise-integration": "Enterprise Integration",
    "/platform/secure-remote-access": "Secure Remote Access",
    "/platform/workflow-access-control": "Workflow & Access Control",
    "/platform/ai-threat-protection": "AI Threat Protection",
    "/platform/identity-security": "Identity Security",
    "/platform/consolidation": "Consolidation",
    "/privileged-access-audit-compliance": "Audit & Compliance",
    "/solutions": "Solutions",
    "/solutions/ai-agent-security": "AI Agent Security",
    "/solutions/human-identity-security": "Human Identity Security",
    "/solutions/machine-identity-security": "Machine Identity Security",
    "/solutions/ai-pam-solutions": "AI PAM Solutions",
    "/ai-pam": "AI-PAM Engine",
    "/features": "Features",
    "/integrations": "Integrations",
    "/enterprise": "Enterprise",
    "/security": "Security Center",
    "/about": "About",
    "/blog": "Blog",
    "/case-studies": "Case Studies",
    "/docs": "Documentation",
    "/demo": "Request a Demo",
    "/partners": "Partners",
    "/partners/apply": "Apply",
};

/* Pages that sit at the top level but belong under a section in the menus. */
const PARENT: Record<string, string> = {
    "/privileged-access-audit-compliance": "/platform",
};

/* Segments with no page of their own: shown as text, not a link. */
const NO_PAGE = new Set(["/solutions"]);

const titleCase = (s: string) => s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

export default function Breadcrumbs() {
    const path = (usePathname() || "/").replace(/\/+$/, "") || "/";
    if (path === "/") return null;

    const parts = path.split("/").filter(Boolean);
    const trail: string[] = [];
    if (PARENT[path]) trail.push(PARENT[path]);
    parts.forEach((_, i) => trail.push("/" + parts.slice(0, i + 1).join("/")));

    const crumbs = [{ href: "/", label: "Home" }, ...trail.map((href) => ({ href, label: LABELS[href] ?? titleCase(href.split("/").pop() || "") }))];

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs
            .filter((c) => !NO_PAGE.has(c.href))
            .map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `https://omnipriv.com${c.href === "/" ? "" : c.href}` })),
    };

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-slate-500 dark:text-slate-400">
                {crumbs.map((c, i) => {
                    const last = i === crumbs.length - 1;
                    return (
                        <li key={c.href} className="inline-flex items-center gap-1.5">
                            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />}
                            {last ? (
                                <span aria-current="page" className="font-medium text-[#00667A] dark:text-[#7FE3F2]">
                                    {c.label}
                                </span>
                            ) : NO_PAGE.has(c.href) ? (
                                <span>{c.label}</span>
                            ) : (
                                <Link href={c.href} className="hover:text-[#0a1628] dark:hover:text-white transition-colors">
                                    {c.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
