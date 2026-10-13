import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Code, Cpu, Database, FileText, Globe, Lock, Mail, Network, Settings, Terminal, Users } from "lucide-react";

import Spotlight from "@/components/aipam/Spotlight";
import { DocsBrowser, DocsHero, type DocSection } from "@/components/docs/DocsBrowser";
import { SUPPORT, ask } from "@/components/docs/support";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, Heading, KeepReading, PageHero, mutedBand, sectionLine } from "@/components/pageui/blocks";
import { cn } from "@/lib/utils";

/*
 * Documentation index.
 *
 * None of the guide destinations exist yet (app/docs/ contains only this
 * page), so no /docs/<section>/<article> URL is linked: each would 404. Guides
 * are shown with a "coming soon" status and a pre-addressed email to support,
 * which is the real way to get that answer today. The `href` values are kept
 * as the intended route map; once a section is built, link to it and drop the
 * status chip. Built from the shared page kit (components/pageui).
 */
export const metadata: Metadata = {
    title: { absolute: "Documentation | OmniPriv PAM Guides & API Reference" },
    description: "Installation, administration, security, API and deployment guides for the OmniPriv privileged access management platform.",
};

const docCategories: DocSection[] = [
  {
    title: "Quick Start",
    description: "Get OmniPriv running in your environment in under 30 minutes.",
    articles: [
      { title: "System Requirements & Prerequisites", href: "/docs/quick-start/requirements" },
      { title: "Single-Node Installation Guide", href: "/docs/quick-start/install" },
      { title: "Initial Configuration & Setup", href: "/docs/quick-start/config" },
      { title: "Connecting Your First Asset", href: "/docs/quick-start/first-asset" },
      { title: "Creating Users and Roles", href: "/docs/quick-start/users-roles" },
    ],
  },
  {
    title: "Administration",
    description: "Configure and manage every aspect of your OmniPriv deployment.",
    articles: [
      { title: "Asset Management & Discovery", href: "/docs/admin/assets" },
      { title: "User & Group Management", href: "/docs/admin/users" },
      { title: "RBAC Roles & Permissions", href: "/docs/admin/rbac" },
      { title: "Authentication Providers (LDAP, SSO)", href: "/docs/admin/auth" },
      { title: "Credential Vault Configuration", href: "/docs/admin/vault" },
    ],
  },
  {
    title: "Security & Compliance",
    description: "Configure security policies, audit settings, and compliance controls.",
    articles: [
      { title: "MFA Configuration", href: "/docs/security/mfa" },
      { title: "Session Recording Settings", href: "/docs/security/recording" },
      { title: "ACL & Command Filtering", href: "/docs/security/acls" },
      { title: "Compliance Report Templates", href: "/docs/security/compliance" },
      { title: "Audit Log Management", href: "/docs/security/audit-logs" },
    ],
  },
  {
    title: "API Reference",
    description: "REST and GraphQL APIs for integrating OmniPriv into your workflows.",
    articles: [
      { title: "Authentication & API Keys", href: "/docs/api/auth" },
      { title: "Assets API", href: "/docs/api/assets" },
      { title: "Users & Permissions API", href: "/docs/api/users" },
      { title: "Sessions API", href: "/docs/api/sessions" },
      { title: "Audit & Reports API", href: "/docs/api/audit" },
    ],
  },
  {
    title: "Integrations",
    description: "Connect OmniPriv with your existing security and DevOps toolchain.",
    articles: [
      { title: "Active Directory & LDAP", href: "/docs/integrations/ldap" },
      { title: "Okta / Azure AD (SSO)", href: "/docs/integrations/sso" },
      { title: "Splunk & SIEM Integration", href: "/docs/integrations/splunk" },
      { title: "ServiceNow Ticketing", href: "/docs/integrations/servicenow" },
      { title: "Terraform Provider", href: "/docs/integrations/terraform" },
    ],
  },
  {
    title: "Deployment",
    description: "Deployment guides for every topology, from single node to global HA cluster.",
    articles: [
      { title: "High-Availability Cluster Setup", href: "/docs/deploy/ha" },
      { title: "Docker & Kubernetes Deployment", href: "/docs/deploy/k8s" },
      { title: "AWS / Azure / GCP Deployment", href: "/docs/deploy/cloud" },
      { title: "Backup & Disaster Recovery", href: "/docs/deploy/backup" },
      { title: "Upgrade Guide", href: "/docs/deploy/upgrade" },
    ],
  },
];

const popularDocs = [
  { icon: Terminal, title: "How to Connect Assets via SSH Proxy", href: "/docs/how-to/ssh-proxy" },
  { icon: Users, title: "Setting Up LDAP/AD Sync for Enterprise", href: "/docs/how-to/ldap-sync" },
  { icon: Lock, title: "Configuring MFA with Google Authenticator", href: "/docs/how-to/mfa-setup" },
  { icon: Database, title: "Connecting to MySQL and PostgreSQL Databases", href: "/docs/how-to/database" },
  { icon: Network, title: "Kubernetes Cluster Access with OmniPriv", href: "/docs/how-to/kubernetes" },
  { icon: FileText, title: "Generating SOC2 Compliance Reports", href: "/docs/how-to/soc2-report" },
];

const quickLinks = [
  { label: "System Architecture Overview", href: "/docs/architecture", icon: Cpu },
  { label: "Changelog & Release Notes", href: "/docs/changelog", icon: Globe },
  { label: "REST API OpenAPI Spec", href: "/docs/api/openapi", icon: Code },
  { label: "Troubleshooting Guide", href: "/docs/troubleshoot", icon: Settings },
];

/* Pages on the site that already document the platform. */
const availableNow = [
    { href: "/platform/infrastructure-deployment", label: "Platform specifications and deployment topologies" },
    { href: "/integrations", label: "Integrations catalogue" },
    { href: "/security", label: "Security architecture and framework mappings" },
];

const guideCount = docCategories.reduce((a, c) => a + c.articles.length, 0);

const FACTS = [
    { value: docCategories.length, label: "documentation sections, from quick start to deployment" },
    { value: guideCount, label: "guides being written across those sections" },
    { value: popularDocs.length, label: "how-to guides most often requested" },
    { value: quickLinks.length, label: "reference documents on the way" },
];

export default function DocsPage() {
    return (
        <div className="aip">
            <Spotlight />

            <PageHero
                id="dc-hero"
                titleLead="OmniPriv"
                titleAccent="Documentation"
                paragraphs={[["Everything you need to deploy, configure, and operate OmniPriv in your enterprise environment."]]}
                primary={{ href: "#dc-browse", label: "Browse the sections" }}
                secondary={{ href: `mailto:${SUPPORT}`, label: "Contact Support" }}
                visual={<DocsHero sections={docCategories} />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── STATUS + QUICK LINKS ─────────────────────────── */}
            <section className={sectionLine}>
                <div className="container-xl py-10 lg:py-12 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 rounded-2xl border border-amber-400/30 bg-amber-400/[0.06] px-5 py-4" data-aos="fade-up">
                        <span className="inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-700 dark:text-amber-300">
                            <Clock className="w-5 h-5" aria-hidden="true" />
                        </span>
                        <p className="text-[0.9375rem] leading-relaxed text-slate-700 dark:text-slate-300">
                            The guide titles below outline what is being written. They are not yet published, so they are listed for reference rather than as links. In the meantime, our support team can answer any of these directly.
                        </p>
                        <a href={`mailto:${SUPPORT}`} className="hp-btn-secondary md:ml-auto shrink-0">
                            <Mail className="w-4 h-4" aria-hidden="true" /> Email support
                        </a>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" data-aos="fade-up">
                        {quickLinks.map((l) => (
                            <li key={l.label} aria-disabled="true" className="aip-card flex items-center gap-3 rounded-2xl border p-4">
                                <span className="icon-wrapper shrink-0">
                                    <l.icon className="w-4 h-4" aria-hidden="true" />
                                </span>
                                <span className="text-[0.875rem] font-semibold text-slate-700 dark:text-slate-300">{l.label}</span>
                                <span className="ml-auto shrink-0 rounded-full bg-slate-900/[0.05] dark:bg-white/[0.06] px-2 py-0.5 text-[0.6875rem] font-semibold text-slate-600 dark:text-slate-300">Soon</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ─── BROWSE BY SECTION ─────────────────────────────── */}
            <section id="dc-browse" className={cn(mutedBand, sectionLine, "scroll-mt-24")}>
                <div className="container-xl op-sec">
                    <Heading title="Browse by Category">
                        <p className="text-slate-600 dark:text-slate-400">Pick a section to see the guides planned for it. Any of them can be answered by support today.</p>
                    </Heading>
                    <div className="op-body" data-aos="fade-up">
                        <DocsBrowser sections={docCategories} />
                    </div>
                </div>
            </section>

            {/* ─── MOST REQUESTED (dark band) ────────────────────── */}
            <div className="dark">
                <section className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <Heading title="Most requested how-to guides">
                            <p className="text-slate-600 dark:text-slate-400">The questions we answer most often. Each guide is on its way; until then, ask and we will walk you through it.</p>
                        </Heading>
                        <ul className="op-body grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {popularDocs.map((d, i) => (
                                <li key={d.title} className="aip-card min-w-0 rounded-3xl border p-6 flex flex-col" data-aos="fade-up" data-aos-delay={String((i % 3) * 70)}>
                                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-[#00B8DB]/40 bg-[#0b0c0e] text-[#00B8DB]">
                                        <d.icon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    <h3 className="op-card-title mt-5">{d.title}</h3>
                                    <div className="mt-auto pt-5 flex items-center gap-3">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-1 text-[0.6875rem] font-semibold text-amber-300">
                                            <Clock className="w-3 h-3" aria-hidden="true" /> Coming soon
                                        </span>
                                        <a href={ask(d.title)} className="ml-auto inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-[#7FE3F2] hover:underline">
                                            Ask now <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>

            {/* ─── AVAILABLE NOW ─────────────────────────────────── */}
            <section className={cn(mutedBand, sectionLine)}>
                <div className="container-xl py-12 lg:py-14">
                    <div data-aos="fade-up">
                        <h2 className="op-h3">Available now</h2>
                        <p className="mt-2 mb-6 text-[0.9844rem] text-slate-600 dark:text-slate-400">Pages on this site that already document how the platform works.</p>
                    </div>
                    <KeepReading links={availableNow} />
                    <div className="mt-6" data-aos="fade-up">
                        <Link href="/blog" className="inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold op-link group">
                            Guides and explainers on the blog
                            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>

            <ClosingBand
                title="Can't find what you need?"
                accent={<CheckChips steps={["Email support", "Get an answer"]} outcome="Or book a training session" />}
                body={["Our support team and dedicated Customer Success managers are available to help you with any technical questions."]}
                primary={{ href: `mailto:${SUPPORT}`, label: "Contact Support" }}
                secondary={{ href: "/demo", label: "Request a Training Session" }}
            />
        </div>
    );
}
